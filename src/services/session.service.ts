import APIUrl from '@/constants/apiUrl';
import { v4 as uuidv4 } from 'uuid';
import httpClient from '../utils/httpClient';
import authService from './auth.service';
import storageService from './storage.service';

export interface HeartbeatResponse {
  status: 'renewed' | 'active' | 'expired';
  needsNewSession: boolean;
  sessionId?: string;
}

class SessionService {
  private heartbeatInterval: number | undefined;

  getSessionId(): string | null {
    return storageService.getSessionId();
  }

  setSessionId(sessionId: string): void {
    storageService.setSessionId(sessionId);
  }

  async createGuestSession(): Promise<string | null> {
    try {
      // Generate a UUID for guest session
      const sessionId = uuidv4();

      // Send request to create a guest session
      const response = await httpClient.post(
        APIUrl.sessions.createGuestSession(),
        { sessionId }
      );

      // Store the session ID
      if (response.status === 200 || response.status === 201) {
        this.setSessionId(sessionId);
        return sessionId;
      }

      return null;
    } catch (error) {
      console.error('Failed to create guest session:', error);
      return null;
    }
  }

  async heartbeat(): Promise<HeartbeatResponse> {
    const sessionId = this.getSessionId();

    if (!sessionId) {
      return {
        status: 'expired',
        needsNewSession: true,
      };
    }

    try {
      const response = await httpClient.post<HeartbeatResponse>(
        APIUrl.sessions.heartbeat(sessionId)
      );
      return response.data;
    } catch (error) {
      console.error('Session heartbeat failed:', error);
      return {
        status: 'expired',
        needsNewSession: true,
      };
    }
  }

  /**
   * Track user content engagement
   * Call this when a user visits a video details page
   * @returns Promise resolving to the API response or null if no session exists
   */
  async trackContentEngagement(): Promise<any | null> {
    const sessionId = this.getSessionId();

    if (!sessionId) {
      console.warn('Cannot track content engagement: No active session');
      return null;
    }

    try {
      const response = await httpClient.patch(
        APIUrl.sessions.contentEngaged(sessionId),
        { engaged: true }
      );
      return response.data;
    } catch (error) {
      console.error('Failed to track content engagement:', error);
      return null;
    }
  }

  startHeartbeat(): void {
    if (this.heartbeatInterval) {
      this.stopHeartbeat();
    }

    this.heartbeatInterval = window.setInterval(async () => {
      try {
        const response = await this.heartbeat();

        if (response.status === 'renewed' && response.sessionId) {
          this.setSessionId(response.sessionId);
        } else if (response.status === 'expired' && response.needsNewSession) {
          this.stopHeartbeat();
          // For guest sessions, we don't need to sign out
          const isAuthenticated = !!storageService.getAuthData();
          if (isAuthenticated) {
            await authService.signout();
          } else {
            // For guest sessions, just clear the session ID
            storageService.removeSessionId();
          }
        }
      } catch (error) {
        console.error('Error during heartbeat:', error);
      }
    }, 300000); // 5 minutes (300,000 ms)
  }

  startGuestHeartbeat(): void {
    // Create a guest session if one doesn't exist
    if (!this.getSessionId()) {
      this.createGuestSession().then((sessionId) => {
        if (sessionId) {
          this.startHeartbeat();
        }
      });
    } else {
      // If a session already exists, just start the heartbeat
      this.startHeartbeat();
    }
  }

  stopHeartbeat(): void {
    if (this.heartbeatInterval) {
      clearInterval(this.heartbeatInterval);
      this.heartbeatInterval = undefined;
    }
  }
}

export default new SessionService();
