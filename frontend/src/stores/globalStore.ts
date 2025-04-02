import {create} from 'zustand';

interface GlobalState {
  accessToken: string | null;
  isLoggedIn: boolean;
  setAccessToken: (token: string | null) => void;
  setIsLoggedIn: (loggedIn: boolean) => void;
  resetGlobalState: () => void;
}

const initialState = {
  accessToken: null,
  isLoggedIn: false,
};

export const useGlobalStore = create<GlobalState>(set => ({
  ...initialState,
  resetGlobalState: () => set({...initialState}),
  setAccessToken: token => set({accessToken: token}),
  setIsLoggedIn: loggedIn => set({isLoggedIn: loggedIn}),
}));
