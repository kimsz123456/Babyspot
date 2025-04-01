import {api} from './api';

export interface MemberProfile {
  id: number;
  nickname: string;
  profile_img: string;
  providerId: string;
  message: string;
  babyBirthYears: number[];
}

export const getMemberProfile = async (): Promise<MemberProfile> => {
  try {
    const result = await api.get('/members/me');
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
