import axios, { AxiosError } from 'axios';

import APIUrl from '../constants/apiUrl';
import authService from '../services/auth.service';
import storageService from '../services/storage.service';

const httpClient = axios.create({
  baseURL: APIUrl.base + '/api',
  withCredentials: true,
});

// Add request interceptor to include user ID in headers when authenticated
httpClient.interceptors.request.use(
  (config) => {
    const currentUser = storageService.getCurrentUser();

    // If user is authenticated, add user ID to headers
    if (currentUser && currentUser.id) {
      config.headers['X-User-ID'] = currentUser.id;
    }

    // Add session ID if available (for both authenticated and guest users)
    const sessionId = storageService.getSessionId();
    if (sessionId) {
      config.headers['X-Session-ID'] = sessionId;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

const refreshTokenInterceptor = async (err: AxiosError) => {
  const originalConfig = err.config;

  if (
    err.response?.status === 401 &&
    !originalConfig?.headers['skip-interceptor'] &&
    !originalConfig?.url?.includes('/auth/')
  ) {
    try {
      originalConfig!.headers['skip-interceptor'] = true;

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
