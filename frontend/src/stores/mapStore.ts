import {OnCompleteParams} from '@actbase/react-daum-postcode/lib/types';
import {create} from 'zustand';

interface MapState {
  selectedAddress: OnCompleteParams | null;
  setSelectedAddress: (address: OnCompleteParams) => void;
  clearAddress: () => void;
}

export const useMapStore = create<MapState>(set => ({
  selectedAddress: null,
  setSelectedAddress: address => set({selectedAddress: address}),
  clearAddress: () => set({selectedAddress: null}),
}));
