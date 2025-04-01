import Geolocation from '@react-native-community/geolocation';

import {Coordinate} from '../screens/Map/MapScreen/types';

const getCurrentLocation = (): Promise<Coordinate> => {
  return new Promise((resolve, reject) => {
    Geolocation.getCurrentPosition(
      position => {
        const {
          coords: {latitude, longitude},
        } = position;
        resolve({latitude, longitude});
      },
      error => {
        console.log('Geolocation error:', error);
        reject(error);
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 5000,
      },
    );
  });
};

export default getCurrentLocation;
