import React from 'react';
import {StyleSheet, View} from 'react-native';

import {
  NaverMapMarkerOverlay,
  NaverMapView,
  Region,
} from '@mj-studio/react-native-naver-map';

const jejuRegion: Region = {
  latitude: 33.20530773,
  longitude: 126.14656715029,
  latitudeDelta: 0.38,
  longitudeDelta: 0.8,
};

const MapScreen = () => {
  return (
    <View style={styles.container}>
      <NaverMapView
        style={styles.map}
        initialRegion={jejuRegion}
        isExtentBoundedInKorea={true}
        onInitialized={() => console.log('지도 초기화 완료')}>
        <NaverMapMarkerOverlay
          latitude={33.3565607356}
          longitude={126.48599018}
          width={50}
          height={50}
          onTap={() => console.log('마커 탭됨')}
        />
      </NaverMapView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    flex: 1,
  },
});

export default MapScreen;
