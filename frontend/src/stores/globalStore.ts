import {create} from 'zustand';

interface GlobalState {
  accessToken: string | null;
  isLoggedIn: boolean;
  setAccessToken: (token: string | null) => void;
  setIsLoggedIn: (loggedIn: boolean) => void;
}

export const useGlobalStore = create<GlobalState>(set => ({
  accessToken: null,
  isLoggedIn: false,
  setAccessToken: token => set({accessToken: token}),
  setIsLoggedIn: loggedIn => set({isLoggedIn: loggedIn}),
}));
