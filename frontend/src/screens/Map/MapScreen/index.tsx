import React, {useEffect, useRef, useState} from 'react';
import {LayoutChangeEvent} from 'react-native';

import {Alert} from 'react-native';
import {useRoute} from '@react-navigation/native';
import {
  NaverMapMarkerOverlay,
  NaverMapViewRef,
} from '@mj-studio/react-native-naver-map';

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

import {IC_RESTAURANT_MARKER} from '../../../constants/icons';

import * as S from './styles';
import scale from '../../../utils/scale';

const mockChips: ChipProps[] = [
  {label: '유아 의자', isSelected: false},
  {label: '유아 식기', isSelected: false},
  {label: '기저귀 교환대', isSelected: false},
  {label: '수유실', isSelected: false},
  {label: '놀이터', isSelected: false},
];
interface ChipProps {
  label: string;
  isSelected: boolean;
}

const MapScreen = () => {
  const mapRef = useRef<NaverMapViewRef>(null);
  const [mapSize, setMapSize] = useState({width: 0, height: 0});

  const [stores, setStores] = useState<StoreBasicInformationType[]>([]);
  const [selectedMarker, setSelectedMarker] = useState(-1);

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

  // 필터 칩 관련
  const initialChips = useRef(mockChips);
  const [chips, setChips] = useState(mockChips);

  // 선택되지 않았을 때 칩 자리를 기억해 유지하는 로직
  const handleChipPressed = (selectedIndex: number) => {
    setChips(prev => {
      const updated = prev.map((chip, index) =>
        index === selectedIndex
          ? {...chip, isSelected: !chip.isSelected}
          : chip,
      );

      const selected = updated.filter(chip => chip.isSelected);
      const unselected = initialChips.current.filter(
        initialChip =>
          !updated.find(chip => chip.label === initialChip.label)?.isSelected,
      );

      return [...selected, ...unselected];
    });
  };

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
