import {api} from './api';

export interface MemberProfile {
  id: number;
  nickname: string;
  profile_img: string;
  providerId: string;
  message: string;
  babyBirthYears: number[];
}

export interface UpdateProfileRequest {
  nickname: string;
  profileImgUrl: string;
  contentType: string;
  babyAges: number[];
}

export interface UpdateProfileResponse {
  nickname: string;
  preSignedUrl: string;
  profileImgUrl: string;
}

export const getMemberProfile = async (): Promise<MemberProfile> => {
  try {
    const result = await api.get('/members/me');
    return result.data;
  } catch (error) {
    throw error;
  }
};

export const updateMemberProfile = async (
  data: UpdateProfileRequest,
): Promise<UpdateProfileResponse> => {
  try {
    const result = await api.patch('/members/update', data);
    return result.data;
  } catch (error) {
    throw error;
  }
};

export const deleteMember = async () => {
  try {
    const result = await api.delete('members/delete');
    return result.data;
  } catch (error) {
    throw error;
  }
};
