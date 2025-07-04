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

export interface SessionTimeDto {
  startDate: string;
  endDate: string;
  span: 'daily' | 'weekly' | 'monthly';
  data: {
    date: string;
    minutes: number;
    sessionCount: number;
  }[];
  averageSessionTimeMinutes: number;
  totalSessions: number;
}

export interface UserUtilizationDto {
  totalUsers: number;
  data: {
    purpose: string;
    count: number;
    percentage: number;
  }[];
}

export interface UserInterestsDto {
  totalUsers: number;
  data: {
    interest: string;
    count: number;
  }[];
}

export interface InterestSankeyDto {
  totalUsers: number;
  sankeyData: {
    nodes: {
      id: string;
      name: string;
    }[];
    links: {
      source: string;
      target: string;
      value: number;
    }[];
  };
  nodeFrequencies: {
    id: string;
    count: number;
  }[];
}

// Content Performance Metrics DTOs
export interface VideoListItemDto {
  id: string;
  title: string;
  thumbnailUrl: string;
  duration: number;
  viewCount: number;
}

export interface VideoViewsDto {
  videoId: string;
  title: string;
  period: 'daily' | 'weekly' | 'monthly';
  dateRange: {
    start: string;
    end: string;
  };
  totalViews: number;
  distribution: Array<{
    date?: string;
    week?: string;
    month?: string;
    count: number;
  }>;
}

export interface VideoPercentageWatchedDto {
  videoId: string;
  title: string;
  period: 'daily' | 'weekly' | 'monthly';
  dateRange: {
    start: string;
    end: string;
  };
  averagePercentageWatched: number;
  totalSessions: number;
  distribution: Array<{
    date?: string;
    week?: string;
    month?: string;
    averagePercentage: number;
    sessionCount: number;
  }>;
}

// New DTOs for video shares and completion rates
export interface VideoSharesDto {
  videoId: string;
  title: string;
  period: 'daily' | 'weekly' | 'monthly';
  dateRange: {
    start: string;
    end: string;
  };
  totalShares: number;
  distribution: Array<{
    date?: string;
    week?: string;
    month?: string;
    count: number;
  }>;
}

export interface VideoCompletionRatesDto {
  videoId: string;
  title: string;
  period: 'daily' | 'weekly' | 'monthly';
  dateRange: {
    start: string;
    end: string;
  };
  totalSessions: number;
  completedSessions: number;
  partialSessions: number;
  droppedOffSessions: number;
  completionRate: number;
  partialRate: number;
  dropOffRate: number;
  distribution: Array<{
    date?: string;
    week?: string;
    month?: string;
    totalSessions: number;
    completedSessions: number;
    partialSessions: number;
    droppedOffSessions: number;
    completionRate: number;
    partialRate: number;
    dropOffRate: number;
  }>;
}

// Macro Content Metrics DTOs
export interface MacroContentCompletionRatesDto {
  startDate: string;
  endDate: string;
  data: {
    videoId: string;
    title: string;
    genre: string;
    duration: string;
    averageCompletion: number;
    totalSessions: number;
    totalTimeWatched: number;
  }[];
}

export interface MacroContentMostViewedDto {
  startDate: string;
  endDate: string;
  data: {
    videoId: string;
    title: string;
    genre: string;
    duration: string;
    tags: string[];
    viewCount: number;
    uniqueViewers: number;
    averageCompletion: number;
  }[];
}

export interface MacroContentMostSharedDto {
  startDate: string;
  endDate: string;
  data: {
    videoId: string;
    title: string;
    genre: string;
    duration: string;
    shareCount: number;
    totalViews: number;
    averageViewsPerShare: number;
  }[];
}

export interface MacroContentLinkClickthroughDto {
  startDate: string;
  endDate: string;
  data: {
    videoId: string;
    title: string;
    genre: string;
    totalLinks: number;
    totalViews: number;
    uniqueEngagements: number;
    clickthroughRate: number;
  }[];
}

export interface MacroContentEngagementScoresDto {
  startDate: string;
  endDate: string;
  data: {
    videoId: string;
    title: string;
    genre: string;
    duration: string;
    tags: string[];
    engagementScore: number;
    metrics: {
      totalViews: number;
      uniqueViewers: number;
      avgCompletion: number;
      commentCount: number;
      feedbackCount: number;
      shareCount: number;
      avgEngagementLevel: number;
      avgRecommendLikelihood: number;
    };
  }[];
}

export interface MacroContentViewingPatternsDto {
  startDate: string;
  endDate: string;
  data: {
    totalSessions: number;
    uniqueViewers: number;
    completionDistribution: {
      range: string;
      count: number;
      percentage: number;
    }[];
    sessionDurations: {
      average: number;
      totalSessions: number;
    };
    interactions: {
      totalInteractions: number;
      avgInteractionsPerVideo: number;
      videosWithInteractions: number;
    };
    peakViewingHours: {
      hour: string;
      sessions: number;
    }[];
    hourlyDistribution: {
      hour: string;
      sessions: number;
    }[];
  };
}
