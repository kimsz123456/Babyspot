import {useState} from 'react';

import {Camera, Region} from '@mj-studio/react-native-naver-map';

interface Coordinate {
  latitude: number;
  longitude: number;
}

const useCenterCoordinate = (
  initialCenter: Coordinate = {
    latitude: 37.498040483,
    longitude: 127.02758183,
  }, // 초기 위치 강남역
) => {
  const [centerCoordinate, setCenterCoordinate] =
    useState<Coordinate>(initialCenter);

  const onCameraIdle = (e: Camera & {region: Region}) => {
    setCenterCoordinate({
      latitude: e.latitude,
      longitude: e.longitude,
    });
  };

  return {
    centerCoordinate,
    onCameraIdle,
  };
};

export default useCenterCoordinate;
