import {useEffect, useState} from 'react';

interface Coordinate {
  latitude: number;
  longitude: number;
}

const useResearchButtonVisibility = (centerCoordinate: Coordinate) => {
  const [lastSearchedCoordinate, setLastSearchedCoordinate] =
    useState(centerCoordinate);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const isSameLocation =
      Math.abs(centerCoordinate.latitude - lastSearchedCoordinate.latitude) <
        0.0001 &&
      Math.abs(centerCoordinate.longitude - lastSearchedCoordinate.longitude) <
        0.0001;

    setIsVisible(!isSameLocation);
  }, [centerCoordinate, lastSearchedCoordinate]);

  const updateLastSearchedCoordinate = () => {
    setLastSearchedCoordinate(centerCoordinate);
    setIsVisible(false);
  };

  return {
    isVisible,
    updateLastSearchedCoordinate,
  };
};

export default useResearchButtonVisibility;
