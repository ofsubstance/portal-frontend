import APIUrl from "../constants/apiUrl";
import { IResponse } from "@/dtos/response.dto";
import { VideoUploadDto } from "@/dtos/video.dto";
import httpClient from "../utils/httpClient";

class VideoManagementService {
  async uploadVideo(data: VideoUploadDto) {
    const res = await httpClient.postForm<IResponse<any>>(
      APIUrl.videoManagement.uploadVideo(),
      data
    );

    return res.data;
  }
}

export default new VideoManagementService();
