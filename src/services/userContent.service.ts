import APIUrl from '@/constants/apiUrl';
import { IResponse } from '@/dtos/response.dto';
import {
  UserCommentDto,
  UserFeedbackDto,
  UserProfileDto,
  UserSharelinkDto,
} from '@/dtos/userContent.dto';
import httpClient from '../utils/httpClient';

class UserContentService {
  /**
   * Get user profile information
   * @returns Promise with user profile data
   */
  async getUserProfile(): Promise<UserProfileDto> {
    try {
      const response = await httpClient.get<IResponse<UserProfileDto>>(
        APIUrl.userContent.profile()
      );
      return response.data.body;
    } catch (error) {
      console.error('Failed to get user profile:', error);
      throw error;
    }
  }

  /**
   * Get user comments
   * @returns Promise with user comments
   */
  async getUserComments(): Promise<UserCommentDto[]> {
    try {
      const response = await httpClient.get<IResponse<UserCommentDto[]>>(
        APIUrl.userContent.comments()
      );
      return response.data.body;
    } catch (error) {
      console.error('Failed to get user comments:', error);
      throw error;
    }
  }

  /**
   * Get user feedbacks
   * @returns Promise with user feedbacks
   */
  async getUserFeedbacks(): Promise<UserFeedbackDto[]> {
    try {
      const response = await httpClient.get<IResponse<UserFeedbackDto[]>>(
        APIUrl.userContent.feedbacks()
      );
      return response.data.body;
    } catch (error) {
      console.error('Failed to get user feedbacks:', error);
      throw error;
    }
  }

  /**
   * Get user shared links
   * @returns Promise with user shared links
   */
  async getUserSharelinks(): Promise<UserSharelinkDto[]> {
    try {
      const response = await httpClient.get<IResponse<UserSharelinkDto[]>>(
        APIUrl.userContent.sharelinks()
      );
      return response.data.body;
    } catch (error) {
      console.error('Failed to get user shared links:', error);
      throw error;
    }
  }
}

export default new UserContentService();
