import {
  RiCalendar2Line as CalendarIcon,
  RiTimeLine as ClockIcon,
  RiFeedbackLine as FeedbackIcon,
  RiShareLine as ShareIcon,
} from 'react-icons/ri';
import { Box, Chip, Fab, Typography } from '@mui/material';
import { useState, useEffect, useRef } from 'react';
import { VideoDto } from '@/dtos/video.dto';
import Vimeo from '@u-wave/react-vimeo';
import dayjs from 'dayjs';
import videoWatchService from '@/services/videoWatch.service';

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
  const [videoStarted, setVideoStarted] = useState(false);
  const playerRef = useRef<any>(null);

  // Clean up when component unmounts
  useEffect(() => {
    return () => {
      // Complete the watch session if it exists when component unmounts
      if (videoWatchService.getWatchSession()) {
        const currentPosition = playerRef.current?.getCurrentTime() || 0;
        videoWatchService.completeWatchSession(currentPosition, false);
      }
    };
  }, []);

  // Handle video player events
  const handlePlayerReady = (player: any) => {
    playerRef.current = player.player;
  };

  // Start watch session when video actually starts playing
  const handleVideoStart = () => {
    if (!videoStarted && data) {
      setVideoStarted(true);

      // Start a new watch session
      videoWatchService.startWatchSession(data.id).then((session) => {
        if (session) {
          // Start periodic updates with a function that gets the current time
          videoWatchService.startPeriodicUpdates(
            () => playerRef.current?.getCurrentTime() || 0
          );
        }
      });

      // Track the play action
      videoWatchService.handleUserAction('play', 0);
    }
  };

  const handleVideoPause = () => {
    if (videoStarted && playerRef.current) {
      const currentTime = playerRef.current.getCurrentTime();
      videoWatchService.handleUserAction('pause', currentTime);
    }
  };

  const handleVideoPlay = () => {
    if (videoStarted && playerRef.current) {
      const currentTime = playerRef.current.getCurrentTime();
      videoWatchService.handleUserAction('play', currentTime);
    }
  };

  const handleVideoSeek = (event: any) => {
    if (videoStarted && playerRef.current) {
      const currentTime = event.seconds;
      videoWatchService.handleUserAction('seek', currentTime);
    }
  };

  const handleVideoEnd = () => {
    if (videoStarted && playerRef.current) {
      const currentTime = playerRef.current.getCurrentTime();
      videoWatchService.completeWatchSession(currentTime, true);
    }
  };

  return (
    <div className="flex md:flex-row flex-col items-start gap-8 p-6">
      <div className="flex-1 w-full">
        <Vimeo
          video={data.video_url}
          responsive={true}
          onReady={handlePlayerReady}
          onPlay={handleVideoPlay}
          onPlaying={handleVideoStart}
          onPause={handleVideoPause}
          onSeeked={handleVideoSeek}
          onEnd={handleVideoEnd}
        />
      </div>
      <div className="flex flex-col items-start gap-6 flex-[0.4]">
        <img
          className="rounded-md w-3/5 object-cover"
          src={data.thumbnail_url}
          alt="thumbnail"
        />

        <Typography variant="h4">{data.title}</Typography>

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

        <Box sx={{ display: 'flex', gap: 2 }}>
          <Fab
            variant="extended"
            size="large"
            color="primary"
            onClick={onFeedback}
          >
            <FeedbackIcon size={20} className="mr-2" />
            Leave A Feedback
          </Fab>

          {onShare && (
            <Fab
              variant="extended"
              size="large"
              color="secondary"
              onClick={onShare}
            >
              <ShareIcon size={20} className="mr-2" />
              Share This Film
            </Fab>
          )}
        </Box>
      </div>
    </div>
  );
}
