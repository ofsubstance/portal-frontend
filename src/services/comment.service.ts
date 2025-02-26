import {
  CommentDto,
  CreateCommentDto,
  UpdateCommentStatusDto,
} from '@/dtos/comment.dto';
import { IResponse } from '@/dtos/response.dto';
import APIUrl from '../constants/apiUrl';
import httpClient from '../utils/httpClient';

class CommentService {
  async getAllComments() {
    const response = await httpClient.get<IResponse<CommentDto[]>>(
      APIUrl.comments.getAll()
    );
    return response.data.body;
  }

  async getVideoComments(videoId: string) {
    const response = await httpClient.get<IResponse<CommentDto[]>>(
      APIUrl.comments.getByVideo(videoId)
    );
    return response.data.body;
  }

  async getUserComments() {
    const response = await httpClient.get<IResponse<CommentDto[]>>(
      APIUrl.comments.getByUser()
    );
    return response.data.body;
  }

  async createComment(data: CreateCommentDto) {
    const response = await httpClient.post<IResponse<CommentDto>>(
      APIUrl.comments.create(),
      data
    );
    return response.data.body;
  }

  async updateCommentStatus(commentId: string, data: UpdateCommentStatusDto) {
    const response = await httpClient.put<IResponse<CommentDto>>(
      APIUrl.comments.updateStatus(commentId),
      data
    );
    return response.data.body;
  }
}

export default new CommentService();
