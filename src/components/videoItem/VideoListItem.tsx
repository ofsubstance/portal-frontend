import {
  RiCalendar2Line as CalendarIcon,
  RiPlayFill as PlayIcon,
} from 'react-icons/ri';
import { Chip, Theme, Typography, useMediaQuery } from '@mui/material';

import { VideoDto } from '@/dtos/video.dto';
import VideoGridItem from './VideoGridItem';
import dayjs from 'dayjs';

interface VideoListItemProps {
  data: VideoDto;
}

function VideoListItem({ data }: VideoListItemProps) {
  const smallScreen = useMediaQuery((theme: Theme) =>
    theme.breakpoints.down('md')
  );

  if (smallScreen) {
    return <VideoGridItem data={data} />;
  }

  return (
    <div className="flex gap-4 cursor-pointer [&:hover_.bg-opacity-0]:bg-opacity-40 [&:hover_.opacity-0]:opacity-100">
      <div className="relative h-24 aspect-video rounded-md overflow-clip">
        <img
          src={data.thumbnail_url}
          alt="thumbnail"
          className="object-cover"
        />

        <div className="absolute grid place-content-center inset-0 bg-black bg-opacity-0 transition-[background] duration-500">
          <PlayIcon
            size={40}
            className="text-white opacity-0 transition-opacity duration-500"
          />
        </div>

        <Chip
          size="small"
          className="absolute bottom-2 right-2"
          sx={{ backgroundColor: 'rgba(0, 0, 0, 0.6)', color: 'white' }}
          label={`${data.duration} min`}
        />
      </div>

      <div className="flex flex-col gap-3 flex-1">
        <div className="flex gap-2 justify-between">
          <Typography variant="body1" fontWeight={600}>
            {data.title}
          </Typography>

          {/* <VideoItemMenu /> */}
        </div>

        <Typography variant="subtitle2" className="inline-flex gap-2">
          <CalendarIcon size={20} />
          {dayjs(data.createdAt).format('MMMM DD, YYYY')}
        </Typography>
      </div>
    </div>
  );
}

export default VideoListItem;
