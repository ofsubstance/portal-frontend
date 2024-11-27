import { VideoDto, VideoUploadDto } from '@/dtos/video.dto';

import { IResponse } from '@/dtos/response.dto';
import APIUrl from '../constants/apiUrl';
import httpClient from '../utils/httpClient';

class VideoManagementService {
  async uploadVideo(data: VideoUploadDto) {
    const res = await httpClient.postForm<IResponse<VideoDto>>(
      APIUrl.videoManagement.uploadVideo(),
      data
    );

    return res.data.body;
  }

  async getVideos() {
    const res = await httpClient.get<IResponse<VideoDto[]>>(
      APIUrl.videoManagement.getVideos()
    );

    return res.data.body;
  }

  async getVideoById(videoId: string) {
    const res = await httpClient.get<IResponse<VideoDto>>(
      APIUrl.videoManagement.getVideoById(videoId)
    );

    return res.data.body;
  }

  async updateVideo(videoId: string, data: VideoUploadDto) {
    const res = await httpClient.patch<IResponse<VideoDto>>(
      APIUrl.videoManagement.updateVideo(videoId),
      data
    );
    return res.data.body;
  }

  async deleteVideo(videoId: string) {
    const res = await httpClient.delete<IResponse<VideoDto>>(
      APIUrl.videoManagement.deleteVideo(videoId)
    );

    return res.data.body;
  }
}

export default new VideoManagementService();
