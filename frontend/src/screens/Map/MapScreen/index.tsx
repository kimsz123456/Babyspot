import React from 'react';

import {NaverMapMarkerOverlay} from '@mj-studio/react-native-naver-map';

import PlaceSearchButton from '../components/PlaceSearchButton';
import RecommendButton from './components/RecommendButton';
import Chip from './components/Chip';
import {IC_RESTAURANT_MARKER} from '../../../constants/icons';

import * as S from './styles';

const MapScreen = () => {
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
        initialCamera={{
          latitude: 37.498040483,
          longitude: 127.02758183,
          zoom: 15,
        }} // 강남역
        isIndoorEnabled={true}
        isExtentBoundedInKorea={true}>
        <NaverMapMarkerOverlay
          latitude={37.501287}
          longitude={127.03961}
          width={30}
          height={40}
          image={IC_RESTAURANT_MARKER}
        />
      </S.NaverMap>
    </S.MapScreenContainer>
  );
};

export default MapScreen;
