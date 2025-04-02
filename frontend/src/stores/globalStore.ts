import {create} from 'zustand';
import {MemberProfile} from '../services/profileService';

interface GlobalState {
  accessToken: string | null;
  isLoggedIn: boolean;
  memberProfile: MemberProfile | null;
  setAccessToken: (token: string | null) => void;
  setIsLoggedIn: (loggedIn: boolean) => void;
  setMemberProfile: (profile: MemberProfile | null) => void;
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
