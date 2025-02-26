import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Button,
  Chip,
  Typography,
} from '@mui/material';
import {
  RiCalendarLine as CalendarIcon,
  RiDeleteBinLine as DeleteIcon,
  RiTimeLine as DurationIcon,
  RiEdit2Line as EditIcon,
  RiArrowDownSLine as ExpandMoreIcon,
  RiPlayCircleLine as PlayIcon,
} from 'react-icons/ri';
import { useNavigate, useParams } from 'react-router-dom';

import { ModalHookLayout } from '@/components/common/modal/ModalLayout';
import Vimeo from '@u-wave/react-vimeo';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import { useModal } from '@ebay/nice-modal-react';
import useVideoManagementActions from '@/hooks/useVideoManagementAction';

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
      }}
    >
      <AccordionSummary
        expandIcon={<ExpandMoreIcon size={24} />}
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

function VideoDetailsPage() {
  const { videoId } = useParams();

  const navigate = useNavigate();
  const modal = useModal(ModalHookLayout);
  const { useVideoQuery, videoDeleteMutation } = useVideoManagementActions();

  const { data } = useVideoQuery(videoId!);

  const handleDeleteClick = () => {
    modal.show({
      title: 'Delete Video!',
      children: (
        <Typography variant="h6">
          Are you sure you want to delete this video?
        </Typography>
      ),
      dialogActions: {
        confirmButtonProps: {
          text: 'Yes, Delete Video',
          color: 'error',
          onClick: () =>
            videoDeleteMutation.mutate(videoId!, {
              onSuccess: () => {
                modal.hide();
                navigate('/admin/video-management');
              },
            }),
        },
        cancelButtonProps: {
          text: 'No, Cancel',
          onClick: () => {
            modal.hide();
          },
        },
      },
    });
  };

  const handlePlayTrailerClick = () => {
    modal.show({
      title: `Trailer for ${data?.title}`,
      maxWidth: 'lg',
      children: (
        <div className="w-full">
          {data && <Vimeo video={data.trailer_url} responsive={true} />}
        </div>
      ),
    });
  };

  const handlePlayVideoClick = () => {
    modal.show({
      title: `Video - ${data?.title}`,
      maxWidth: 'lg',
      children: (
        <div className="w-full">
          {data && <Vimeo video={data.video_url} responsive={true} />}
        </div>
      ),
    });
  };

  const handlePlayPrerollClick = () => {
    modal.show({
      title: `Pre-roll for ${data?.title}`,
      maxWidth: 'lg',
      children: (
        <div className="w-full">
          {data && <Vimeo video={data.preroll_url} responsive={true} />}
        </div>
      ),
    });
  };

  if (!data) return null;

  return (
    <div className="space-y-8 text-slate-600">
      <div className="flex gap-10 flex-col lg:flex-row">
        <div className="space-y-4">
          <img
            className="rounded-md w-[600px] object-cover"
            src={data.thumbnail_url}
            alt="thumbnail"
          />

          <Button
            variant="contained"
            fullWidth
            startIcon={<PlayIcon />}
            onClick={() => handlePlayVideoClick()}
          >
            Watch Video
          </Button>

          {data.trailer_url && (
            <Button
              variant="outlined"
              fullWidth
              startIcon={<PlayIcon />}
              onClick={handlePlayTrailerClick}
            >
              Watch Trailer
            </Button>
          )}

          {data.preroll_url && (
            <Button
              variant="contained"
              fullWidth
              startIcon={<PlayIcon />}
              onClick={() => handlePlayPrerollClick()}
            >
              Watch Pre-roll Video
            </Button>
          )}

          <div className="flex gap-2">
            <Button
              variant="contained"
              color={'info'}
              fullWidth
              startIcon={<EditIcon />}
              onClick={() =>
                navigate(`/admin/video-management/edit/${videoId}`)
              }
            >
              Edit
            </Button>

            <Button
              variant="contained"
              color={'error'}
              fullWidth
              startIcon={<DeleteIcon />}
              onClick={handleDeleteClick}
            >
              Delete
            </Button>
          </div>
        </div>

        <div className="space-y-8">
          <Typography variant="h4" fontWeight={600}>
            {data.title}
          </Typography>
          <div className="space-y-4">
            <Typography variant="body1" className="flex items-center gap-2">
              <CalendarIcon size={20} /> Published on{' '}
              {dayjs(data.createdAt).format('MMMM DD, YYYY h:mm A')}
            </Typography>
            <Typography variant="body1" className="flex items-center gap-2">
              <CalendarIcon size={20} /> Last updated{' '}
              {dayjs(data.updatedAt).fromNow()}
            </Typography>
            <Typography variant="body1" className="flex items-center gap-2">
              <DurationIcon size={20} /> Duration: {data.duration} min
            </Typography>
          </div>
          <div className="space-y-2">
            <Typography variant="h6" fontWeight={600}>
              Genres
            </Typography>
            <div className="flex gap-2 flex-wrap">
              {data.genre.split(',').map((genre) => (
                <Chip key={genre} label={genre.trim()} />
              ))}
            </div>
          </div>

          {/* Display tags if available */}
          {data.tags && data.tags.length > 0 && (
            <div className="space-y-2">
              <Typography variant="h6" fontWeight={600}>
                Tags
              </Typography>
              <div className="flex gap-2 flex-wrap">
                {data.tags.map((tag) => (
                  <Chip
                    key={tag}
                    label={tag}
                    variant="outlined"
                    color="primary"
                  />
                ))}
              </div>
            </div>
          )}

          <div>
            <VideoDescriptionItem
              title="Description"
              details={data.short_desc}
            />

            <VideoDescriptionItem title="About" details={data.about} />

            <VideoDescriptionItem
              title="Primary Lesson"
              details={data.primary_lesson}
            />

            <VideoDescriptionItem title="Theme" details={data.theme} />

            <VideoDescriptionItem title="Impact" details={data.impact} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default VideoDetailsPage;
