import { SigninRes } from '@/dtos/auth.dto';
import { UserDto } from '@/dtos/user.dto';

class StorageService {
  getAuthData() {
    const data = localStorage.getItem('auth') || localStorage.getItem('auth');

    if (!data) return null;

    return JSON.parse(data) as SigninRes & { remember: boolean };
  }

  setAuthData(authData: SigninRes, remember = false) {
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
}

export default new StorageService();
