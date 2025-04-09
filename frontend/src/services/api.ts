import axios, {AxiosError} from 'axios';
import EncryptedStorage from 'react-native-encrypted-storage';
import Config from 'react-native-config';
import {getTokenByRefreshToken} from './onboardingService';
import {useGlobalStore} from '../stores/globalStore';

const baseURL = __DEV__ ? Config.BASE_URL_DEBUG : Config.BASE_URL_RELEASE;

export const api = axios.create({
  baseURL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.request.use(
  async request => {
    // 개발모드 시 api 호출을 보기 위한 로그
    __DEV__ && console.log('api:' + request.url + ' 호출');

    const isRefreshTokenRequest = request.url?.includes('auth/refresh-token');

    // refresh-token api의 경우 헤더가 다름. X-Refresh-Token에 refresh token을 넣고 api 호출
    if (isRefreshTokenRequest) {
      const refreshToken = await EncryptedStorage.getItem('refreshToken');

      if (refreshToken) {
        request.headers['X-Refresh-Token'] = refreshToken;
      }
    } else {
      const accessToken = useGlobalStore.getState().accessToken;

      if (accessToken) {
        request.headers.Authorization = `Bearer ${accessToken}`;
      }
    }

    return request;
  },
  (error: AxiosError) => {
    return Promise.reject(error);
  },
);

api.interceptors.response.use(
  response => {
    return response;
  },

  async (error: AxiosError) => {
    const originalRequest = error.config;

    if (!originalRequest) {
      return Promise.reject(error);
    }

    if (
      error.response?.status == 401 &&
      error.config?.url?.includes('/auth/refresh-token')
    ) {
      // TODO: logout
      return Promise.reject(error);
    }

    // 리프레시 토큰 재발급 및 api 재호출 로직
    if (error.response?.status == 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const savedRefreshToken = await EncryptedStorage.getItem(
          'refreshToken',
        );

        if (!savedRefreshToken) {
          throw new Error('No refresh token');
        }

        const response = await getTokenByRefreshToken();

        useGlobalStore.getState().setAccessToken(response.accessToken);
        await EncryptedStorage.setItem('refreshToken', response.refreshToken);

        originalRequest.headers.Authorization = response.accessToken;

        return api(originalRequest);
      } catch (refreshError) {
        // TODO: logout
        return Promise.reject(refreshError);
      }
    }
    return Promise.reject(error);
  },
);
