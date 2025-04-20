import APIUrl from '@/constants/apiUrl';
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

  removeSessionId(): void {
    storageService.removeSessionId();
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
   * Call this when a user visits a video details page or clicks the watch button
   * @returns Promise resolving to the API response or null if no session exists
   */
  async trackContentEngagement(): Promise<any | null> {
    const sessionId = this.getSessionId();

    // Only proceed if we have a session ID (authenticated users only)
    if (!sessionId) {
      console.warn('Cannot track content engagement: No active session');
      return null;
    }

    try {
      console.log(`Tracking content engagement for session: ${sessionId}`);
      const response = await httpClient.patch(
        APIUrl.sessions.contentEngaged(sessionId),
        { engaged: true }
      );
      console.log('Content engagement tracked successfully');
      return response.data;
    } catch (error) {
      console.error('Failed to track content engagement:', error);
      return null;
    }
  }

  startHeartbeat(): void {
    if (this.heartbeatInterval) {
      console.log('Stopping existing heartbeat before starting a new one');
      this.stopHeartbeat();
    }

    console.log('Starting heartbeat with 3-minute interval');
    this.heartbeatInterval = window.setInterval(async () => {
      try {
        const sessionId = this.getSessionId();

        if (!sessionId) {
          console.error('No session ID found during heartbeat');
          this.stopHeartbeat();
          return;
        }

        console.log(`Sending heartbeat for session ${sessionId}`);
        const response = await this.heartbeat();

        if (response.status === 'renewed' && response.sessionId) {
          console.log(`Session renewed with new ID: ${response.sessionId}`);
          this.setSessionId(response.sessionId);
        } else if (response.status === 'active') {
          console.log('Session is active, continuing heartbeats');
        } else if (response.status === 'expired' && response.needsNewSession) {
          console.log('Session expired, cleaning up');
          this.stopHeartbeat();
          console.log('Session expired, signing out');
          await authService.signout();
        }
      } catch (error) {
        console.error('Error during heartbeat:', error);
      }
    }, 180000); // 3 minutes (180,000 ms)
  }

  stopHeartbeat(): void {
    if (this.heartbeatInterval) {
      console.log('Stopping heartbeat interval');
      clearInterval(this.heartbeatInterval);
      this.heartbeatInterval = undefined;
    }
  }

  /**
   * Ensures the session ID is properly saved in localStorage.
   * Used to periodically check and repair localStorage if needed.
   * @returns The current session ID
   */
  ensureSessionPersistence(): string | null {
    const sessionId = this.getSessionId();

    if (sessionId) {
      // Re-save the session ID to ensure it's properly stored in localStorage
      console.log('Re-saving session ID to ensure persistence:', sessionId);
      this.setSessionId(sessionId);
      return sessionId;
    }

    return null;
  }
}

export default new SessionService();
