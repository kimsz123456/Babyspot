import {api} from './api';

export interface KakaoLoginResponse {
  access_token: string;
  refresh_token: string;
  message: string;
  temp_token: string;
}

export interface GetTokenByRefreshTokenResponse {
  message: string;
  accessToken: string;
  refreshToken: string;
}

export const kakaoLogin = async (
  kakaoAccessToken: string,
): Promise<KakaoLoginResponse> => {
  const result = await api.post('/auth/kakao', {kakaoAccessToken});
  return result.data;
};

export const getTokenByRefreshToken =
  async (): Promise<GetTokenByRefreshTokenResponse> => {
    const result = await api.post('/auth/refresh-token');

    return result.data;
  };
