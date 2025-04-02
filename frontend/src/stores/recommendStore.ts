import {create} from 'zustand';

interface RecommendState {
  resetRecommendState: () => void;
}

const initialState = {};

export const useRecommendStore = create<RecommendState>(set => ({
  ...initialState,
  resetRecommendState: () => set({...initialState}),
}));
