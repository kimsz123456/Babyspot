import {create} from 'zustand';

import {
  ConvenienceType,
  StoreBasicInformationType,
} from '../screens/Map/NearStoreListScreen/components/StoreBasicInformation/types';
import {
  GetGeocodingByKeywordResponse,
  getRangeInfo,
} from '../services/mapService';

import calculateMapRegion from '../utils/calculateMapRegion';
import {INITIAL_MAP_CENTER_COORDINATE} from '../constants/constants';

export interface Coordinate {
  latitude: number;
  longitude: number;
}

interface MapRegionType {
  latitudeDelta: number;
  longitudeDelta: number;
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

  storeBasicInformation: StoreBasicInformationType[];
  fetchStoreBasicInformation: (mapRegion: MapRegionType) => Promise<void>;

  filteredStoreBasicInformation: StoreBasicInformationType[];
  setFilteredStoreBasicInformation: () => void;

  isLoading: boolean;

  clearSelectedPlace: () => void;
  resetMapState: () => void;
}

const initialState = {
  selectedPlace: null,
  selectedAges: [],
  selectedChips: [],
  centerCoordinate: INITIAL_MAP_CENTER_COORDINATE,
  storeBasicInformation: [],
  filteredStoreBasicInformation: [],
  isLoading: false,
};

export const useMapStore = create<MapState>((set, get) => ({
  ...initialState,
  setSelectedPlace: selectedPlace => set({selectedPlace: selectedPlace}),

  setSelectedAges: ages => set({selectedAges: ages}),

  setSelectedChips: chips => set({selectedChips: chips}),

  setCenterCoordinate: centerCoordinate =>
    set({centerCoordinate: centerCoordinate}),

  fetchStoreBasicInformation: async mapRegion => {
    try {
      const {selectedAges, centerCoordinate} = get();

      const {topLeft, bottomRight} = calculateMapRegion(
        centerCoordinate,
        mapRegion,
      );

      set({isLoading: true});

      const stores = await getRangeInfo({
        topLeftLat: topLeft.latitude,
        topLeftLong: topLeft.longitude,
        bottomRightLat: bottomRight.latitude,
        bottomRightLong: bottomRight.longitude,
      });

      if (selectedAges?.length === 0) {
        set({storeBasicInformation: stores});

        return;
      }

      const recommendStores = stores
        .filter(store =>
          store.babyAges?.some((age: number) => selectedAges.includes(age)),
        )
        .map(store => {
          const matchCount =
            store.babyAges?.filter((age: number) => selectedAges.includes(age))
              .length ?? 0;

          return {
            ...store,
            matchCount,
          };
        })
        .sort((a, b) => b.matchCount - a.matchCount);

      set({storeBasicInformation: recommendStores});
    } catch (error) {
      throw new Error('주변 가게 검색 중 문제가 발생하였습니다.');
    } finally {
      set({isLoading: false});
    }
  },

  setFilteredStoreBasicInformation: () => {
    const {storeBasicInformation, selectedChips} = get();

    let filteredStores: StoreBasicInformationType[];

    if (selectedChips.length === 0) {
      filteredStores = storeBasicInformation;
    }

    filteredStores = storeBasicInformation.filter(store => {
      const conveniences = store.convenience[0].convenienceDetails;

      if (!conveniences) {
        return false;
      }

      return selectedChips.every(
        chip =>
          conveniences[chip as keyof ConvenienceType['convenienceDetails']],
      );
    });

    set({filteredStoreBasicInformation: filteredStores});
  },

  clearSelectedPlace: () => set({selectedPlace: null}),
  resetMapState: () => set({...initialState}),
}));
