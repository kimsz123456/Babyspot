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

export interface SignUpRequest {
  nickname: string;
  profileImgUrl: string;
  birthYears: number[];
}

export interface SignUpResponse {
  message: string;
  accessToken: string;
  refreshToken: string;
}

export const kakaoLogin = async (
  kakaoAccessToken: string,
): Promise<KakaoLoginResponse> => {
  try {
    const result = await api.post('/auth/kakao', {kakaoAccessToken});

    return result.data;
  } catch (error) {
    throw error;
  }
};

export const getTokenByRefreshToken =
  async (): Promise<GetTokenByRefreshTokenResponse> => {
    try {
      const result = await api.post('/auth/refresh-token');

      return result.data;
    } catch (error) {
      throw error;
    }
  };

export const signUp = async ({
  params,
  tempToken,
}: {
  params: SignUpRequest;
  tempToken: string;
}): Promise<SignUpResponse> => {
  try {
    const result = await api.post('/members/signup', params, {
      headers: {
        'X-Temp-Token': tempToken,
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
    });

    console.log(result);
    return result.data;
  } catch (error) {
    throw error;
  }
};
