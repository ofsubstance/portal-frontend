import {
  RiCalendar2Line as CalendarIcon,
  RiTimeLine as ClockIcon,
  RiFeedbackLine as FeedbackIcon,
  RiShareLine as ShareIcon,
} from 'react-icons/ri';
import { Box, Chip, Fab, Typography } from '@mui/material';
import { useState, useEffect, useRef } from 'react';
import { VideoDto } from '@/dtos/video.dto';
import ReactPlayer from 'react-player';
import dayjs from 'dayjs';
import videoWatchService from '@/services/videoWatch.service';
import { UserEvent } from '@/dtos/watchSession.dto';

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
  const [isPlaying, setIsPlaying] = useState(false);
  const [totalPlayedSeconds, setTotalPlayedSeconds] = useState(0);
  const [duration, setDuration] = useState(0);
  const playerRef = useRef<ReactPlayer | null>(null);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const [userEvents, setUserEvents] = useState<UserEvent[]>([]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, []);

  // Custom interval to count actual watch time
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
    if (!videoStarted && data) {
      setVideoStarted(true);
      const session = videoWatchService.startWatchSession(data.id);
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

  return (
    <div className="flex md:flex-row flex-col items-start gap-8 p-6">
      <div className="flex-1 w-full">
        <div className="player-wrapper" style={{ height: '700px' }}>
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
              color="primary"
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
