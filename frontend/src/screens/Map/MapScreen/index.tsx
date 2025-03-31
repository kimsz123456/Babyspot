import React, {useEffect, useRef, useState} from 'react';
import {LayoutChangeEvent} from 'react-native';

import {Alert} from 'react-native';
import {useRoute} from '@react-navigation/native';
import {
  NaverMapMarkerOverlay,
  NaverMapViewRef,
} from '@mj-studio/react-native-naver-map';

import {useChips} from '../../../hooks/useChips';

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
import {IC_RESTAURANT_MARKER} from '../../../constants/icons';

import * as S from './styles';

const MapScreen = () => {
  const mapRef = useRef<NaverMapViewRef>(null);
  const [mapSize, setMapSize] = useState({width: 0, height: 0});

  const [stores, setStores] = useState<StoreBasicInformationType[]>([]);
  const [selectedMarker, setSelectedMarker] = useState(-1);

  const {chips, handleChipPressed} = useChips();

  const clearAddress = useMapStore(state => state.clearAddress);
  const route = useRoute();
  const address = (route.params as any)?.address as string;

  const onLayoutMap = (e: LayoutChangeEvent) => {
    const {width, height} = e.nativeEvent.layout;

    setMapSize({width, height});
  };

  const handlePress = async () => {
    clearAddress();

    if (!mapRef.current) {
      return;
    }

    try {
      const topLeft = await mapRef.current.screenToCoordinate({
        screenX: 0,
        screenY: 0,
      });
      const bottomRight = await mapRef.current.screenToCoordinate({
        screenX: mapSize.width * 3.75,
        screenY: mapSize.height * 3.75,
      });

      const response = await getRangeInfo({
        topLeftLat: topLeft.latitude,
        topLeftLong: topLeft.longitude,
        bottomRightLat: bottomRight.latitude,
        bottomRightLong: bottomRight.longitude,
      });

      setStores(response);

      console.log(response);
    } catch (e) {
      return Promise.reject(e);
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
    if (address) {
      moveToAddress(address);
    }
  }, [address]);

  return (
    <S.MapScreenContainer>
      <S.NaverMap
        ref={mapRef}
        onLayout={onLayoutMap}
        onTapMap={handleNaverMapTab}
        initialCamera={{
          latitude: 37.498040483,
          longitude: 127.02758183,
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

      <ResearchButton onPress={handlePress} />

      {selectedMarker >= 0 ? (
        <StoreBasicScreen store={stores[selectedMarker]} />
      ) : (
        <NearStoreListScreen stores={stores} />
      )}
    </S.MapScreenContainer>
  );
};

export default MapScreen;
