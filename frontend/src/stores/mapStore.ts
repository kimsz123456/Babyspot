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
import {
  INITIAL_MAP_CENTER_COORDINATE,
  MAP_ZOOM_SCALE,
} from '../constants/constants';

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

  selectedAges: number[];
  selectedChips: string[];

  centerCoordinate: Coordinate;
  mapRegion: MapRegionType;
  zoom: number;

  storeBasicInformation: StoreBasicInformationType[];
  filteredStoreBasicInformation: StoreBasicInformationType[];
  selectedStoreIndex: number;

  isLoading: boolean;

  setSelectedPlace: (selectedPlace: GetGeocodingByKeywordResponse) => void;

  setSelectedAges: (ages: number[]) => void;
  setSelectedChips: (chips: string[]) => void;

  setCenterCoordinate: (centerCoordinate: Coordinate) => void;
  setMapRegion: (region: MapRegionType) => void;
  setZoom: (zoom: number | undefined) => void;

  fetchStoreBasicInformation: () => Promise<void>;
  setFilteredStoreBasicInformation: () => void;
  setSelectedStoreIndex: (storeIndex: number) => void;

  clearSelectedPlace: () => void;
  resetMapState: () => void;
}

const initialState = {
  selectedPlace: null,
  selectedAges: [],
  selectedChips: [],
  centerCoordinate: INITIAL_MAP_CENTER_COORDINATE,
  mapRegion: {
    latitudeDelta: 0.01,
    longitudeDelta: 0.01,
  },
  zoom: MAP_ZOOM_SCALE.basic,
  storeBasicInformation: [],
  filteredStoreBasicInformation: [],
  selectedStoreIndex: -1,
  isLoading: false,
};

export const useMapStore = create<MapState>((set, get) => ({
  ...initialState,

  setSelectedPlace: selectedPlace => set({selectedPlace: selectedPlace}),

  setSelectedAges: ages => set({selectedAges: ages}),

  setSelectedChips: chips => set({selectedChips: chips}),

  setCenterCoordinate: centerCoordinate =>
    set({centerCoordinate: centerCoordinate}),

  setMapRegion: region => set({mapRegion: region}),

  setZoom: zoom => set({zoom: zoom}),

  fetchStoreBasicInformation: async () => {
    try {
      const {selectedAges, centerCoordinate, mapRegion} = get();

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

  setSelectedStoreIndex: storeIndex => set({selectedStoreIndex: storeIndex}),

  clearSelectedPlace: () => set({selectedPlace: null}),
  resetMapState: () => set({...initialState}),
}));
