/* eslint-disable react-hooks/exhaustive-deps */

import React, {useEffect, useRef, useState} from 'react';
import {Alert} from 'react-native';

import {useRoute} from '@react-navigation/native';
import {
  NaverMapMarkerOverlay,
  NaverMapViewRef,
} from '@mj-studio/react-native-naver-map';

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
import {geocoding} from '../../../services/mapService';
import {useMapStore} from '../../../stores/mapStore';
import {StoreBasicInformationType} from '../NearStoreListScreen/components/StoreBasicInformation/types';

import scale from '../../../utils/scale';
import calculateMapRegion from '../../../utils/calculateMapRegion';
import checkLocationPermission from '../../../utils/checkLocationPermission';
import {IC_RESTAURANT_MARKER} from '../../../constants/icons';

import * as S from './styles';

const MapScreen = () => {
  const mapRef = useRef<NaverMapViewRef>(null);

  const [stores, setStores] = useState<StoreBasicInformationType[]>([]);
  const [selectedMarker, setSelectedMarker] = useState(-1);
  const [isPendingResearch, setIsPendingResearch] = useState(false);

  const {centerCoordinate, mapRegion, zoom, onCameraIdle} = useMapViewport();
  const {isVisible, updateLastSearchedCoordinate} = useResearchButtonVisibility(
    {centerCoordinate, zoom},
  );
  const {chips, handleChipPressed} = useChips();

  const clearAddress = useMapStore(state => state.clearAddress);

  const route = useRoute();
  const address = (route.params as any)?.address as string;

  const initTracking = async () => {
    const hasPermission = await checkLocationPermission();

    if (!hasPermission) {
      return;
    }

    mapRef.current?.setLocationTrackingMode('Follow');
  };

  const handleResearchButtonPress = () => {
    clearAddress();

    if (!mapRef.current) {
      return;
    }

    mapRef.current.animateCameraTo({
      latitude: centerCoordinate.latitude,
      longitude: centerCoordinate.longitude,
      zoom: 15,
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
      console.error(e);
    } finally {
      setIsPendingResearch(false);
    }
  };

  const handleMarkerTab = (idx: number) => {
    setSelectedMarker(idx);
  };

  const handleNaverMapTab = () => {
    setSelectedMarker(-1);
  };

  const moveToAddress = async (address: string) => {
    try {
      const response = await geocoding(address);

      if (!response) {
        Alert.alert('주소를 찾을 수 없습니다.');
        return;
      }

      const latitude = parseFloat(response.y);
      const longitude = parseFloat(response.x);

      mapRef.current?.animateCameraTo({
        latitude,
        longitude,
        zoom: 15,
      });
    } catch (error) {
      Alert.alert('위치 이동 중 오류 발생');
      console.error(error);
    }
  };

  useEffect(() => {
    initTracking();
  }, []);

  useEffect(() => {
    if (address) {
      moveToAddress(address);
    }
  }, [address]);

  useEffect(() => {
    if (!isPendingResearch || zoom !== 15) {
      return;
    }

    searchStoresInRegion();
  }, [isPendingResearch, zoom]);

  return (
    <S.MapScreenContainer>
      <S.NaverMap
        ref={mapRef}
        onCameraIdle={onCameraIdle}
        onTapMap={handleNaverMapTab}
        initialCamera={{
          latitude: centerCoordinate.latitude,
          longitude: centerCoordinate.longitude,
          zoom: 15,
        }}
        isIndoorEnabled={true}
        isExtentBoundedInKorea={true}>
        {stores.map((data, idx) => (
          <NaverMapMarkerOverlay
            key={idx}
            latitude={data.latitude}
            longitude={data.longitude}
            width={30}
            height={40}
            image={IC_RESTAURANT_MARKER}
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
        <StoreBasicScreen store={stores[selectedMarker]} />
      ) : (
        <NearStoreListScreen stores={stores} />
      )}
    </S.MapScreenContainer>
  );
};

export default MapScreen;
