import APIUrl from '@/constants/apiUrl';
import httpClient from '../utils/httpClient';
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
      return { status: 'expired', needsNewSession: true };
    }

    try {
      const response = await httpClient.post<HeartbeatResponse>(
        APIUrl.sessions.heartbeat(sessionId)
      );
      return response.data;
    } catch {
      return { status: 'expired', needsNewSession: true };
    }
  }

  async trackContentEngagement(): Promise<any | null> {
    const sessionId = this.getSessionId();

    if (!sessionId) {
      return null;
    }

    try {
      const response = await httpClient.patch(
        APIUrl.sessions.contentEngaged(sessionId),
        { engaged: true }
      );

      const currentUser = storageService.getCurrentUser();
      if (currentUser && currentUser.first_content_engagement === null) {
        try {
          const updateResponse = await httpClient.patch(
            APIUrl.user.updateContentEngagement(currentUser.id)
          );
          if (updateResponse.data.success) {
            currentUser.first_content_engagement = new Date().toISOString();
            storageService.setCurrentUser(currentUser);
          }
        } catch {
          // Non-critical: best-effort update of first engagement timestamp
        }
      }

      return response.data;
    } catch {
      return null;
    }
  }

  startHeartbeat(): void {
    if (this.heartbeatInterval) {
      this.stopHeartbeat();
    }

    this.heartbeatInterval = window.setInterval(async () => {
      const sessionId = this.getSessionId();

      if (!sessionId) {
        this.stopHeartbeat();
        return;
      }

      const response = await this.heartbeat();

      if (response.status === 'renewed' && response.sessionId) {
        this.setSessionId(response.sessionId);
      } else if (response.status === 'expired') {
        this.stopHeartbeat();
      }
    }, 180000); // 3 minutes
  }

  stopHeartbeat(): void {
    if (this.heartbeatInterval) {
      clearInterval(this.heartbeatInterval);
      this.heartbeatInterval = undefined;
    }
  }
}

export default new SessionService();
