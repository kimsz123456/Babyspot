import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import AuthStackNavigator from './AuthStackNavigator';
import BottomTabNavigator from './BottomTabNavigator';

const RootNavigator = () => {
  const isSignedIn = true;

  return (
    <NavigationContainer>
      {isSignedIn ? <BottomTabNavigator /> : <AuthStackNavigator />}
    </NavigationContainer>
  );
};

export default RootNavigator;
