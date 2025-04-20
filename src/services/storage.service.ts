import { SigninRes } from '@/dtos/auth.dto';
import { UserDto } from '@/dtos/user.dto';

class StorageService {
  getAuthData() {
    const data = localStorage.getItem('auth') || localStorage.getItem('auth');

    if (!data) return null;

    return JSON.parse(data) as SigninRes & { remember: boolean };
  }

  setAuthData(authData: SigninRes, remember = false) {
    // Store sessionId in localStorage if it exists
    if (authData.sessionId) {
      localStorage.setItem('sessionId', authData.sessionId);
    }

    if (!remember)
      return localStorage.setItem(
        'auth',
        JSON.stringify({ ...authData, remember })
      );

    return localStorage.setItem(
      'auth',
      JSON.stringify({ ...authData, remember })
    );
  }

  getLocalRefreshToken() {
    const authData = this.getAuthData();
    return authData?.refreshToken;
  }

  removeAuthData() {
    localStorage.removeItem('auth');
    localStorage.removeItem('auth');
    localStorage.removeItem('sessionId');
  }

  setCurrentUser(user: UserDto) {
    const authData = this.getAuthData();

    if (authData?.remember)
      return localStorage.setItem(
        'auth',
        JSON.stringify({ ...authData, user })
      );

    return localStorage.setItem('auth', JSON.stringify({ ...authData, user }));
  }

  getCurrentUser() {
    const authData = this.getAuthData();
    return authData?.user;
  }

  // Session ID methods - now only used for authenticated users
  getSessionId() {
    return localStorage.getItem('sessionId');
  }

  setSessionId(sessionId: string) {
    localStorage.setItem('sessionId', sessionId);
  }

  removeSessionId() {
    localStorage.removeItem('sessionId');
  }

  getWatchSessionId() {
    return localStorage.getItem('watchSessionId');
  }

  setWatchSessionId(watchSessionId: string) {
    localStorage.setItem('watchSessionId', watchSessionId);
  }

  removeWatchSessionId() {
    localStorage.removeItem('watchSessionId');
  }
}

export default new StorageService();
