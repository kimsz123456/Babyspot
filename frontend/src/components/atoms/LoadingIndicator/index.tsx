import React from 'react';
import {ActivityIndicator, View} from 'react-native';
import {PrimaryColors} from '../../../constants/colors';

const LoadingIndicator = () => {
  return (
    <View
      style={{
        flex: 1,
        width: '100%',
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        position: 'absolute',
      }}>
      <ActivityIndicator size="large" color={PrimaryColors[500]} />
    </View>
  );
};
export default LoadingIndicator;
