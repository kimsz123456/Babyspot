import {create} from 'zustand';
import {GetGeocodingByKeywordResponse} from '../services/mapService';
import {INITIAL_MAP_CENTER_COORDINATE} from '../constants/constants';

export interface Coordinate {
  latitude: number;
  longitude: number;
}

interface MapState {
  selectedPlace: GetGeocodingByKeywordResponse | null;
  setSelectedPlace: (selectedPlace: GetGeocodingByKeywordResponse) => void;

  selectedAges: number[];
  setSelectedAges: (ages: number[]) => void;

  selectedChips: string[];
  setSelectedChips: (chips: string[]) => void;

  centerCoordinate: Coordinate;
  setCenterCoordinate: (centerCoordinate: Coordinate) => void;

  clearSelectedPlace: () => void;
  resetMapState: () => void;
}

const initialState = {
  selectedPlace: null,
  selectedAges: [],
  selectedChips: [],
  centerCoordinate: INITIAL_MAP_CENTER_COORDINATE,
};

export const useMapStore = create<MapState>(set => ({
  ...initialState,
  setSelectedPlace: selectedPlace => set({selectedPlace: selectedPlace}),

  setSelectedAges: ages => set({selectedAges: ages}),

  setSelectedChips: chips => set({selectedChips: chips}),

  setCenterCoordinate: centerCoordinate =>
    set({centerCoordinate: centerCoordinate}),

  clearSelectedPlace: () => set({selectedPlace: null}),
  resetMapState: () => set({...initialState}),
}));
