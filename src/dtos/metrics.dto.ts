export interface DAUDto {
  date: string;
  count: number;
}

export interface MAUDto {
  month: string;
  count: number;
}

export interface UserTrendDto {
  startDate: string;
  endDate: string;
  span: 'daily' | 'weekly' | 'monthly';
  data: {
    date: string;
    count: number;
  }[];
}

export interface GrowthTrendDto {
  startDate: string;
  endDate: string;
  span: 'daily' | 'weekly' | 'monthly';
  data: {
    date: string;
    userCount: number;
    growthRate: number;
    previousPeriodCount: number;
  }[];
}

export interface RetentionDto {
  startDate: string;
  endDate: string;
  totalMonths: number;
  cohorts: number;
  data: {
    cohort: string;
    totalUsers: number;
    maxMonthsTracked: number;
    overallRetentionRate: number;
    month0: number;
    month1: number;
    month0Count: number;
    month1Count: number;
  }[];
}

export interface SessionEngagementDto {
  totalSessions: number;
  averageDurationMinutes: number;
  totalDurationMinutes: number;
  engagedSessions: number;
  engagementRate: number;
  startDate: string;
  endDate: string;
}

export interface SessionEngagementDailyDto {
  data: {
    date: string;
    sessions: number;
    engagedSessions: number;
    engagementRate: number;
  }[];
}
