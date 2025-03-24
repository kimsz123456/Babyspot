import React from 'react';

import {NaverMapMarkerOverlay} from '@mj-studio/react-native-naver-map';

import * as S from './styles';

// TODO: 이미지 상수 처리
import RESTAURANT_MARKER from '../../../../assets/icons/restaurant-marker.png';

const MapScreen = () => {
  return (
    <S.ContainerView>
      <S.NaverMap
        initialCamera={{
          latitude: 37.498040483,
          longitude: 127.02758183,
          zoom: 15,
        }} // 강남역
        isExtentBoundedInKorea={true}>
        <NaverMapMarkerOverlay
          latitude={37.501287}
          longitude={127.03961}
          width={30}
          height={40}
          image={RESTAURANT_MARKER}
          onTap={() => console.log('마커 탭됨')}
        />
      </S.NaverMap>
    </S.ContainerView>
  );
};

export default MapScreen;
