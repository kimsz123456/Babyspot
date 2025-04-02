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

  resetOnboardingStore: () => void;
}

const initialState = {
  tempToken: null,
  nickname: null,
  profileImageName: null,
  profileImageType: null,
  profileImagePath: null,
  childBirthYears: null,
};

export const useOnboardingStore = create<OnboardingState>(set => ({
  ...initialState,
  resetOnboardingStore: () => set({...initialState}),
  setTempToken: token => set({tempToken: token}),
  setNickname: nickname => set({nickname: nickname}),
  setProfileImageName: profileImageName =>
    set({profileImageName: profileImageName}),
  setProfileImageType: profileImageType =>
    set({profileImageType: profileImageType}),
  setProfileImagePath: profileImagePath =>
    set({profileImagePath: profileImagePath}),
  setChildBirthYears: childBirthYears =>
    set({childBirthYears: childBirthYears}),
}));
