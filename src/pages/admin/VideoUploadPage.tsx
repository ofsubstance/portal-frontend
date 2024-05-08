import { Typography, useTheme } from "@mui/material";

import { RiVideoUploadFill as VideoIcon } from "react-icons/ri";
import { VideoUploadDto } from "@/dtos/video.dto";
import VideoUploadForm from "@/components/video-management/VideoUploadForm";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import useVideoManagementActions from "@/hooks/useVideoManagementAction";

function VideoUploadPage() {
  const theme = useTheme();
  const navigate = useNavigate();
  const { uploadVideoMutation } = useVideoManagementActions();

  const onVideoUpload = (data: VideoUploadDto) => {
    uploadVideoMutation.mutate(data, {
      onSuccess: () => {
        toast.success("Video uploaded successfully");
        navigate("/admin/video-management");
      },
    });
  };

  return (
    <div className="flex flex-col gap-4 pb-10">
      <Typography variant="h5" fontWeight={600}>
        <VideoIcon
          className="inline-block mr-3"
          size={40}
          color={theme.palette.primary.main}
        />
        Video Upload
      </Typography>

      <VideoUploadForm onSubmit={onVideoUpload} />
    </div>
  );
}

export default VideoUploadPage;
