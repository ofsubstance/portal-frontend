import APIUrl from '@/constants/apiUrl';
import {
  UserEvent,
  UserMetadata,
  WatchSessionResponseDto,
} from '@/dtos/watchSession.dto';
import httpClient from '../utils/httpClient';
import storageService from './storage.service';

export interface VideoWatchSession {
  watchSessionId: string;
  videoId: string;
  startTime: Date;
  endTime?: Date;
  actualTimeWatched: number;
  percentageWatched: number;
  userEvent?: UserEvent[];
  userMetadata?: UserMetadata;
}

export interface WatchProgressData {
  actualTimeWatched?: number;
  percentageWatched?: number;
  endTime?: Date;
  userEvent?: UserEvent[];
  userMetadata?: UserMetadata;
}

class VideoWatchService {
  private watchSession: VideoWatchSession | null = null;
  private userEvents: UserEvent[] = [];

  constructor() {
    const storedWatchSessionId = storageService.getWatchSessionId();
    if (storedWatchSessionId) {
      console.log('Found existing watch session:', storedWatchSessionId);
    }
    const sessionId = storageService.getSessionId();
    if (sessionId) {
      console.log('Found existing session:', sessionId);
    }
  }

  async startWatchSession(videoId: string): Promise<VideoWatchSession | null> {
    try {
      storageService.removeWatchSessionId();
      console.log('Creating new watch session for video:', videoId);

      // Determine if this is a guest session
      const userSessionId = storageService.getSessionId();
      const isGuest = !storageService.getAuthData();
      const userMetadata = this.getUserMetadata();

      // Create payload
      const payload = {
        videoId,
        startTime: new Date(),
        actualTimeWatched: '0',
        percentageWatched: 0,
        isGuestWatchSession: isGuest,
        userSessionId: userSessionId || null,
        userMetadata,
      };

      // Make API request to create session
      const response = await httpClient.post<WatchSessionResponseDto>(
        APIUrl.watchSessions.create(),
        payload
      );
      const data = response.data;

      // Store the session
      this.watchSession = {
        watchSessionId: data.id,
        videoId: data.videoId,
        startTime: new Date(data.startTime),
        actualTimeWatched: data.actualTimeWatched,
        percentageWatched: data.percentageWatched,
        userEvent: data.userEvent,
        userMetadata: data.userMetadata,
      };
      this.userEvents = [];

      // Store session ID in localStorage for persistence
      storageService.setWatchSessionId(data.id);
      console.log('Watch session created:', data);

      return this.watchSession;
    } catch (error) {
      console.error('Failed to create watch session:', error);
      return null;
    }
  }

  async updateWatchSession(
    watchProgressData: WatchProgressData
  ): Promise<void> {
    const watchSessionId = storageService.getWatchSessionId();
    if (!watchSessionId) {
      console.warn('Cannot update: No active watch session');
      return;
    }

    try {
      if (watchProgressData.userEvent) {
        this.userEvents.push(...watchProgressData.userEvent);
      }
      // Make API request to update session
      const response = await httpClient.patch<WatchSessionResponseDto>(
        APIUrl.watchSessions.update(watchSessionId),
        watchProgressData
      );
      const data = response.data;

      // Update local session data
      this.watchSession = {
        watchSessionId: data.id,
        videoId: data.videoId,
        startTime: new Date(data.startTime),
        actualTimeWatched: data.actualTimeWatched,
        percentageWatched: parseFloat(data.percentageWatched.toFixed(2)),
        userEvent: data.userEvent,
        userMetadata: data.userMetadata,
      };

      console.log('Watch session updated:', data);
    } catch (error) {
      console.error('Failed to update watch session:', error);
    }
  }

  /**
   * Complete the watch session
   * @param position The final playback position
   * @param completed Whether the user completed watching the video
   */
  async completeWatchSession(): Promise<void> {
    const watchSessionId = storageService.getWatchSessionId();
    if (!watchSessionId) {
      console.warn('Cannot complete: No active watch session');
      return;
    }

    try {
      const response = await httpClient.patch<WatchSessionResponseDto>(
        APIUrl.watchSessions.update(watchSessionId),
        { endTime: new Date() }
      );
      const data = response.data;

      // Update local session data
      this.watchSession = {
        watchSessionId: data.id,
        videoId: data.videoId,
        startTime: new Date(data.startTime),
        endTime: data.endTime ? new Date(data.endTime) : undefined,
        actualTimeWatched: data.actualTimeWatched,
        percentageWatched: data.percentageWatched,
        userEvent: data.userEvent,
        userMetadata: data.userMetadata,
      };

      console.log('Watch session completed:', data);
    } catch (error) {
      console.error('Failed to complete watch session:', error);
    }
  }

  /**
   * Get browser and device metadata
   */
  private getUserMetadata(): UserMetadata {
    const userAgent = navigator.userAgent;

    // Basic device detection - this could be improved with a dedicated library
    const isMobile = /Mobile|Android|iPhone|iPad|iPod/i.test(userAgent);
    const isTablet = /Tablet|iPad/i.test(userAgent);
    const deviceType = isTablet ? 'tablet' : isMobile ? 'mobile' : 'desktop';

    // Very basic browser detection
    let browser = 'unknown';
    if (userAgent.indexOf('Chrome') > -1) browser = 'Chrome';
    else if (userAgent.indexOf('Safari') > -1) browser = 'Safari';
    else if (userAgent.indexOf('Firefox') > -1) browser = 'Firefox';
    else if (
      userAgent.indexOf('MSIE') > -1 ||
      userAgent.indexOf('Trident') > -1
    )
      browser = 'IE';
    else if (userAgent.indexOf('Edge') > -1) browser = 'Edge';

    // Basic OS detection
    let os = 'unknown';
    if (userAgent.indexOf('Windows') > -1) os = 'Windows';
    else if (userAgent.indexOf('Mac') > -1) os = 'MacOS';
    else if (userAgent.indexOf('Linux') > -1) os = 'Linux';
    else if (userAgent.indexOf('Android') > -1) os = 'Android';
    else if (userAgent.indexOf('iOS') > -1) os = 'iOS';

    return {
      userAgent,
      ipAddress: '', // This would be determined server-side
      device: isMobile ? 'mobile' : 'desktop',
      browser,
      os,
      deviceType,
    };
  }
}

export default new VideoWatchService();
