import {
  DAUDto,
  GrowthTrendDto,
  InterestSankeyDto,
  MAUDto,
  RetentionDto,
  SessionEngagementDailyDto,
  SessionEngagementDto,
  SessionTimeDto,
  UserInterestsDto,
  UserTrendDto,
  UserUtilizationDto,
  VideoCompletionRatesDto,
  VideoListItemDto,
  VideoPercentageWatchedDto,
  VideoSharesDto,
  VideoViewsDto,
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

  async getSessionTime(
    startDate: string,
    endDate: string,
    span: 'daily' | 'weekly' | 'monthly' = 'daily'
  ): Promise<SessionTimeDto> {
    const res = await httpClient.get<IResponse<SessionTimeDto>>(
      APIUrl.metrics.getSessionTime(startDate, endDate, span)
    );
    return res.data.body;
  }

  async getUserUtilization(): Promise<UserUtilizationDto> {
    const res = await httpClient.get<IResponse<UserUtilizationDto>>(
      APIUrl.metrics.getUserUtilization()
    );
    return res.data.body;
  }

  async getUserInterests(): Promise<UserInterestsDto> {
    const res = await httpClient.get<IResponse<UserInterestsDto>>(
      APIUrl.metrics.getUserInterests()
    );
    return res.data.body;
  }

  async getInterestSankey(): Promise<InterestSankeyDto> {
    const res = await httpClient.get<IResponse<InterestSankeyDto>>(
      APIUrl.metrics.getInterestSankey()
    );
    return res.data.body;
  }

  // Content Performance Metrics
  async getVideoListForMetrics(): Promise<VideoListItemDto[]> {
    const res = await httpClient.get<IResponse<VideoListItemDto[]>>(
      APIUrl.metrics.getVideoList()
    );
    return res.data.body;
  }

  async getVideoViews(
    videoId: string,
    startDate: string,
    endDate: string,
    period: 'daily' | 'weekly' | 'monthly' = 'daily'
  ): Promise<VideoViewsDto> {
    const res = await httpClient.get<IResponse<VideoViewsDto>>(
      APIUrl.metrics.getVideoViews(videoId, startDate, endDate, period)
    );
    return res.data.body;
  }

  async getVideoPercentageWatched(
    videoId: string,
    startDate: string,
    endDate: string,
    period: 'daily' | 'weekly' | 'monthly' = 'daily'
  ): Promise<VideoPercentageWatchedDto> {
    const res = await httpClient.get<IResponse<VideoPercentageWatchedDto>>(
      APIUrl.metrics.getVideoPercentageWatched(
        videoId,
        startDate,
        endDate,
        period
      )
    );
    return res.data.body;
  }

  async getVideoShares(
    videoId: string,
    startDate: string,
    endDate: string,
    period: 'daily' | 'weekly' | 'monthly' = 'daily'
  ): Promise<VideoSharesDto> {
    const res = await httpClient.get<IResponse<VideoSharesDto>>(
      APIUrl.metrics.getVideoShares(videoId, startDate, endDate, period)
    );
    return res.data.body;
  }

  async getVideoCompletionRates(
    videoId: string,
    startDate: string,
    endDate: string,
    period: 'daily' | 'weekly' | 'monthly' = 'daily'
  ): Promise<VideoCompletionRatesDto> {
    const res = await httpClient.get<IResponse<VideoCompletionRatesDto>>(
      APIUrl.metrics.getVideoCompletionRates(
        videoId,
        startDate,
        endDate,
        period
      )
    );
    return res.data.body;
  }
}

export default new MetricsService();
