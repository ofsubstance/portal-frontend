import axios, { AxiosError } from "axios";

import APIUrl from "../constants/apiUrl";
import authService from "../services/auth.service";

const httpClient = axios.create({
  baseURL: APIUrl.base + "/api",
  withCredentials: true,
});

const refreshTokenInterceptor = async (err: AxiosError) => {
  const originalConfig = err.config;

  if (
    err.response?.status === 401 &&
    !originalConfig?.headers["skip-interceptor"] &&
    !originalConfig?.url?.includes("/auth/")
  ) {
    try {
      originalConfig!.headers["skip-interceptor"] = true;

      await authService.refreshAccessToken();

      return httpClient(originalConfig!);
    } catch (error) {
      return Promise.reject(error);
    }
  }
  return Promise.reject(err);
};

httpClient.interceptors.response.use((res) => res, refreshTokenInterceptor);

export default httpClient;
