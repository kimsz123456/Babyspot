import React, {useRef, useState} from 'react';
import {LayoutChangeEvent} from 'react-native';

import {
  NaverMapMarkerOverlay,
  NaverMapViewRef,
} from '@mj-studio/react-native-naver-map';

import NearStoreListScreen from '../NearStoreListScreen';
import PlaceSearchButton from '../components/PlaceSearchButton';
import RecommendButton from './components/RecommendButton';
import Chip from './components/Chip';
import ResearchButton from './components/ResearchButton';
import {GetRangeInfo} from '../../../services/mapService';

import {IC_RESTAURANT_MARKER} from '../../../constants/icons';
import MOCK from '../NearStoreListScreen/components/StoreBasicInformation/mock';

import * as S from './styles';

const MapScreen = () => {
  const mapRef = useRef<NaverMapViewRef>(null);
  const [mapSize, setMapSize] = useState({width: 0, height: 0});

  const onLayoutMap = (e: LayoutChangeEvent) => {
    const {width, height} = e.nativeEvent.layout;

    console.log(width, height);

    setMapSize({width, height});
  };

  const handlePress = async () => {
    // if (!mapRef.current) {
    //   return;
    // }
    // try {
    //   const topLeft = await mapRef.current.screenToCoordinate({
    //     screenX: 0,
    //     screenY: 0,
    //   });
    //   const bottomRight = await mapRef.current.screenToCoordinate({
    //     screenX: mapSize.width * 3.75,
    //     screenY: mapSize.height * 3.75,
    //   });
    //   const response = await GetRangeInfo({
    //     topLeftLat: topLeft.latitude,
    //     topLeftLong: topLeft.longitude,
    //     bottomRightLat: bottomRight.latitude,
    //     bottomRightLong: bottomRight.longitude,
    //   });
    //   console.log(response);
    // } catch (e) {
    //   return Promise.reject(e);
    // }
  };

  return (
    <S.MapScreenContainer>
      <S.FloatingContainer>
        <S.SearchAndRecommendContainer>
          <PlaceSearchButton />
          <RecommendButton />
        </S.SearchAndRecommendContainer>
        <S.ChipContainer>
          <Chip label="유아 의자" />
        </S.ChipContainer>
      </S.FloatingContainer>

      <S.NaverMap
        ref={mapRef}
        onLayout={onLayoutMap}
        initialCamera={{
          latitude: 37.498040483,
          longitude: 127.02758183,
          zoom: 15,
        }} // 강남역
        isIndoorEnabled={true}
        isExtentBoundedInKorea={true}>
        {MOCK.map(data => (
          <NaverMapMarkerOverlay
            latitude={data.latitude}
            longitude={data.longitude}
            width={30}
            height={40}
            image={IC_RESTAURANT_MARKER}
          />
        ))}
      </S.NaverMap>

      <ResearchButton onPress={handlePress} />

      <NearStoreListScreen />
    </S.MapScreenContainer>
  );
};

export default MapScreen;
