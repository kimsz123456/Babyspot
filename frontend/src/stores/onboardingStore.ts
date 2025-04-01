import {create} from 'zustand';

interface OnboardingState {
  tempToken: string | null;
  setTempToken: (token: string | null) => void;

  nickname: string | null;
  setNickname: (nickname: string | null) => void;

  profileImageName: string | null;
  setProfileImageName: (profileImageName: string | null) => void;

  profileImageType: string | null;
  setProfileImageType: (profileImageType: string | null) => void;

  profileImagePath: string | null;
  setProfileImagePath: (profileImagePath: string | null) => void;

  childBirthYears: number[] | null;
  setChildBirthYears: (childBirthYears: number[] | null) => void;
}

export const useOnboardingStore = create<OnboardingState>(set => ({
  tempToken: null,
  setTempToken: token => set({tempToken: token}),

  nickname: null,
  setNickname: nickname => set({nickname: nickname}),

  profileImageName: null,
  setProfileImageName: profileImageName =>
    set({profileImageName: profileImageName}),

  profileImageType: null,
  setProfileImageType: profileImageType =>
    set({profileImageType: profileImageType}),

  profileImagePath: null,
  setProfileImagePath: profileImagePath =>
    set({profileImagePath: profileImagePath}),

  childBirthYears: null,
  setChildBirthYears: childBirthYears =>
    set({childBirthYears: childBirthYears}),
}));
