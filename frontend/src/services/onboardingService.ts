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

export interface PostImgPresignedUrlRequest {
  profileName: string;
  contentType: string;
}

export interface PostImgPresignedUrlResponse {
  profileImgPreSignedUrl: string;
  profileKey: string;
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

export const postSignUp = async ({
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

    return result.data;
  } catch (error) {
    throw error;
  }
};

export const postImgPresignedUrl = async ({
  contentType,
  profileName,
}: PostImgPresignedUrlRequest): Promise<PostImgPresignedUrlResponse> => {
  try {
    const result = await api.post(
      `/members/signup/imgpresigned-url?profileName=${profileName}&contentType=${contentType}`,
    );

    return result.data;
  } catch (error) {
    throw error;
  }
};

export const getCheckNickname = async ({
  nickname,
  tempToken,
}: {
  nickname: string;
  tempToken: string;
}) => {
  try {
    const result = await api.get(
      `members/signup/checknickname?nickname=${nickname}`,
      {
        headers: {
          'X-Temp-Token': tempToken,
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
      },
    );

    return result.data;
  } catch (error) {}
};
