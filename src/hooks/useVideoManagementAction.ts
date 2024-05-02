import { useMutation } from "@tanstack/react-query";
import videoManagementService from "@/services/video-management.service";

function useVideoManagementActions() {
  const uploadVideoMutation = useMutation({
    mutationFn: videoManagementService.uploadVideo,
  });

  return {
    uploadVideoMutation,
  };
}

export default useVideoManagementActions;
