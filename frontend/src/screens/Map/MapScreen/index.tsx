import React from 'react';

import {NaverMapMarkerOverlay} from '@mj-studio/react-native-naver-map';

import {IC_RESTUARANT_MARKER} from '../../../constants/icons';

import * as S from './styles';

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
          image={IC_RESTUARANT_MARKER}
        />
      </S.NaverMap>
    </S.ContainerView>
  );
};

export default MapScreen;
