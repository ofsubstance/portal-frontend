import {
  RiCalendar2Line as CalendarIcon,
  RiTimeLine as ClockIcon,
  RiFeedbackLine as FeedbackIcon,
  RiShareLine as ShareIcon,
} from 'react-icons/ri';
import { Box, Chip, Fab, Typography, useMediaQuery, useTheme } from '@mui/material';
import { useState, useEffect, useRef } from 'react';
import { VideoDto } from '@/dtos/video.dto';
import ReactPlayer from 'react-player';
import dayjs from 'dayjs';
import videoWatchService from '@/services/videoWatch.service';
import { UserEvent } from '@/dtos/watchSession.dto';
import { toast } from 'react-toastify';

interface VideoPlayerSectionProps {
  data: VideoDto;
  onFeedback: () => void;
  onShare?: () => void;
}

export default function VideoPlayerSection({
  data,
  onFeedback,
  onShare,
}: VideoPlayerSectionProps) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  const [videoStarted, setVideoStarted] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);

  const playerRef = useRef<ReactPlayer | null>(null);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  // Use refs for values that must be current inside callbacks without
  // causing stale-closure bugs.
  const totalPlayedSecondsRef = useRef(0);
  const durationRef = useRef(0);
  const videoStartedRef = useRef(false);
  const userEventsRef = useRef<UserEvent[]>([]);

  // Sync videoStarted state → ref so callbacks always see the latest value
  useEffect(() => {
    videoStartedRef.current = videoStarted;
  }, [videoStarted]);

  // Accumulate actual watch time while playing
  useEffect(() => {
    if (isPlaying) {
      intervalRef.current = setInterval(() => {
        totalPlayedSecondsRef.current += 1;
      }, 1000);
    } else if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    };
  }, [isPlaying]);

  // On unmount: stop the timer and send a final progress update
  useEffect(() => {
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }

      if (videoStartedRef.current) {
        const duration = durationRef.current;
        const watched = totalPlayedSecondsRef.current;
        const pct = duration > 0 ? Math.min((watched / duration) * 100, 100) : 0;
        videoWatchService.updateWatchSession({
          actualTimeWatched: watched,
          percentageWatched: parseFloat(pct.toFixed(2)),
          endTime: new Date(),
          userEvent: userEventsRef.current,
        });
      }
    };
  }, []);

  const buildProgressData = (eventType?: string, eventTime?: number) => {
    if (eventType) {
      const currentTime =
        eventTime ??
        playerRef.current?.getCurrentTime() ??
        totalPlayedSecondsRef.current;

      userEventsRef.current = [
        ...userEventsRef.current,
        { event: eventType, eventTime: new Date(), videoTime: currentTime },
      ];
    }

    const rawPct =
      durationRef.current > 0
        ? (totalPlayedSecondsRef.current / durationRef.current) * 100
        : 0;

    return {
      actualTimeWatched: totalPlayedSecondsRef.current,
      percentageWatched: parseFloat(Math.min(rawPct, 100).toFixed(2)),
      userEvent: userEventsRef.current,
    };
  };

  const updateWatchSession = (eventType?: string, eventTime?: number) => {
    if (!videoStartedRef.current) return;
    videoWatchService.updateWatchSession(buildProgressData(eventType, eventTime));
  };

  const handlePlayerReady = (player: ReactPlayer) => {
    playerRef.current = player;
  };

  const handleVideoStart = async () => {
    if (!videoStartedRef.current && data) {
      setVideoStarted(true);
      videoStartedRef.current = true;
      await videoWatchService.startWatchSession(data.id);
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
    updateWatchSession('seek', seconds);
  };

  const handleVideoEnd = () => {
    setIsPlaying(false);
    if (videoStartedRef.current) {
      videoWatchService.completeWatchSession();
      toast.success('Video completed! Thank you for watching.');
    }
  };

  const handleProgress = () => {
    updateWatchSession();
  };

  const handleDuration = (d: number) => {
    durationRef.current = d;
  };

  return (
    <div className="flex md:flex-row flex-col items-start gap-4 md:gap-8 px-3 md:px-6 py-2">
      <div className="flex-1 w-full">
        <div className="player-wrapper" style={{ height: isMobile ? '250px' : '700px' }}>
          <ReactPlayer
            url={data.video_url}
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
            stopOnUnmount
            progressInterval={10000}
          />
        </div>
      </div>

      <div className="flex flex-col items-start gap-4 md:gap-6 flex-[0.4]">
        {!isMobile && (
          <img
            className="rounded-md w-full md:w-3/5 object-cover"
            src={data.thumbnail_url}
            alt="thumbnail"
          />
        )}
        <Typography variant="h4" className="text-lg md:text-2xl">{data.title}</Typography>
        <div className="flex gap-4 items-center">
          <Typography variant="body1" className="flex gap-2">
            <CalendarIcon size={20} />
            {dayjs(data.createdAt).format('MMMM DD, YYYY')}
          </Typography>
          <Typography variant="body1" className="flex gap-2">
            <ClockIcon size={20} />
            {data.duration}
          </Typography>
        </div>
        <div className="flex gap-2">
          {data.genre.split(',').map((genre) => (
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
        </div>
        <Typography variant="body1">{data.short_desc}</Typography>

        <Box sx={{
          display: 'flex',
          gap: 2,
          flexWrap: isMobile ? 'wrap' : 'nowrap',
          width: '100%'
        }}>
          <Fab
            variant="extended"
            size={isMobile ? "medium" : "large"}
            color="primary"
            onClick={onFeedback}
            sx={{
              whiteSpace: 'nowrap',
              minWidth: isMobile ? '100%' : 'fit-content',
              px: isMobile ? 2 : 3,
            }}
          >
            <FeedbackIcon size={isMobile ? 16 : 20} className="mr-2" />
            {isMobile ? 'Feedback' : 'Leave A Feedback'}
          </Fab>

          {onShare && (
            <Fab
              variant="extended"
              size={isMobile ? "medium" : "large"}
              color="primary"
              onClick={onShare}
              sx={{
                whiteSpace: 'nowrap',
                minWidth: isMobile ? '100%' : 'fit-content',
                px: isMobile ? 2 : 3,
              }}
            >
              <ShareIcon size={isMobile ? 16 : 20} className="mr-2" />
              {isMobile ? 'Share' : 'Share This Film'}
            </Fab>
          )}
        </Box>
      </div>
    </div>
  );
}
