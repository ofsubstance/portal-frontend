// Define the interface for user events during video watching
export interface UserEvent {
  event: string;
  eventTime: Date;
  videoTime: number;
}

// Define the interface for user metadata
export interface UserMetadata {
  userAgent: string;
  ipAddress: string;
  device: string;
  browser: string;
  os: string;
  deviceType: string;
}

// DTO for creating a new watch session
export interface CreateWatchSessionDto {
  userSessionId?: string;
  isGuestWatchSession?: boolean;
  videoId: string;
  startTime: Date;
  endTime?: Date;
  actualTimeWatched: string;
  percentageWatched: number;
  userEvent?: UserEvent[];
  userMetadata?: UserMetadata;
}

// DTO for updating an existing watch session
export interface UpdateWatchSessionDto {
  userSessionId?: string;
  isGuestWatchSession?: boolean;
  videoId?: string;
  startTime?: Date;
  endTime?: Date;
  actualTimeWatched?: string;
  percentageWatched?: number;
  userEvent?: UserEvent[];
  userMetadata?: UserMetadata;
}

// Response DTO for watch session data
export interface WatchSessionResponseDto {
  id: string;
  userSessionId?: string;
  isGuestWatchSession: boolean;
  videoId: string;
  startTime: Date;
  endTime?: Date;
  actualTimeWatched: number;
  percentageWatched: number;
  userMetadata?: UserMetadata;
  userEvent?: UserEvent[];
  createdAt: Date;
  updatedAt: Date;
  isDeleted: boolean;
}
