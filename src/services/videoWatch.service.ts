import APIUrl from '@/constants/apiUrl';
import httpClient from '../utils/httpClient';
import storageService from './storage.service';

export interface VideoWatchSession {
  watchId: string;
  startTime: string;
}

export interface VideoWatchUpdatePayload {
  lastPosition: number;
  additionalMinutesWatched: number;
  completedView: boolean;
  additionalPauseCount: number;
  additionalSeekCount: number;
  action: 'play' | 'pause' | 'seek' | 'periodic' | 'complete';
  newEngagementMarkers?: Array<{
    timepoint: number;
    action: string;
    details?: string;
  }>;
}

export interface VideoWatchUpdateResponse {
  watchId: string;
  minutesWatched: number;
  percentageWatched: number;
  completedView: boolean;
}

class VideoWatchService {
  private watchSession: VideoWatchSession | null = null;
  private updateInterval: number | undefined;
  private lastPosition: number = 0;
  private pauseCount: number = 0;
  private seekCount: number = 0;
  private lastUpdateTime: number = 0;

  /**
   * Start a video watch session
   * @param videoId The ID of the video being watched
   * @returns Promise with the watch session data
   */
  async startWatchSession(videoId: string): Promise<VideoWatchSession | null> {
    try {
      const sessionId = storageService.getSessionId();
      const currentUser = storageService.getCurrentUser();
      const isAuthenticated = !!currentUser;

      if (!sessionId && !isAuthenticated) {
        console.warn('No session ID or user ID available for watch tracking');
        return null;
      }

      // Get browser and device info
      const userAgent = navigator.userAgent;
      const isMobile =
        /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
          userAgent
        );
      const deviceType = isMobile ? 'mobile' : 'desktop';
      const browserInfo = userAgent;

      const payload = {
        videoId,
        isGuestView: !isAuthenticated,
        sessionId: sessionId,
        userId: currentUser?.id,
        deviceType,
        browserInfo,
      };

      const response = await httpClient.post(
        APIUrl.videoWatches.create(),
        payload
      );

      if (response.status === 200 || response.status === 201) {
        this.watchSession = response.data.data;
        this.lastUpdateTime = Date.now();
        return this.watchSession;
      }

      return null;
    } catch (error) {
      console.error('Failed to start video watch session:', error);
      return null;
    }
  }

  /**
   * Update a watch session with the latest playback state
   * @param action The action that triggered the update
   * @param currentPosition The current playback position in seconds
   * @param completedView Whether the view is completed
   * @returns Promise with the updated watch data
   */
  async updateWatchSession(
    action: 'play' | 'pause' | 'seek' | 'periodic' | 'complete',
    currentPosition: number,
    completedView: boolean = false
  ): Promise<VideoWatchUpdateResponse | null> {
    if (!this.watchSession) {
      console.warn('No active watch session to update');
      return null;
    }

    try {
      const now = Date.now();
      const timeElapsedSeconds = (now - this.lastUpdateTime) / 1000;
      const additionalMinutesWatched =
        action === 'pause' || action === 'seek' || action === 'complete'
          ? timeElapsedSeconds / 60
          : 0;

      // Calculate additional pause and seek counts
      const additionalPauseCount = action === 'pause' ? 1 : 0;
      const additionalSeekCount = action === 'seek' ? 1 : 0;

      const payload: VideoWatchUpdatePayload = {
        lastPosition: currentPosition,
        additionalMinutesWatched,
        completedView,
        additionalPauseCount,
        additionalSeekCount,
        action,
      };

      const response = await httpClient.put(
        APIUrl.videoWatches.update(this.watchSession.watchId),
        payload
      );

      if (response.status === 200) {
        this.lastPosition = currentPosition;
        this.pauseCount += additionalPauseCount;
        this.seekCount += additionalSeekCount;
        this.lastUpdateTime = now;
        return response.data.data;
      }

      return null;
    } catch (error) {
      console.error('Failed to update video watch session:', error);
      return null;
    }
  }

  /**
   * Start periodic updates for the watch session
   * @param getPosition Function that returns the current playback position
   */
  startPeriodicUpdates(getPosition: () => number): void {
    if (this.updateInterval) {
      this.stopPeriodicUpdates();
    }

    this.updateInterval = window.setInterval(() => {
      const currentPosition = getPosition();
      this.updateWatchSession('periodic', currentPosition);
    }, 10000); // Update every 10 seconds
  }

  /**
   * Stop periodic updates
   */
  stopPeriodicUpdates(): void {
    if (this.updateInterval) {
      clearInterval(this.updateInterval);
      this.updateInterval = undefined;
    }
  }

  /**
   * Handle a user interaction with the video player
   * @param action The action performed (play, pause, seek)
   * @param position The current playback position
   */
  handleUserAction(action: 'play' | 'pause' | 'seek', position: number): void {
    this.updateWatchSession(action, position);
  }

  /**
   * Complete the watch session when the user finishes or leaves the video
   * @param position The final playback position
   * @param completed Whether the user completed watching the video
   */
  completeWatchSession(position: number, completed: boolean): void {
    this.stopPeriodicUpdates();
    this.updateWatchSession('complete', position, completed);
    this.watchSession = null;
  }

  /**
   * Get the current watch session
   */
  getWatchSession(): VideoWatchSession | null {
    return this.watchSession;
  }
}

export default new VideoWatchService();
