import {create} from 'zustand';

interface GlobalState {
  accessToken: string | null;
  setAccessToken: (token: string | null) => void;
}

export const useGlobalStore = create<GlobalState>(set => ({
  accessToken: null,
  setAccessToken: token => set({accessToken: token}),
}));
