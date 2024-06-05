import { useMutation, useQuery } from "@tanstack/react-query";

import { VideoUploadDto } from "@/dtos/video.dto";
import videoManagementService from "@/services/video-management.service";

export default function useVideoManagementActions() {
  const videoCreateMutation = useMutation({
    mutationFn: videoManagementService.uploadVideo,
  });

  const useVideoListQuery = () =>
    useQuery({
      queryKey: ["getVideoList"],
      queryFn: videoManagementService.getVideos,
    });

  const useVideoQuery = (videoId?: string) =>
    useQuery({
      enabled: !!videoId,
      queryKey: ["getVideo", videoId],
      queryFn: async () =>
        videoId
          ? await videoManagementService.getVideoById(videoId)
          : undefined,
    });

  const videoUpdateMutation = useMutation({
    mutationFn: ({
      videoId,
      data,
    }: {
      videoId: string;
      data: VideoUploadDto;
    }) => videoManagementService.updateVideo(videoId, data),
  });

  const videoDeleteMutation = useMutation({
    mutationFn: videoManagementService.deleteVideo,
  });

  return {
    videoCreateMutation,
    useVideoListQuery,
    useVideoQuery,
    videoUpdateMutation,
    videoDeleteMutation,
  };
}
