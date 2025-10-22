import {
  ForgotPasswordReq,
  ResetPasswordReq,
  SigninReq,
  SigninRes,
  SignupReq,
} from '@/dtos/auth.dto';

import { IResponse } from '@/dtos/response.dto';
import axios from 'axios';
import APIUrl from '../constants/apiUrl';
import httpClient from '../utils/httpClient';
import storageService from './storage.service';

class AuthService {
  async signin(data: SigninReq) {
    try {
      data.email = data.email.trim();

      const res = await httpClient.post<IResponse<SigninRes>>(
        APIUrl.auth.signin(),
        data
      );

      storageService.setAuthData(res.data.body, data.remember);

      return res.data;
    } catch (error: any) {
      // Re-throw with more specific error handling
      if (error.response?.data?.message) {
        throw new Error(error.response.data.message);
      }
      throw error;
    }
  }

  async signup(data: SignupReq) {
    try {
      data.email = data.email.trim();

      const res = await httpClient.post<IResponse<SigninRes>>(
        APIUrl.auth.signup(),
        data
      );

      storageService.setAuthData(res.data.body);

      return res.data;
    } catch (error: any) {
      // Re-throw with more specific error handling
      if (error.response?.data?.message) {
        throw new Error(error.response.data.message);
      }
      throw error;
    }
  }

  async resendVerification(data: { email: string }) {
    try {
      data.email = data.email.trim();

      const res = await httpClient.post<IResponse<any>>(
        APIUrl.auth.resendVerification(),
        data
      );

      storageService.setAuthData(res.data.body);

      return res.data;
    } catch (error: any) {
      if (error.response?.data?.message) {
        throw new Error(error.response.data.message);
      }
      throw error;
    }
  }

  async verifyEmail(token: string) {
    const res = await httpClient.get(APIUrl.auth.verifyEmail(token));

    return res.data.body;
  }

  async signout() {
    await httpClient.post(APIUrl.auth.signout());
    storageService.removeAuthData();
    document.dispatchEvent(new Event('logout'));
  }

  async googleSignin(google_access_token: string) {
    const googleRes = await axios.get(APIUrl.auth.googleApiSignin(), {
      headers: {
        Authorization: `Bearer ${google_access_token}`,
      },
    });

    const res = await httpClient.post<IResponse<SigninRes>>(
      APIUrl.auth.googleSignin(),
      {
        email: googleRes.data.email,
        name: googleRes.data.name,
      }
    );

    storageService.setAuthData(res.data.body, true);

    return res.data;
  }

  async forgotPassword(data: ForgotPasswordReq) {
    try {
      await httpClient.post(APIUrl.auth.forgotPassword(), data);
    } catch (error: any) {
      if (error.response?.data?.message) {
        throw new Error(error.response.data.message);
      }
      throw error;
    }
  }

  async resetPassword(resetToken: string, data: ResetPasswordReq) {
    try {
      await httpClient.put(APIUrl.auth.resetPassword(resetToken), data);
    } catch (error: any) {
      if (error.response?.data?.message) {
        throw new Error(error.response.data.message);
      }
      throw error;
    }
  }

  async refreshAccessToken() {
    const refreshToken = storageService.getLocalRefreshToken();

    if (!refreshToken) return await this.signout();

    try {
      await httpClient.post(APIUrl.auth.refreshToken(), {
        refreshToken,
      });
    } catch (error: any) {
      storageService.removeAuthData();
      document.dispatchEvent(new Event('logout'));

      if (error.response?.status === 401 && error.response.data) {
        error.response.data.message =
          'Your session has expired. Please login again.';
      }

      throw error;
    }
  }
}

export default new AuthService();
