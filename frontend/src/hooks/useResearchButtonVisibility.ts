import {useEffect, useState} from 'react';

interface Coordinate {
  latitude: number;
  longitude: number;
}

interface useResearchButtonVisibilityProps {
  centerCoordinate: Coordinate;
  zoom?: number;
}

const useResearchButtonVisibility = ({
  centerCoordinate,
  zoom,
}: useResearchButtonVisibilityProps) => {
  const [lastSearchedCoordinate, setLastSearchedCoordinate] =
    useState(centerCoordinate);
  const [lastZoom, setLastZoom] = useState(zoom);
  const [isVisible, setIsVisible] = useState(false);

  const updateLastSearchedCoordinate = () => {
    setLastSearchedCoordinate(centerCoordinate);
    setLastZoom(zoom);
    setIsVisible(false);
  };

  useEffect(() => {
    const isSameLocation =
      Math.abs(centerCoordinate.latitude - lastSearchedCoordinate.latitude) <
        0.0001 &&
      Math.abs(centerCoordinate.longitude - lastSearchedCoordinate.longitude) <
        0.0001;

    const isSameZoom = lastZoom === zoom;

    setIsVisible(!isSameLocation || !isSameZoom);
  }, [centerCoordinate, lastSearchedCoordinate, zoom, lastZoom]);

  return {
    isVisible,
    updateLastSearchedCoordinate,
  };
};

export default useResearchButtonVisibility;
