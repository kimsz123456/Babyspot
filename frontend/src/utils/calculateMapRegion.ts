const calculateMapRegion = (
  center: {latitude: number; longitude: number},
  region: {latitudeDelta: number; longitudeDelta: number},
) => {
  const {latitude, longitude} = center;
  const {latitudeDelta, longitudeDelta} = region;

  const topLeft = {
    latitude: latitude + latitudeDelta / 2,
    longitude: longitude - longitudeDelta / 2,
  };

  const bottomRight = {
    latitude: latitude - latitudeDelta / 2,
    longitude: longitude + longitudeDelta / 2,
  };

  return {topLeft, bottomRight};
};

export default calculateMapRegion;
