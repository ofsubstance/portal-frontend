import { UserDto } from './user.dto';

export interface UserProfileDto extends UserDto {
  profile: {
    id: string;
    business_name: string;
    website: string;
    state_region: string;
    country: string;
    utilization_purpose: string;
    interests: string[];
    last_login: string;
  };
}

export interface UserCommentDto {
  id: string;
  createdAt: string;
  updatedAt: string;
  text: string;
  status: 'pending' | 'approved' | 'rejected';
  video: {
    id: string;
    thumbnail_url: string;
    title: string;
  };
}

export interface UserFeedbackDto {
  id: string;
  createdAt: string;
  engagementLevel: number;
  subjectMatterUsefulness: number;
  outcomeImprovement: number;
  continueUsageLikelihood: number;
  recommendLikelihood: number;
  openEndedFeedback: string;
  video: {
    id: string;
    thumbnail_url: string;
    title: string;
  };
}

export interface UserSharelinkDto {
  id: string;
  createdAt: string;
  expiration_time: string;
  views: number;
  unique_link: string;
  unique_link_id: string;
  video: {
    id: string;
    thumbnail_url: string;
    title: string;
  };
}
