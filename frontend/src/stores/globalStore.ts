import {create} from 'zustand';
import {MemberProfileType} from '../services/profileService';

interface GlobalState {
  accessToken: string | null;
  isLoggedIn: boolean;
  memberProfile: MemberProfileType | null;
  setAccessToken: (token: string | null) => void;
  setIsLoggedIn: (loggedIn: boolean) => void;
  setMemberProfile: (profile: MemberProfileType | null) => void;
  resetGlobalState: () => void;
}

const initialState = {
  accessToken: null,
  isLoggedIn: false,
  memberProfile: null,
};

export const useGlobalStore = create<GlobalState>(set => ({
  ...initialState,
  resetGlobalState: () => set({...initialState}),
  setAccessToken: token => set({accessToken: token}),
  setIsLoggedIn: loggedIn => set({isLoggedIn: loggedIn}),
  setMemberProfile: profile => set({memberProfile: profile}),
}));
