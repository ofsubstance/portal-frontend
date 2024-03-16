import {
  ForgotPasswordReq,
  ResetPasswordReq,
  SigninReq,
  SigninRes,
  SignupReq,
} from "@/dtos/auth.dto";

import APIUrl from "../constants/apiUrl";
import { IResponse } from "@/dtos/response.dto";
import httpClient from "../utils/httpClient";
import storageService from "./storage.service";

class AuthService {
  async signin(data: SigninReq) {
    data.email = data.email.trim();

    const res = await httpClient.post<IResponse<SigninRes>>(
      APIUrl.auth.signin(),
      data
    );

    storageService.setAuthData(res.data.body, data.remember);

    return res.data;
  }

  async signup(data: SignupReq) {
    data.email = data.email.trim();
    data.name = data.name.trim();

    const res = await httpClient.post<IResponse<SigninRes>>(
      APIUrl.auth.signup(),
      data
    );

    storageService.setAuthData(res.data.body);

    return res.data;
  }

  async signout() {
    await httpClient.post(APIUrl.auth.signout());
    storageService.removeAuthData();
  }

  async forgotPassword(data: ForgotPasswordReq) {
    await httpClient.post(APIUrl.auth.forgotPassword(), data);
  }

  async resetPassword(resetToken: string, data: ResetPasswordReq) {
    await httpClient.put(APIUrl.auth.resetPassword(resetToken), data);
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
      document.dispatchEvent(new Event("logout"));

      if (error.response?.status === 401 && error.response.data) {
        error.response.data.message =
          "Your session has expired. Please login again.";
      }

      throw error;
    }
  }
}

export default new AuthService();
