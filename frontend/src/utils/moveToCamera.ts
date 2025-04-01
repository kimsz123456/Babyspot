import {NaverMapViewRef} from '@mj-studio/react-native-naver-map';

import {Coordinate} from '../screens/Map/MapScreen/types';

interface moveToCameraProps extends Coordinate {
  mapRef: React.RefObject<NaverMapViewRef | null>;
  zoom?: number;
}

const moveToCamera = ({
  latitude,
  longitude,
  mapRef,
  zoom = 15,
}: moveToCameraProps) => {
  mapRef.current?.animateCameraTo({
    latitude,
    longitude,
    zoom: zoom,
  });
};

export default moveToCamera;
