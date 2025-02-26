import {
  RiCalendar2Line as CalendarIcon,
  RiTimeLine as ClockIcon,
  RiFeedbackLine as FeedbackIcon,
  RiShareLine as ShareIcon,
} from 'react-icons/ri';
import { Box, Chip, Fab, Typography } from '@mui/material';

import { VideoDto } from '@/dtos/video.dto';
import Vimeo from '@u-wave/react-vimeo';
import dayjs from 'dayjs';

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
  return (
    <div className="flex md:flex-row flex-col items-start gap-8 p-6">
      <div className="flex-1 w-full">
        <Vimeo video={data.video_url} responsive={true} />
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
