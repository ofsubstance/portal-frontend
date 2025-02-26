export class CreateShareLinkDto {
  readonly validity_days?: number;
  readonly video_id: string = '';
}

export class ShareLinkDto {
  id?: string;
  unique_link_id?: string;
  unique_link?: string;
  expiration_time?: string;
  views?: number;
  createdAt?: string;
  updatedAt?: string;
  isDeleted?: boolean;
  video?: {
    id: string;
    title: string;
    thumbnail_url: string;
  } & Record<string, unknown>;
  user?: {
    id: string;
    firstname: string;
    lastname: string;
    email: string;
  } & Record<string, unknown>;
}

export interface EngagementDetail {
  time: string;
  ip: string;
  is_unique: boolean;
  referrer: string;
}

export interface ShareLinkAnalyticsDto {
  id: string;
  unique_link: string;
  unique_link_id: string;
  created_at: string;
  expiration_time: string;
  days_until_expiration: number;
  is_expired: boolean;
  video: {
    id: string;
    title: string;
    thumbnail_url: string;
    duration: string;
    genre: string;
  };
  user: {
    id: string;
    name: string;
    email: string;
  };
  views: number;
  unique_visitors: number;
  return_visitors: number;
  unique_ips: number;
  engagement_rate: string;
  last_engagement: string | null;
  engagement_details: EngagementDetail[];
}
