import { UserRole } from '@/constants/enums';
import { userUpdateValidation } from '@/validators/user.validator';
import { z } from 'zod';

export type UserUpdateDto = z.infer<typeof userUpdateValidation>;

export interface UserProfileDto {
  id: string;
  business_name: string;
  website: string;
  state_region: string;
  country: string;
  utilization_purpose: string;
  interests: string[];
}

export interface UserDto {
  id: string;
  email: string;
  firstname: string;
  lastname: string;
  role: UserRole;
  avatar: string;
  createdAt: string;
  updatedAt: string;
  status: string;
  phone?: string;
  birthDate?: Date;
  bio?: string;
  gender?: string;
  language?: string;
  location?: string;
  sms_consent?: boolean;
  last_login?: string;
  first_content_engagement?: string | null;
  isDeleted?: boolean;
  email_consent?: boolean;
  email_verification_token?: string;
  reset_pass_token?: string | null;
  reset_pass_token_expiry?: string | null;
  profile: UserProfileDto;
}

export interface ShareableLinkDto {
  id: string;
  video: {
    id: string;
    title: string;
  };
  views: number;
  uniqueVisitors: number;
  createdAt: string;
  expirationTime: string;
}

export interface SessionStatsDto {
  totalSessions: number;
  activeSessions: number;
  engagedSessions: number;
  averageSessionDuration: number;
  lastSessionDate: string;
  engagementRate: number;
}

export interface WatchStatsDto {
  totalWatchSessions: number;
  totalWatchTimeMinutes: number;
  averageWatchPercentage: number;
  completedVideos: number;
  partiallyWatchedVideos: number;
  brieflyWatchedVideos: number;
  uniqueVideosWatched: number;
  completionRate: number;
}

export interface VideoSpecificStatsDto {
  videoId: string;
  videoTitle: string;
  totalSessions: number;
  completedSessions: number;
  totalWatchTimeMinutes: number;
  averageWatchPercentage: number;
  lastWatched: string;
}

export interface ShareableLinksDto {
  totalLinks: number;
  totalViews: number;
  totalUniqueVisitors: number;
  links: ShareableLinkDto[];
}

export interface EngagementTrendsDto {
  last30Days: {
    totalWatchSessions: number;
    totalWatchTimeMinutes: number;
    averageWatchPercentage: number;
    uniqueVideosWatched: number;
  };
}

export interface UserEngagementDto {
  sessionStats: SessionStatsDto;
  watchStats: WatchStatsDto;
  videoSpecificStats: VideoSpecificStatsDto[];
  shareableLinks: ShareableLinksDto;
  engagementTrends: EngagementTrendsDto;
}
