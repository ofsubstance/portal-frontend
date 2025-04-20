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
      staleTime: 5 * 60 * 1000, // 5 minutes
    });
  };

  const useMonthlyActiveUsersQuery = (date: Date) => {
    const formattedDate = format(date, 'yyyy-MM-dd');
    return useQuery({
      queryKey: ['mau', formattedDate],
      queryFn: () => metricsService.getMonthlyActiveUsers(formattedDate),
      staleTime: 5 * 60 * 1000, // 5 minutes
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
      staleTime: 5 * 60 * 1000, // 5 minutes
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
      staleTime: 5 * 60 * 1000, // 5 minutes
    });
  };

  const useRetentionRatesQuery = (startDate: Date, endDate: Date) => {
    const formattedStartDate = format(startDate, 'yyyy-MM-dd');
    const formattedEndDate = format(endDate, 'yyyy-MM-dd');
    return useQuery({
      queryKey: ['retention', formattedStartDate, formattedEndDate],
      queryFn: () =>
        metricsService.getRetentionRates(formattedStartDate, formattedEndDate),
      staleTime: 5 * 60 * 1000, // 5 minutes
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
      staleTime: 5 * 60 * 1000, // 5 minutes
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
      staleTime: 5 * 60 * 1000, // 5 minutes
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
  };
};

export default useMetricsActions;
