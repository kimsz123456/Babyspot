import {create} from 'zustand';

interface ProfileState {
  resetProfileState: () => void;
}

const initialState = {};

export const useProfileStore = create<ProfileState>(set => ({
  ...initialState,
  resetProfileState: () => set({...initialState}),
}));
