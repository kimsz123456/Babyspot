import {Camera, Region} from '@mj-studio/react-native-naver-map';
import {useMapStore} from '../stores/mapStore';

const useMapViewport = () => {
  const {setCenterCoordinate, setMapRegion, setZoom} = useMapStore();

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
    onCameraIdle,
  };
};

export default useMapViewport;
