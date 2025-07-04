import metricsService from '@/services/metrics.service';
import { useQuery } from '@tanstack/react-query';
import { format } from 'date-fns';

type SpanType = 'daily' | 'weekly' | 'monthly';

const useMetricsActions = () => {
  const useDailyActiveUsersQuery = (date: Date) => {
    const formattedDate = format(date, 'yyyy-MM-dd');
    return useQuery({
      queryKey: ['dau', formattedDate],
      queryFn: () => metricsService.getDailyActiveUsers(formattedDate),
      staleTime: 0,
      refetchOnWindowFocus: false,
    });
  };

  const useMonthlyActiveUsersQuery = (date: Date) => {
    const formattedDate = format(date, 'yyyy-MM-dd');
    return useQuery({
      queryKey: ['mau', formattedDate],
      queryFn: () => metricsService.getMonthlyActiveUsers(formattedDate),
      staleTime: 0,
      refetchOnWindowFocus: false,
    });
  };

  const useUserTrendQuery = (
    startDate: Date,
    endDate: Date,
    span: SpanType = 'daily'
  ) => {
    const formattedStartDate = format(startDate, 'yyyy-MM-dd');
    const formattedEndDate = format(endDate, 'yyyy-MM-dd');
    return useQuery({
      queryKey: ['user-trend', formattedStartDate, formattedEndDate, span],
      queryFn: () =>
        metricsService.getUserTrend(formattedStartDate, formattedEndDate, span),
      staleTime: 0,
      refetchOnWindowFocus: false,
    });
  };

  const useGrowthTrendQuery = (
    startDate: Date,
    endDate: Date,
    span: SpanType = 'daily'
  ) => {
    const formattedStartDate = format(startDate, 'yyyy-MM-dd');
    const formattedEndDate = format(endDate, 'yyyy-MM-dd');
    return useQuery({
      queryKey: ['growth-trend', formattedStartDate, formattedEndDate, span],
      queryFn: () =>
        metricsService.getGrowthTrend(
          formattedStartDate,
          formattedEndDate,
          span
        ),
      staleTime: 0,
      refetchOnWindowFocus: false,
    });
  };

  const useRetentionRatesQuery = (startDate: Date, endDate: Date) => {
    const formattedStartDate = format(startDate, 'yyyy-MM-dd');
    const formattedEndDate = format(endDate, 'yyyy-MM-dd');
    return useQuery({
      queryKey: ['retention', formattedStartDate, formattedEndDate],
      queryFn: () =>
        metricsService.getRetentionRates(formattedStartDate, formattedEndDate),
      staleTime: 0,
      refetchOnWindowFocus: false,
    });
  };

  const useSessionEngagementQuery = (startDate: Date, endDate: Date) => {
    const formattedStartDate = format(startDate, 'yyyy-MM-dd');
    const formattedEndDate = format(endDate, 'yyyy-MM-dd');
    return useQuery({
      queryKey: ['session-engagement', formattedStartDate, formattedEndDate],
      queryFn: () =>
        metricsService.getSessionEngagement(
          formattedStartDate,
          formattedEndDate
        ),
      staleTime: 0,
      refetchOnWindowFocus: false,
    });
  };

  const useSessionEngagementDailyQuery = (startDate: Date, endDate: Date) => {
    const formattedStartDate = format(startDate, 'yyyy-MM-dd');
    const formattedEndDate = format(endDate, 'yyyy-MM-dd');
    return useQuery({
      queryKey: [
        'session-engagement-daily',
        formattedStartDate,
        formattedEndDate,
      ],
      queryFn: () =>
        metricsService.getSessionEngagementDaily(
          formattedStartDate,
          formattedEndDate
        ),
      staleTime: 0,
      refetchOnWindowFocus: false,
    });
  };

  const useSessionTimeQuery = (
    startDate: Date,
    endDate: Date,
    span: SpanType = 'daily'
  ) => {
    const formattedStartDate = format(startDate, 'yyyy-MM-dd');
    const formattedEndDate = format(endDate, 'yyyy-MM-dd');
    return useQuery({
      queryKey: ['session-time', formattedStartDate, formattedEndDate, span],
      queryFn: () =>
        metricsService.getSessionTime(
          formattedStartDate,
          formattedEndDate,
          span
        ),
      staleTime: 0,
      refetchOnWindowFocus: false,
    });
  };

  const useUserUtilizationQuery = () => {
    return useQuery({
      queryKey: ['user-utilization'],
      queryFn: () => metricsService.getUserUtilization(),
      staleTime: 0,
      refetchOnWindowFocus: false,
    });
  };

  const useUserInterestsQuery = () => {
    return useQuery({
      queryKey: ['user-interests'],
      queryFn: () => metricsService.getUserInterests(),
      staleTime: 0,
      refetchOnWindowFocus: false,
    });
  };

  const useInterestSankeyQuery = () => {
    return useQuery({
      queryKey: ['interest-sankey'],
      queryFn: () => metricsService.getInterestSankey(),
      staleTime: 0,
      refetchOnWindowFocus: false,
    });
  };

  // Content Performance Metrics
  const useVideoListForMetricsQuery = () => {
    return useQuery({
      queryKey: ['video-list-metrics'],
      queryFn: () => metricsService.getVideoListForMetrics(),
      staleTime: 0,
      refetchOnWindowFocus: false,
    });
  };

  const useVideoViewsQuery = (
    videoId: string,
    startDate: Date,
    endDate: Date,
    period: SpanType = 'daily'
  ) => {
    const formattedStartDate = format(startDate, 'yyyy-MM-dd');
    const formattedEndDate = format(endDate, 'yyyy-MM-dd');
    return useQuery({
      queryKey: [
        'video-views',
        videoId,
        formattedStartDate,
        formattedEndDate,
        period,
      ],
      queryFn: () =>
        metricsService.getVideoViews(
          videoId,
          formattedStartDate,
          formattedEndDate,
          period
        ),
      staleTime: 0, // Always treat data as stale to ensure refresh
      enabled: !!videoId,
      refetchOnWindowFocus: false,
    });
  };

  const useVideoPercentageWatchedQuery = (
    videoId: string,
    startDate: Date,
    endDate: Date,
    period: SpanType = 'daily'
  ) => {
    const formattedStartDate = format(startDate, 'yyyy-MM-dd');
    const formattedEndDate = format(endDate, 'yyyy-MM-dd');
    return useQuery({
      queryKey: [
        'video-percentage-watched',
        videoId,
        formattedStartDate,
        formattedEndDate,
        period,
      ],
      queryFn: () =>
        metricsService.getVideoPercentageWatched(
          videoId,
          formattedStartDate,
          formattedEndDate,
          period
        ),
      staleTime: 0, // Always treat data as stale to ensure refresh
      enabled: !!videoId,
      refetchOnWindowFocus: false,
    });
  };

  const useVideoSharesQuery = (
    videoId: string,
    startDate: Date,
    endDate: Date,
    period: SpanType = 'daily'
  ) => {
    const formattedStartDate = format(startDate, 'yyyy-MM-dd');
    const formattedEndDate = format(endDate, 'yyyy-MM-dd');
    return useQuery({
      queryKey: [
        'video-shares',
        videoId,
        formattedStartDate,
        formattedEndDate,
        period,
      ],
      queryFn: () =>
        metricsService.getVideoShares(
          videoId,
          formattedStartDate,
          formattedEndDate,
          period
        ),
      staleTime: 0, // Always treat data as stale to ensure refresh
      enabled: !!videoId,
      refetchOnWindowFocus: false,
    });
  };

  const useVideoCompletionRatesQuery = (
    videoId: string,
    startDate: Date,
    endDate: Date,
    period: SpanType = 'daily'
  ) => {
    const formattedStartDate = format(startDate, 'yyyy-MM-dd');
    const formattedEndDate = format(endDate, 'yyyy-MM-dd');
    return useQuery({
      queryKey: [
        'video-completion-rates',
        videoId,
        formattedStartDate,
        formattedEndDate,
        period,
      ],
      queryFn: () =>
        metricsService.getVideoCompletionRates(
          videoId,
          formattedStartDate,
          formattedEndDate,
          period
        ),
      staleTime: 0, // Always treat data as stale to ensure refresh
      enabled: !!videoId,
      refetchOnWindowFocus: false,
    });
  };

  // Macro Content Metrics
  const useMacroContentCompletionRatesQuery = (
    startDate: Date,
    endDate: Date
  ) => {
    const formattedStartDate = format(startDate, 'MM-dd-yyyy');
    const formattedEndDate = format(endDate, 'MM-dd-yyyy');
    return useQuery({
      queryKey: [
        'macro-content-completion-rates',
        formattedStartDate,
        formattedEndDate,
      ],
      queryFn: () =>
        metricsService.getMacroContentCompletionRates(
          formattedStartDate,
          formattedEndDate
        ),
      staleTime: 0,
      refetchOnWindowFocus: false,
    });
  };

  const useMacroContentMostViewedQuery = (startDate: Date, endDate: Date) => {
    const formattedStartDate = format(startDate, 'MM-dd-yyyy');
    const formattedEndDate = format(endDate, 'MM-dd-yyyy');
    return useQuery({
      queryKey: [
        'macro-content-most-viewed',
        formattedStartDate,
        formattedEndDate,
      ],
      queryFn: () =>
        metricsService.getMacroContentMostViewed(
          formattedStartDate,
          formattedEndDate
        ),
      staleTime: 0,
      refetchOnWindowFocus: false,
    });
  };

  const useMacroContentMostSharedQuery = (startDate: Date, endDate: Date) => {
    const formattedStartDate = format(startDate, 'MM-dd-yyyy');
    const formattedEndDate = format(endDate, 'MM-dd-yyyy');
    return useQuery({
      queryKey: [
        'macro-content-most-shared',
        formattedStartDate,
        formattedEndDate,
      ],
      queryFn: () =>
        metricsService.getMacroContentMostShared(
          formattedStartDate,
          formattedEndDate
        ),
      staleTime: 0,
      refetchOnWindowFocus: false,
    });
  };

  const useMacroContentLinkClickthroughQuery = (
    startDate: Date,
    endDate: Date
  ) => {
    const formattedStartDate = format(startDate, 'MM-dd-yyyy');
    const formattedEndDate = format(endDate, 'MM-dd-yyyy');
    return useQuery({
      queryKey: [
        'macro-content-link-clickthrough',
        formattedStartDate,
        formattedEndDate,
      ],
      queryFn: () =>
        metricsService.getMacroContentLinkClickthrough(
          formattedStartDate,
          formattedEndDate
        ),
      staleTime: 0,
      refetchOnWindowFocus: false,
    });
  };

  const useMacroContentEngagementScoresQuery = (
    startDate: Date,
    endDate: Date
  ) => {
    const formattedStartDate = format(startDate, 'MM-dd-yyyy');
    const formattedEndDate = format(endDate, 'MM-dd-yyyy');
    return useQuery({
      queryKey: [
        'macro-content-engagement-scores',
        formattedStartDate,
        formattedEndDate,
      ],
      queryFn: () =>
        metricsService.getMacroContentEngagementScores(
          formattedStartDate,
          formattedEndDate
        ),
      staleTime: 0,
      refetchOnWindowFocus: false,
    });
  };

  const useMacroContentViewingPatternsQuery = (
    startDate: Date,
    endDate: Date
  ) => {
    const formattedStartDate = format(startDate, 'MM-dd-yyyy');
    const formattedEndDate = format(endDate, 'MM-dd-yyyy');
    return useQuery({
      queryKey: [
        'macro-content-viewing-patterns',
        formattedStartDate,
        formattedEndDate,
      ],
      queryFn: () =>
        metricsService.getMacroContentViewingPatterns(
          formattedStartDate,
          formattedEndDate
        ),
      staleTime: 0,
      refetchOnWindowFocus: false,
    });
  };

  return {
    useDailyActiveUsersQuery,
    useMonthlyActiveUsersQuery,
    useUserTrendQuery,
    useGrowthTrendQuery,
    useRetentionRatesQuery,
    useSessionEngagementQuery,
    useSessionEngagementDailyQuery,
    useSessionTimeQuery,
    useUserUtilizationQuery,
    useUserInterestsQuery,
    useInterestSankeyQuery,
    // Content Performance
    useVideoListForMetricsQuery,
    useVideoViewsQuery,
    useVideoPercentageWatchedQuery,
    useVideoSharesQuery,
    useVideoCompletionRatesQuery,
    // Macro Content Metrics
    useMacroContentCompletionRatesQuery,
    useMacroContentMostViewedQuery,
    useMacroContentMostSharedQuery,
    useMacroContentLinkClickthroughQuery,
    useMacroContentEngagementScoresQuery,
    useMacroContentViewingPatternsQuery,
  };
};

export default useMetricsActions;
