import {create} from 'zustand';

interface OnboardingState {
  tempToken: string | null;
  setTempToken: (token: string | null) => void;
}

export const useOnboardingStore = create<OnboardingState>(set => ({
  tempToken: null,
  setTempToken: token => set({tempToken: token}),
}));
