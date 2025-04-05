import {useState} from 'react';

import {Camera, Region} from '@mj-studio/react-native-naver-map';
import {
  INITIAL_MAP_CENTER_COORDINATE,
  MAP_ZOOM_SCALE,
} from '../constants/constants';

interface Coordinate {
  latitude: number;
  longitude: number;
}

const useMapViewport = (initialCenter = INITIAL_MAP_CENTER_COORDINATE) => {
  const [centerCoordinate, setCenterCoordinate] =
    useState<Coordinate>(initialCenter);
  const [mapRegion, setMapRegion] = useState({
    latitudeDelta: 0.01,
    longitudeDelta: 0.01,
  });
  const [zoom, setZoom] = useState<number | undefined>(MAP_ZOOM_SCALE.basic);

  const onCameraIdle = (e: Camera & {region: Region}) => {
    setCenterCoordinate({
      latitude: e.latitude,
      longitude: e.longitude,
    });

    setMapRegion({
      latitudeDelta: e.region.latitudeDelta,
      longitudeDelta: e.region.longitudeDelta,
    });

    setZoom(e.zoom);
  };

  return {
    centerCoordinate,
    mapRegion,
    zoom,
    onCameraIdle,
  };
};

export default useMapViewport;
