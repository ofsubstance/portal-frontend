import {
  DAUDto,
  GrowthTrendDto,
  MAUDto,
  RetentionDto,
  SessionEngagementDailyDto,
  SessionEngagementDto,
  UserTrendDto,
} from '@/dtos/metrics.dto';
import { IResponse } from '@/dtos/response.dto';
import APIUrl from '../constants/apiUrl';
import httpClient from '../utils/httpClient';

class MetricsService {
  async getDailyActiveUsers(date: string): Promise<DAUDto> {
    const res = await httpClient.get<IResponse<DAUDto>>(
      APIUrl.metrics.getDau(date)
    );
    return res.data.body;
  }

  async getMonthlyActiveUsers(date: string): Promise<MAUDto> {
    const res = await httpClient.get<IResponse<MAUDto>>(
      APIUrl.metrics.getMau(date)
    );
    return res.data.body;
  }

  async getUserTrend(
    startDate: string,
    endDate: string,
    span: 'daily' | 'weekly' | 'monthly' = 'daily'
  ): Promise<UserTrendDto> {
    const res = await httpClient.get<IResponse<UserTrendDto>>(
      APIUrl.metrics.getUserTrend(startDate, endDate, span)
    );
    return res.data.body;
  }

  async getGrowthTrend(
    startDate: string,
    endDate: string,
    span: 'daily' | 'weekly' | 'monthly' = 'daily'
  ): Promise<GrowthTrendDto> {
    const res = await httpClient.get<IResponse<GrowthTrendDto>>(
      APIUrl.metrics.getGrowthTrend(startDate, endDate, span)
    );
    return res.data.body;
  }

  async getRetentionRates(
    startDate: string,
    endDate: string
  ): Promise<RetentionDto> {
    const res = await httpClient.get<IResponse<RetentionDto>>(
      APIUrl.metrics.getRetention(startDate, endDate)
    );
    return res.data.body;
  }

  async getSessionEngagement(
    startDate: string,
    endDate: string
  ): Promise<SessionEngagementDto> {
    const res = await httpClient.get<{
      status: string;
      data: SessionEngagementDto;
    }>(APIUrl.metrics.getSessionEngagement(startDate, endDate));
    return res.data.data;
  }

  async getSessionEngagementDaily(
    startDate: string,
    endDate: string
  ): Promise<SessionEngagementDailyDto> {
    const res = await httpClient.get<{
      status: string;
      data: SessionEngagementDailyDto['data'];
    }>(APIUrl.metrics.getSessionEngagementDaily(startDate, endDate));
    return { data: res.data.data };
  }
}

export default new MetricsService();
