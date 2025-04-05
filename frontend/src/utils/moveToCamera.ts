import {NaverMapViewRef} from '@mj-studio/react-native-naver-map';

import {Coordinate} from '../screens/Map/MapScreen/types';
import {MAP_ZOOM_SCALE} from '../constants/constants';

interface moveToCameraProps extends Coordinate {
  mapRef: React.RefObject<NaverMapViewRef | null>;
  zoom?: number;
}

const moveToCamera = ({
  latitude,
  longitude,
  mapRef,
  zoom = MAP_ZOOM_SCALE.basic,
}: moveToCameraProps) => {
  mapRef.current?.animateCameraTo({
    latitude,
    longitude,
    zoom: zoom,
  });
};

export default moveToCamera;
