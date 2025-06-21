import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import {
  Box,
  Button,
  Container,
  Typography,
  Paper,
  Grid,
  Card,
  CardMedia,
  CardContent,
  Chip,
  Divider,
  Alert,
  CircularProgress,
  Avatar,
} from '@mui/material';
import {
  RiTimeLine,
  RiCalendarLine,
  RiPlayCircleLine,
  RiUserAddLine,
  RiInformationLine,
  RiMessage2Line,
} from 'react-icons/ri';
import ReactPlayer from 'react-player';
import dayjs from 'dayjs';
import useVideoManagementActions from '@/hooks/useVideoManagementAction';
import { VideoDto } from '@/dtos/video.dto';
import SharedVideoLayout from '@/components/shared/SharedVideoLayout';
import useSharedLink from '@/hooks/useSharedLink';
import { useCommentActions } from '@/hooks/useCommentActions';
import { formatDistanceToNow } from 'date-fns';
import { alpha } from '@mui/material/styles';

import videoWatchService from '@/services/videoWatch.service';
import { UserEvent } from '@/dtos/watchSession.dto';

export default function SharedVideoPage() {
  const [isPlaying, setIsPlaying] = useState(false);
  const { isLoading, isExpired, error, shareLink } = useSharedLink();
  const { useVideoListQuery } = useVideoManagementActions();
  const playerRef = useRef<ReactPlayer | null>(null);
  const [videoStarted, setVideoStarted] = useState(false);
  const [totalPlayedSeconds, setTotalPlayedSeconds] = useState(0);
  const [duration, setDuration] = useState(0);
  const [userEvents, setUserEvents] = useState<UserEvent[]>([]);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const [isPlayer, setIsPlayer] = useState(false);

  const { data: videos = [] } = useVideoListQuery();

  // Filter videos to show only 4 for the collection preview
  const previewVideos = videos.slice(0, 4);

  useEffect(() => {
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, []);

  useEffect(() => {
    if (isPlaying) {
      intervalRef.current = setInterval(() => {
        setTotalPlayedSeconds((prev) => {
          const updated = prev + 1;
          console.log(`⏱️ Watched: ${updated}s`);
          return updated;
        });
      }, 1000);
    } else if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [isPlaying]);

  const updateWatchSession = (eventType?: string, eventTime?: number) => {
    if (!videoStarted) return;

    if (eventType) {
      const currentTime =
        eventTime ?? playerRef.current?.getCurrentTime() ?? totalPlayedSeconds;
      const userEvent = {
        event: eventType,
        eventTime: new Date(),
        videoTime: currentTime,
      };
      setUserEvents((prev) => [...prev, userEvent]);
    }

    const watchProgressData = {
      actualTimeWatched: totalPlayedSeconds,
      percentageWatched: parseFloat(
        ((totalPlayedSeconds / duration) * 100).toFixed(2)
      ),
      userEvent: userEvents,
    };

    videoWatchService.updateWatchSession(watchProgressData);
  };

  const handlePlayerReady = (player: ReactPlayer) => {
    playerRef.current = player;
  };

  const handleVideoStart = () => {
    if (!videoStarted && shareLink?.video) {
      setVideoStarted(true);
      const session = videoWatchService.startWatchSession(shareLink?.video?.id);
      console.log('🔄 Session:', session);
    }
  };

  const handleVideoPlay = () => {
    setIsPlaying(true);
    updateWatchSession('play');
  };

  const handleVideoPause = () => {
    setIsPlaying(false);
    updateWatchSession('pause');
  };

  const handleVideoSeek = (seconds: number) => {
    console.log(`🔄 Seeking to: ${seconds}s`);
    updateWatchSession('seek', seconds);
  };

  const handleVideoEnd = () => {
    setIsPlaying(false);
    if (videoStarted) {
      videoWatchService.completeWatchSession();
    }
  };

  const handleProgress = () => {
    updateWatchSession();
  };

  const handleDuration = (d: number) => {
    setDuration(d);
    console.log(`⏳ Duration: ${d}s`);
  };

  const handlePlayClick = () => {
    setIsPlayer(true);
  };

  const { videoCommentsQuery, getApprovedComments } = useCommentActions(
    shareLink?.video?.id || ''
  );
  const approvedComments = shareLink?.video
    ? getApprovedComments(videoCommentsQuery.data || [])
    : [];

  if (isLoading) {
    return (
      <SharedVideoLayout>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            minHeight: '80vh',
          }}
        >
          <CircularProgress color="primary" />
          <Typography variant="h6" sx={{ ml: 2 }}>
            Verifying shared link...
          </Typography>
        </Box>
      </SharedVideoLayout>
    );
  }

  if (!shareLink || isExpired) {
    return (
      <SharedVideoLayout>
        <Container
          maxWidth="md"
          sx={{
            py: 8,
            minHeight: '80vh',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
          }}
        >
          <Paper elevation={3} sx={{ p: 4, textAlign: 'center' }}>
            <Alert severity="error" sx={{ mb: 3 }}>
              {error || 'This shared link is invalid or has expired.'}
            </Alert>
            <Typography variant="h5" gutterBottom>
              Unable to access this content
            </Typography>
            <Typography variant="body1" color="text.secondary" paragraph>
              The shared link you're trying to access is no longer valid.
            </Typography>
            <Button
              variant="contained"
              color="primary"
              component={Link}
              to="/signup"
              startIcon={<RiUserAddLine />}
            >
              Sign up to access our film collection
            </Button>
          </Paper>
        </Container>
      </SharedVideoLayout>
    );
  }

  // Cast the video data to VideoDto with type assertion
  const videoData = shareLink.video as unknown as VideoDto;

  return (
    <SharedVideoLayout>
      <Box
        sx={{
          backgroundImage: `linear-gradient(to right, rgba(0,0,0,0.9), rgba(0,0,0,0.7)), url(${videoData.thumbnail_url})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          py: 4,
          color: 'white',
        }}
      >
        <Container maxWidth="xl">
          {!isPlayer ? (
            <Grid container spacing={4}>
              <Grid item xs={12} md={6}>
                <Box
                  component="img"
                  src={videoData.thumbnail_url}
                  alt={videoData.title}
                  sx={{
                    width: '100%',
                    borderRadius: 2,
                    boxShadow: '0 4px 20px rgba(0,0,0,0.5)',
                  }}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <Typography variant="overline" color="primary">
                  SHARED FILM
                </Typography>
                <Typography
                  variant="h3"
                  component="h1"
                  gutterBottom
                  color="white"
                >
                  {videoData.title}
                </Typography>

                <Box sx={{ display: 'flex', gap: 2, mb: 2 }}>
                  <Chip
                    icon={<RiCalendarLine />}
                    label={dayjs(videoData.createdAt).format('MMMM YYYY')}
                    variant="outlined"
                    sx={{
                      color: 'white',
                      borderColor: 'rgba(255,255,255,0.5)',
                    }}
                  />
                  <Chip
                    icon={<RiTimeLine />}
                    label={videoData.duration}
                    variant="outlined"
                    sx={{
                      color: 'white',
                      borderColor: 'rgba(255,255,255,0.5)',
                    }}
                  />
                </Box>

                <Box sx={{ display: 'flex', gap: 1, mb: 3, flexWrap: 'wrap' }}>
                  {videoData.genre.split(',').map((genre) => (
                    <Chip
                      key={genre}
                      label={genre.trim()}
                      variant="outlined"
                      sx={{
                        borderColor: 'white',
                        color: 'white',
                      }}
                    />
                  ))}
                </Box>

                {/* Tags with light background */}
                {videoData.tags && videoData.tags.length > 0 && (
                  <Box sx={{ mb: 3 }}>
                    <Typography
                      variant="subtitle2"
                      gutterBottom
                      color="rgba(255,255,255,0.7)"
                    >
                      Tags:
                    </Typography>
                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                      {videoData.tags.map((tag) => (
                        <Chip
                          key={tag}
                          label={tag}
                          size="small"
                          sx={{
                            bgcolor: 'rgba(255, 255, 255, 0.15)',
                            color: 'white',
                          }}
                        />
                      ))}
                    </Box>
                  </Box>
                )}

                <Typography variant="body1" paragraph color="white">
                  {videoData.short_desc}
                </Typography>

                <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap', mb: 3 }}>
                  <Button
                    variant="contained"
                    color="primary"
                    size="large"
                    startIcon={<RiPlayCircleLine />}
                    onClick={handlePlayClick}
                  >
                    Watch Now
                  </Button>

                  <Button
                    variant="outlined"
                    color="primary"
                    size="large"
                    component={Link}
                    to="/signup"
                    startIcon={<RiUserAddLine />}
                    sx={{
                      color: 'white',
                      borderColor: 'rgba(255,255,255,0.5)',
                    }}
                  >
                    Sign Up for Free
                  </Button>
                </Box>

                <Typography variant="body2" color="rgba(255,255,255,0.7)">
                  This is a shared film. Sign up to access our full collection.
                </Typography>
              </Grid>
            </Grid>
          ) : (
            <Box sx={{ width: '100%', maxWidth: '1000px', mx: 'auto' }}>
              <div className="player-wrapper" style={{ height: '700px' }}>
                <ReactPlayer
                  url={videoData.video_url}
                  width="100%"
                  height="100%"
                  controls={true}
                  onReady={handlePlayerReady}
                  onPlay={handleVideoPlay}
                  onStart={handleVideoStart}
                  onPause={handleVideoPause}
                  onSeek={(seconds) => handleVideoSeek(seconds)}
                  onEnded={handleVideoEnd}
                  onProgress={handleProgress}
                  onDuration={handleDuration}
                  stopOnUnmount={true}
                  progressInterval={10000}
                />
              </div>

              <Box sx={{ mt: 3 }}>
                <Typography variant="h4" gutterBottom color="white">
                  {videoData.title}
                </Typography>

                {/* Tags in player view */}
                {videoData.tags && videoData.tags.length > 0 && (
                  <Box sx={{ mb: 2 }}>
                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                      {videoData.tags.map((tag) => (
                        <Chip
                          key={tag}
                          label={tag}
                          size="small"
                          sx={{
                            bgcolor: 'rgba(255, 255, 255, 0.15)',
                            color: 'white',
                          }}
                        />
                      ))}
                    </Box>
                  </Box>
                )}

                <Typography variant="body1" paragraph color="white">
                  {videoData.short_desc}
                </Typography>

                <Button
                  variant="outlined"
                  color="primary"
                  component={Link}
                  to="/signup"
                  startIcon={<RiUserAddLine />}
                  sx={{
                    mt: 2,
                    color: 'white',
                    borderColor: 'rgba(255,255,255,0.5)',
                  }}
                >
                  Sign Up for More Films Like This
                </Button>
              </Box>
            </Box>
          )}
        </Container>
      </Box>

      {/* Film details section with light background */}
      <Box sx={{ bgcolor: 'rgba(0, 0, 0, 0.02)', py: 6 }}>
        <Container maxWidth="xl">
          <Paper
            elevation={1}
            sx={{
              p: 4,
              mb: 6,
              bgcolor: 'white',
              borderRadius: 2,
            }}
          >
            <Typography variant="h4" gutterBottom color="text.primary">
              About This Film
            </Typography>
            <Divider sx={{ mb: 3 }} />
            <Typography variant="body1" paragraph color="text.primary">
              {videoData.about}
            </Typography>

            {videoData.primary_lesson && (
              <>
                <Typography
                  variant="h6"
                  gutterBottom
                  sx={{ mt: 3 }}
                  color="text.primary"
                >
                  Primary Lesson
                </Typography>
                <Typography variant="body1" paragraph color="text.primary">
                  {videoData.primary_lesson}
                </Typography>
              </>
            )}

            {videoData.theme && (
              <>
                <Typography variant="h6" gutterBottom color="text.primary">
                  Theme
                </Typography>
                <Typography variant="body1" paragraph color="text.primary">
                  {videoData.theme}
                </Typography>
              </>
            )}

            {videoData.impact && (
              <>
                <Typography variant="h6" gutterBottom color="text.primary">
                  Impact
                </Typography>
                <Typography variant="body1" paragraph color="text.primary">
                  {videoData.impact}
                </Typography>
              </>
            )}

            <Box sx={{ mt: 4, textAlign: 'center' }}>
              <Button
                variant="contained"
                color="primary"
                component={Link}
                to="/signup"
                startIcon={<RiInformationLine />}
              >
                Sign Up to Access Detailed Film Information
              </Button>
            </Box>
          </Paper>

          {/* Comments section */}
          {approvedComments && approvedComments.length > 0 && (
            <Paper
              elevation={2}
              sx={{
                p: 4,
                mb: 6,
                bgcolor: 'white',
                borderRadius: 2,
              }}
            >
              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  mb: 3,
                }}
              >
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <RiMessage2Line
                    size={24}
                    style={{ marginRight: 10, color: '#1976d2' }}
                  />
                  <Typography
                    variant="h5"
                    fontWeight={600}
                    color="text.primary"
                  >
                    Viewer Comments ({approvedComments.length})
                  </Typography>
                </Box>
                <Button
                  variant="outlined"
                  size="medium"
                  component={Link}
                  to="/signup"
                  startIcon={<RiUserAddLine />}
                  sx={{ borderRadius: 2 }}
                >
                  Sign Up to Comment
                </Button>
              </Box>
              <Divider sx={{ mb: 3 }} />

              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
                {approvedComments.map((comment) => (
                  <Card
                    key={comment.id}
                    elevation={1}
                    sx={{
                      borderRadius: 2,
                      transition: 'all 0.15s ease',
                      '&:hover': {
                        boxShadow: 2,
                        transform: 'translateY(-1px)',
                      },
                      overflow: 'visible',
                    }}
                  >
                    <CardContent sx={{ p: 3 }}>
                      <Box sx={{ display: 'flex', gap: 2 }}>
                        <Avatar
                          alt={comment.user?.firstname || 'User'}
                          sx={{
                            bgcolor: 'primary.main',
                            width: 48,
                            height: 48,
                            boxShadow: 1,
                            fontSize: 20,
                          }}
                        >
                          {comment.user?.firstname?.[0] || 'U'}
                        </Avatar>
                        <Box sx={{ flex: 1 }}>
                          <Box
                            sx={{
                              display: 'flex',
                              flexWrap: 'wrap',
                              alignItems: 'center',
                              gap: 1.5,
                              mb: 1.5,
                            }}
                          >
                            <Typography
                              variant="subtitle1"
                              sx={{
                                fontWeight: 600,
                                color: 'text.primary',
                              }}
                            >
                              {comment.user?.firstname} {comment.user?.lastname}
                            </Typography>
                            <Typography
                              variant="caption"
                              sx={{
                                color: 'text.secondary',
                                bgcolor: (theme) =>
                                  alpha(theme.palette.primary.main, 0.07),
                                py: 0.5,
                                px: 1,
                                borderRadius: 1,
                                fontWeight: 500,
                              }}
                            >
                              {formatDistanceToNow(
                                new Date(comment.createdAt),
                                {
                                  addSuffix: true,
                                }
                              )}
                            </Typography>
                          </Box>
                          <Typography
                            variant="body1"
                            sx={{
                              lineHeight: 1.6,
                              color: 'text.primary',
                            }}
                          >
                            {comment.text}
                          </Typography>
                        </Box>
                      </Box>
                    </CardContent>
                  </Card>
                ))}
              </Box>
            </Paper>
          )}
        </Container>
      </Box>

      {/* Collection preview section */}
      <Container maxWidth="xl" sx={{ py: 6, bgcolor: 'white' }}>
        <Box sx={{ mb: 6 }}>
          <Typography variant="h4" gutterBottom color="text.primary">
            Our Collection
          </Typography>
          <Divider sx={{ mb: 3 }} />
          <Typography variant="body1" paragraph color="text.primary">
            Explore our full collection of films by signing up for an account.
          </Typography>

          <Grid container spacing={3} sx={{ mb: 4 }}>
            {previewVideos.map((video) => (
              <Grid item xs={12} sm={6} md={3} key={video.id}>
                <Card
                  sx={{
                    bgcolor: 'white',
                    color: 'text.primary',
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    boxShadow: 2,
                  }}
                >
                  <Box sx={{ position: 'relative', paddingTop: '56.25%' }}>
                    <CardMedia
                      component="img"
                      image={video.thumbnail_url}
                      alt={video.title}
                      sx={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                      }}
                    />
                  </Box>
                  <CardContent sx={{ flexGrow: 1 }}>
                    <Typography
                      variant="h6"
                      component="div"
                      noWrap
                      color="text.primary"
                    >
                      {video.title}
                    </Typography>
                    <Typography
                      variant="body2"
                      color="text.secondary"
                      sx={{ mt: 1 }}
                    >
                      {video.duration} • {video.genre.split(',')[0]}
                    </Typography>

                    {/* Show tags in collection cards */}
                    {video.tags && video.tags.length > 0 && (
                      <Box
                        sx={{
                          display: 'flex',
                          flexWrap: 'wrap',
                          gap: 0.5,
                          mt: 1,
                        }}
                      >
                        {video.tags.slice(0, 2).map((tag) => (
                          <Chip
                            key={tag}
                            label={tag}
                            size="small"
                            sx={{
                              height: 20,
                              fontSize: '0.7rem',
                              bgcolor: 'rgba(0, 0, 0, 0.08)',
                              color: 'text.primary',
                            }}
                          />
                        ))}
                        {video.tags.length > 2 && (
                          <Typography variant="caption" color="text.secondary">
                            +{video.tags.length - 2} more
                          </Typography>
                        )}
                      </Box>
                    )}
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>

          <Box sx={{ textAlign: 'center', mt: 4 }}>
            <Button
              variant="contained"
              color="primary"
              size="large"
              component={Link}
              to="/signup"
              startIcon={<RiUserAddLine />}
            >
              Sign Up to Access Full Collection
            </Button>
            <Typography variant="body2" color="text.secondary" sx={{ mt: 2 }}>
              Get unlimited access to our entire film library and exclusive
              content.
            </Typography>
          </Box>
        </Box>
      </Container>
    </SharedVideoLayout>
  );
}
