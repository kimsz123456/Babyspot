import {OnCompleteParams} from '@actbase/react-daum-postcode/lib/types';
import {create} from 'zustand';

interface MapState {
  selectedAddress: OnCompleteParams | null;
  setSelectedAddress: (address: OnCompleteParams) => void;

  selectedAges: number[];
  setSelectedAges: (ages: number[]) => void;

  selectedChips: string[];
  setSelectedChips: (chips: string[]) => void;

  clearAddress: () => void;
  resetMapState: () => void;
}

const initialState = {
  selectedAddress: null,
};

export const useMapStore = create<MapState>(set => ({
  ...initialState,
  setSelectedAddress: address => set({selectedAddress: address}),

  selectedAges: [],
  setSelectedAges: ages => set({selectedAges: ages}),

  selectedChips: [],
  setSelectedChips: chips => set({selectedChips: chips}),

  clearAddress: () => set({selectedAddress: null}),
  resetMapState: () => set({...initialState}),
}));
