import { IResponse } from '@/dtos/response.dto';
import {
  CreateShareLinkDto,
  ShareLinkAnalyticsDto,
  ShareLinkDto,
} from '@/dtos/sharelink.dto';
import APIUrl from '../constants/apiUrl';
import httpClient from '../utils/httpClient';

interface ShareLinkVisitData {
  ip_address: string;
  user_agent: string;
  referrer: string;
}

class ShareLinkService {
  async createShareLink(data: CreateShareLinkDto) {
    const response = await httpClient.post<IResponse<ShareLinkDto>>(
      APIUrl.sharelinks.create(),
      data
    );
    return response.data.body;
  }

  async getUserShareLinks() {
    const response = await httpClient.get<IResponse<ShareLinkDto[]>>(
      APIUrl.sharelinks.getByUser()
    );
    return response.data.body;
  }

  async getShareLinkById(id: string) {
    const response = await httpClient.get<IResponse<ShareLinkDto>>(
      APIUrl.sharelinks.getById(id)
    );
    return response.data.body;
  }

  async verifyShareLinkByUniqueId(uniqueId: string) {
    try {
      const response = await httpClient.get<IResponse<ShareLinkDto>>(
        APIUrl.sharelinks.getByUniqueId(uniqueId)
      );
      return response.data;
    } catch (error) {
      console.error('Error verifying share link:', error);
      throw error;
    }
  }

  async trackShareLinkVisit(uniqueId: string, visitData: ShareLinkVisitData) {
    try {
      await httpClient.put(APIUrl.sharelinks.trackVisit(uniqueId), visitData);
    } catch (error) {
      console.error('Error tracking share link visit:', error);
      // Silently fail - don't interrupt user experience
    }
  }

  async getComprehensiveAnalytics() {
    try {
      const response = await httpClient.get<IResponse<ShareLinkAnalyticsDto[]>>(
        APIUrl.sharelinks.getComprehensiveAnalytics()
      );
      return response.data.body;
    } catch (error) {
      console.error('Error getting share link analytics:', error);
      throw error;
    }
  }
}

export default new ShareLinkService();
