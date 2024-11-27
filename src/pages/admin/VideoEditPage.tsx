import { Typography, useTheme } from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';
import { RiVideoUploadFill as VideoIcon } from 'react-icons/ri';
import { VideoUploadDto } from '@/dtos/video.dto';
import VideoUploadForm from '@/components/video-management/VideoUploadForm';
import { toast } from 'react-toastify';
import useVideoManagementActions from '@/hooks/useVideoManagementAction';

export default function VideoEditPage() {
  const theme = useTheme();
  const navigate = useNavigate();
  const { videoId } = useParams();
  const { videoUpdateMutation, useVideoQuery } = useVideoManagementActions();

  const { data: videoData } = useVideoQuery(videoId);

  const onVideoUpdate = (data: VideoUploadDto) => {
    videoUpdateMutation.mutate(
      {
        videoId: videoId!,
        data,
      },
      {
        onSuccess: () => {
          toast.success('Video updated successfully');
          navigate('/admin/video-management');
        },
      }
    );
  };

  return (
    <div className="flex flex-col gap-4 pb-10">
      <Typography variant="h5" fontWeight={600}>
        <VideoIcon
          className="inline-block mr-3"
          size={40}
          color={theme.palette.primary.main}
        />
        Update Video
      </Typography>

      {videoData && (
        <VideoUploadForm onSubmit={onVideoUpdate} defaultValues={videoData} />
      )}
    </div>
  );
}
