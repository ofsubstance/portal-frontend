import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Button,
  Chip,
  Typography,
} from '@mui/material';
import {
  RiCalendar2Line as CalendarIcon,
  RiTimeLine as ClockIcon,
  RiArrowDownSLine as ExpandMoreIcon,
  RiPlayCircleLine as PlayIcon,
} from 'react-icons/ri';

import { VideoDto } from '@/dtos/video.dto';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';

dayjs.extend(relativeTime);

interface VideoDescriptionItemProps {
  title: string;
  details: string;
}

function VideoDescriptionItem({ title, details }: VideoDescriptionItemProps) {
  return (
    <Accordion
      defaultExpanded
      disableGutters
      sx={{
        backgroundColor: 'transparent',
        boxShadow: 'none',
        color: 'white',
      }}
    >
      <AccordionSummary
        expandIcon={<ExpandMoreIcon size={24} className="text-white" />}
        sx={{ px: 0 }}
      >
        <Typography variant="h6" fontWeight={600}>
          {title}
        </Typography>
      </AccordionSummary>
      <AccordionDetails sx={{ px: 0 }}>{details}</AccordionDetails>
    </Accordion>
  );
}

interface VideoDetailsHeroProps {
  data: VideoDto;
  onPlay: () => void;
  onPlayTrailer: (type: 'trailer' | 'preroll') => void;
}

export default function VideoDetailsHero({
  data,
  onPlay,
  onPlayTrailer,
}: VideoDetailsHeroProps) {
  return (
    <div className="flex md:flex-row flex-col md:min-h-[calc(100vh-64px)]">
      <div className="md:min-h-[calc(100vh-64px)] flex-[0.3] space-y-6 p-10 md:p-20 bg-white backdrop-filter backdrop-blur-md bg-opacity-15">
        <img
          className="rounded-md w-full object-cover"
          src={data.thumbnail_url}
          alt="thumbnail"
        />

        <div className="flex flex-col gap-2">
          <Button
            variant="contained"
            fullWidth
            startIcon={<PlayIcon />}
            onClick={() => onPlayTrailer('trailer')}
          >
            Watch Trailer
          </Button>

          {data.preroll_url && (
            <Button
              variant="contained"
              fullWidth
              startIcon={<PlayIcon />}
              onClick={() => onPlayTrailer('preroll')}
            >
              Watch Pre-roll
            </Button>
          )}

          <Button
            variant="contained"
            fullWidth
            startIcon={<PlayIcon />}
            onClick={onPlay}
          >
            Watch The Film
          </Button>
        </div>

        <Typography variant="h4" fontWeight={600}>
          {data.title}
        </Typography>

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

        {/* Display tags if available */}
        {data.tags && data.tags.length > 0 && (
          <div className="mt-2">
            <Typography variant="subtitle2" className="mb-1">
              Tags:
            </Typography>
            <div className="flex flex-wrap gap-2">
              {data.tags.map((tag) => (
                <Chip
                  key={tag}
                  label={tag}
                  size="small"
                  variant="outlined"
                  sx={{
                    borderColor: 'rgba(255, 255, 255, 0.7)',
                    color: 'white',
                  }}
                />
              ))}
            </div>
          </div>
        )}

        <Typography variant="body1">{data.short_desc}</Typography>
      </div>

      <div className="p-10 md:p-20 mx-auto space-y-6 flex-1">
        <Typography variant="h5" fontWeight={600}>
          About This Film
        </Typography>

        <VideoDescriptionItem title="Synopsis" details={data.about} />

        <VideoDescriptionItem
          title="Primary Lesson"
          details={data.primary_lesson}
        />

        <VideoDescriptionItem title="Theme" details={data.theme} />

        <VideoDescriptionItem title="Impact" details={data.impact} />
      </div>
    </div>
  );
}
