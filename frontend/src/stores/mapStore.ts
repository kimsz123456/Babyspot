import {OnCompleteParams} from '@actbase/react-daum-postcode/lib/types';
import {create} from 'zustand';

interface MapState {
  selectedAddress: OnCompleteParams | null;
  setSelectedAddress: (address: OnCompleteParams) => void;
  clearAddress: () => void;
  resetMapState: () => void;
}

const initialState = {
  selectedAddress: null,
};
export const useMapStore = create<MapState>(set => ({
  ...initialState,
  resetMapState: () => set({...initialState}),
  setSelectedAddress: address => set({selectedAddress: address}),
  clearAddress: () => set({selectedAddress: null}),
}));
