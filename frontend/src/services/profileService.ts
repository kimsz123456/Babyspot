import {api} from './api';

export interface MemberProfileType {
  id: number;
  nickname: string;
  profile_img: string;
  providerId: string;
  message: string;
  babyBirthYears: number[];
}

export interface UpdateProfileRequestType {
  nickname: string;
  profileImgUrl: string;
  contentType: string;
  babyAges: number[];
}

export interface UpdateProfileResponseType {
  nickname: string;
  preSignedUrl: string;
  profileImgUrl: string;
}

export const getMemberProfile = async (): Promise<MemberProfileType> => {
  try {
    const result = await api.get('/members/me');
    return result.data;
  } catch (error) {
    throw error;
  }
};

export const patchMemberProfile = async (
  data: UpdateProfileRequestType,
): Promise<UpdateProfileResponseType> => {
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
