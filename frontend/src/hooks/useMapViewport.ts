import {useState} from 'react';

import {Camera, Region} from '@mj-studio/react-native-naver-map';
import {MAP_ZOOM_SCALE} from '../constants/constants';
import {useMapStore} from '../stores/mapStore';

const useMapViewport = () => {
  const [mapRegion, setMapRegion] = useState({
    latitudeDelta: 0.01,
    longitudeDelta: 0.01,
  });
  const [zoom, setZoom] = useState<number | undefined>(MAP_ZOOM_SCALE.basic);

  const {setCenterCoordinate} = useMapStore();

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
    mapRegion,
    zoom,
    onCameraIdle,
  };
};

export default useMapViewport;
