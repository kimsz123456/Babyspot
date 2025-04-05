/* eslint-disable react-hooks/exhaustive-deps */

import React, {useEffect, useMemo, useRef, useState} from 'react';
import {Alert} from 'react-native';

import {useRoute} from '@react-navigation/native';
import {
  Camera,
  NaverMapMarkerOverlay,
  NaverMapViewRef,
  Region,
} from '@mj-studio/react-native-naver-map';
import BottomSheet from '@gorhom/bottom-sheet';

import useMapViewport from '../../../hooks/useMapViewport';
import useResearchButtonVisibility from '../../../hooks/useResearchButtonVisibility';
import useChips from '../../../hooks/useChips';

import NearStoreListScreen from '../NearStoreListScreen';
import PlaceSearchButton from '../components/PlaceSearchButton';
import RecommendButton from './components/RecommendButton';
import Chip from './components/Chip';
import ResearchButton from './components/ResearchButton';
import StoreBasicScreen from '../StoreBasicScreen';
import {getRangeInfo} from '../../../services/mapService';
import {getGeocoding} from '../../../services/mapService';
import {useMapStore} from '../../../stores/mapStore';
import {
  ConvenienceType,
  StoreBasicInformationType,
} from '../NearStoreListScreen/components/StoreBasicInformation/types';

import scale from '../../../utils/scale';
import calculateMapRegion from '../../../utils/calculateMapRegion';
import checkLocationPermission from '../../../utils/checkLocationPermission';
import getCurrentLocation from '../../../utils/getCurrentLocation';
import moveToCamera from '../../../utils/moveToCamera';
import {
  IC_RECOMMEND_MARKER,
  IC_RESTAURANT_MARKER,
} from '../../../constants/icons';
import {MAP_ZOOM_SCALE} from '../../../constants/constants';

import * as S from './styles';

const MapScreen = () => {
  const mapRef = useRef<NaverMapViewRef>(null);
  const bottomSheetRef = useRef<BottomSheet>(null);

  const [stores, setStores] = useState<StoreBasicInformationType[]>([]);
  const [selectedMarker, setSelectedMarker] = useState(-1);

  const [isReadyToFirstSearch, setIsReadyToFirstSearch] = useState(false);
  const [isPendingResearch, setIsPendingResearch] = useState(false);
  const [isResearchButtonPressed, setIsResearchButtonPressed] = useState(false);

  const {centerCoordinate, mapRegion, zoom, onCameraIdle} = useMapViewport();
  const {isVisible, updateLastSearchedCoordinate} = useResearchButtonVisibility(
    {centerCoordinate, zoom},
  );
  const {chips, handleChipPressed} = useChips();
  const {selectedAges, selectedChips, setSelectedAges, setSelectedChips} =
    useMapStore();

  const clearAddress = useMapStore(state => state.clearAddress);

  const route = useRoute();
  const address = (route.params as any)?.address as string;

  const changeMarkerSize = (idx: number, defaultSize: number) => {
    if (selectedMarker === -1) {
      return defaultSize;
    }

    if (idx !== selectedMarker) {
      return defaultSize * 0.7;
    }

    return defaultSize * 1.3;
  };

  const filteredStores = useMemo(() => {
    if (selectedChips.length === 0) {
      return stores;
    }

    return stores.filter(store => {
      const conveniences = store.convenience[0].convenienceDetails;

      if (!conveniences) {
        return false;
      }

      return selectedChips.every(
        chip =>
          conveniences[chip as keyof ConvenienceType['convenienceDetails']],
      );
    });
  }, [selectedChips, stores]);

  const initMapToCurrentLocation = async () => {
    const hasPermission = await checkLocationPermission();

    if (!hasPermission) {
      const {latitude, longitude} = centerCoordinate;
      moveToCamera({latitude, longitude, mapRef});

      setIsReadyToFirstSearch(true);

      return;
    }

    try {
      const {latitude, longitude} = await getCurrentLocation();

      moveToCamera({latitude, longitude, mapRef});

      setIsReadyToFirstSearch(true);
    } catch (e) {
      throw new Error('위치 정보 가져오기 실패');
    }
  };

  const handleCameraIdle = (e: Camera & {region: Region}) => {
    onCameraIdle(e);

    if (!isReadyToFirstSearch) {
      return;
    }

    setIsReadyToFirstSearch(false);
    setIsPendingResearch(true);
  };

  const handleResearchButtonPress = () => {
    clearAddress();

    setSelectedAges([]);
    setSelectedChips([]);

    if (!mapRef.current || !zoom) {
      return;
    }

    if (zoom < MAP_ZOOM_SCALE.basic) {
      moveToCamera({
        latitude: centerCoordinate.latitude,
        longitude: centerCoordinate.longitude,
        mapRef: mapRef,
      });
    }

    setIsResearchButtonPressed(true);
    setIsPendingResearch(true);
  };

  const modifyZoomForRecommend = () => {
    if (!mapRef.current) {
      return;
    }

    moveToCamera({
      latitude: centerCoordinate.latitude,
      longitude: centerCoordinate.longitude,
      mapRef: mapRef,
      zoom: MAP_ZOOM_SCALE.recommend,
    });

    setIsPendingResearch(true);
  };

  const searchStoresInRegion = async () => {
    try {
      const {topLeft, bottomRight} = calculateMapRegion(
        centerCoordinate,
        mapRegion,
      );

      const response = await getRangeInfo({
        topLeftLat: topLeft.latitude,
        topLeftLong: topLeft.longitude,
        bottomRightLat: bottomRight.latitude,
        bottomRightLong: bottomRight.longitude,
      });

      setStores(response);

      updateLastSearchedCoordinate();
    } catch (e) {
      throw new Error('주변 가게 검색 중 문제가 발생하였습니다.');
    } finally {
      bottomSheetRef.current?.snapToIndex(1);

      setIsPendingResearch(false);
    }
  };

  const searchStoresByAge = async () => {
    try {
      // 보이는 영역 다시 계산
      const {topLeft, bottomRight} = calculateMapRegion(
        centerCoordinate,
        mapRegion,
      );

      // 주변 음식점 검색
      const response = await getRangeInfo({
        topLeftLat: topLeft.latitude,
        topLeftLong: topLeft.longitude,
        bottomRightLat: bottomRight.latitude,
        bottomRightLong: bottomRight.longitude,
      });

      // 음식점 필터링
      const recommendStores = response.filter(store => {
        return store.babyAges?.some((age: number) =>
          selectedAges.includes(age),
        );
      });

      setStores(recommendStores);

      updateLastSearchedCoordinate();
    } catch (error) {
      throw new Error('주변 음식점 추천 중 문제가 발생하였습니다.');
    } finally {
      bottomSheetRef.current?.snapToIndex(1);

      setIsPendingResearch(false);
    }
  };

  const handleMarkerTab = (idx: number) => {
    setSelectedMarker(idx);
  };

  const handleNaverMapTab = () => {
    bottomSheetRef.current?.snapToIndex(0);

    setSelectedMarker(-1);
  };

  const moveToAddress = async (address: string) => {
    try {
      const response = await getGeocoding(address);

      if (!response) {
        Alert.alert('주소를 찾을 수 없습니다.');
        return;
      }

      const latitude = parseFloat(response.y);
      const longitude = parseFloat(response.x);

      moveToCamera({
        latitude: latitude,
        longitude: longitude,
        mapRef: mapRef,
      });
    } catch (error) {
      Alert.alert('위치 이동 중 오류 발생');
    }
  };

  useEffect(() => {
    initMapToCurrentLocation();
  }, []);

  useEffect(() => {
    if (!address) {
      return;
    }

    moveToAddress(address);
  }, [address]);

  useEffect(() => {
    if (!isPendingResearch || !zoom) {
      return;
    }

    // 추천 검색
    if (selectedAges.length > 0 && zoom === MAP_ZOOM_SCALE.recommend) {
      searchStoresByAge();
      return;
    }

    if (selectedAges.length === 0) {
      // zoom > 13 일 때 검색
      if (isResearchButtonPressed && zoom >= MAP_ZOOM_SCALE.basic) {
        searchStoresInRegion();
        setIsReadyToFirstSearch(false);
        return;
      }

      // zoom <= 13 일 때 검색
      else if (zoom === MAP_ZOOM_SCALE.basic) {
        searchStoresInRegion();
        return;
      }
    }
  }, [isPendingResearch, zoom]);

  useEffect(() => {
    if (selectedAges.length === 0) {
      return;
    }

    modifyZoomForRecommend();
  }, [selectedAges]);

  return (
    <S.MapScreenContainer>
      <S.NaverMap
        ref={mapRef}
        onCameraIdle={handleCameraIdle}
        onTapMap={handleNaverMapTab}
        isIndoorEnabled={true}
        isExtentBoundedInKorea={true}>
        {filteredStores.map((data, idx) => (
          <NaverMapMarkerOverlay
            key={idx}
            latitude={data.latitude}
            longitude={data.longitude}
            width={changeMarkerSize(idx, 30)}
            height={changeMarkerSize(idx, 40)}
            image={
              selectedAges.length > 0 && !isPendingResearch
                ? IC_RECOMMEND_MARKER
                : IC_RESTAURANT_MARKER
            }
            onTap={() => handleMarkerTab(idx)}
          />
        ))}
      </S.NaverMap>

      <S.FloatingContainer>
        <S.SearchAndRecommendContainer>
          <PlaceSearchButton />
          <RecommendButton />
        </S.SearchAndRecommendContainer>
        <S.ChipContainer
          horizontal
          contentContainerStyle={{
            columnGap: scale(8),
            paddingHorizontal: scale(24),
          }}
          showsHorizontalScrollIndicator={false}>
          {chips.map((chip, index) => {
            return (
              <Chip
                key={index}
                isSelected={chip.isSelected}
                label={chip.label}
                onPressed={() => {
                  handleChipPressed(index);
                }}
              />
            );
          })}
        </S.ChipContainer>
      </S.FloatingContainer>

      {isVisible && <ResearchButton onPress={handleResearchButtonPress} />}

      {selectedMarker >= 0 ? (
        <StoreBasicScreen store={filteredStores[selectedMarker]} />
      ) : (
        <NearStoreListScreen
          stores={filteredStores}
          bottomSheetRef={bottomSheetRef}
        />
      )}
    </S.MapScreenContainer>
  );
};

export default MapScreen;
