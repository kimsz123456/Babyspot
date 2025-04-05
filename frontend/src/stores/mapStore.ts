import {create} from 'zustand';
import {GetGeocodingByKeywordResponse} from '../services/mapService';

interface MapState {
  selectedPlace: GetGeocodingByKeywordResponse | null;
  setSelectedPlace: (selectedPlace: GetGeocodingByKeywordResponse) => void;

  selectedAges: number[];
  setSelectedAges: (ages: number[]) => void;

  selectedChips: string[];
  setSelectedChips: (chips: string[]) => void;

  clearSelectedPlace: () => void;
  resetMapState: () => void;
}

const initialState = {
  selectedPlace: null,
  selectedAges: [],
  selectedChips: [],
};

export const useMapStore = create<MapState>(set => ({
  ...initialState,
  setSelectedPlace: selectedPlace => set({selectedPlace: selectedPlace}),

  setSelectedAges: ages => set({selectedAges: ages}),

  setSelectedChips: chips => set({selectedChips: chips}),

  clearSelectedPlace: () => set({selectedPlace: null}),
  resetMapState: () => set({...initialState}),
}));
