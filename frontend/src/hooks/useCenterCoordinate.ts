import {useState} from 'react';

import {Camera, Region} from '@mj-studio/react-native-naver-map';

interface Coordinate {
  latitude: number;
  longitude: number;
}

const useMapViewport = (
  initialCenter: Coordinate = {
    latitude: 37.498040483,
    longitude: 127.02758183,
  }, // 초기 위치 강남역
) => {
  const [centerCoordinate, setCenterCoordinate] =
    useState<Coordinate>(initialCenter);
  const [mapRegion, setMapRegion] = useState({
    latitudeDelta: 0.01,
    longitudeDelta: 0.01,
  });

  const onCameraIdle = (e: Camera & {region: Region}) => {
    setCenterCoordinate({
      latitude: e.latitude,
      longitude: e.longitude,
    });

    setMapRegion({
      latitudeDelta: e.region.latitudeDelta,
      longitudeDelta: e.region.longitudeDelta,
    });
  };

  return {
    centerCoordinate,
    mapRegion,
    onCameraIdle,
  };
};

export default useMapViewport;
