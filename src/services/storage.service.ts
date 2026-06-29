import { SigninRes } from '@/dtos/auth.dto';
import { UserDto } from '@/dtos/user.dto';

class StorageService {
  private readonly AUTH_KEY = 'auth';
  private readonly SESSION_ID_KEY = 'sessionId';
  private readonly WATCH_SESSION_ID_KEY = 'watchSessionId';

  getAuthData() {
    const data =
      localStorage.getItem(this.AUTH_KEY) ||
      sessionStorage.getItem(this.AUTH_KEY);

    if (!data) return null;

    return JSON.parse(data) as Omit<SigninRes, 'accessToken' | 'refreshToken'> & {
      remember: boolean;
    };
  }

  setAuthData(authData: SigninRes, remember = false) {
    const { accessToken, refreshToken, ...authDataWithoutTokens } = authData;
    const payload = JSON.stringify({ ...authDataWithoutTokens, remember });

    if (remember) {
      localStorage.setItem(this.AUTH_KEY, payload);
    } else {
      sessionStorage.setItem(this.AUTH_KEY, payload);
    }

    if (authData.sessionId) {
      this.setSessionId(authData.sessionId);
    }
  }

  removeAuthData() {
    localStorage.removeItem(this.AUTH_KEY);
    sessionStorage.removeItem(this.AUTH_KEY);
    localStorage.removeItem(this.SESSION_ID_KEY);
    sessionStorage.removeItem(this.SESSION_ID_KEY);
  }

  setCurrentUser(user: UserDto) {
    const authData = this.getAuthData();
    if (!authData) return;

    const updated = JSON.stringify({ ...authData, user });

    if (authData.remember) {
      localStorage.setItem(this.AUTH_KEY, updated);
    } else {
      sessionStorage.setItem(this.AUTH_KEY, updated);
    }
  }

  getCurrentUser() {
    return this.getAuthData()?.user;
  }

  getSessionId() {
    return (
      localStorage.getItem(this.SESSION_ID_KEY) ||
      sessionStorage.getItem(this.SESSION_ID_KEY)
    );
  }

  setSessionId(sessionId: string) {
    const authData = this.getAuthData();
    if (authData?.remember) {
      localStorage.setItem(this.SESSION_ID_KEY, sessionId);
    } else {
      sessionStorage.setItem(this.SESSION_ID_KEY, sessionId);
    }
  }

  removeSessionId() {
    localStorage.removeItem(this.SESSION_ID_KEY);
    sessionStorage.removeItem(this.SESSION_ID_KEY);
  }

  getWatchSessionId() {
    return sessionStorage.getItem(this.WATCH_SESSION_ID_KEY);
  }

  setWatchSessionId(watchSessionId: string) {
    sessionStorage.setItem(this.WATCH_SESSION_ID_KEY, watchSessionId);
  }

  removeWatchSessionId() {
    sessionStorage.removeItem(this.WATCH_SESSION_ID_KEY);
  }
}

export default new StorageService();
