import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import ProfileScreen from '../../screens/Profile/ProfileScreen';
import scale from '../../utils/scale';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import MapStackNavigator from './../MapStackNavigator';
import BottomTabBarIcon from './BottomTabBarIcon';
import BottomTabBarLabel from './BottomTabBarLabel';

const BottomTabNavigator = () => {
  const Tab = createBottomTabNavigator();
  const insets = useSafeAreaInsets();

  return (
    <Tab.Navigator
      initialRouteName="Map"
      screenOptions={({route}) => ({
        headerShown: route.name === 'Map' || 'Profile' ? false : true,
        tabBarHideOnKeyboard: true,
        tabBarStyle: {
          height: scale(68) + insets.bottom,
          paddingTop: scale(8),
        },
        tabBarIcon: ({focused}) => BottomTabBarIcon({focused, route}),
        tabBarLabel: ({focused}) => BottomTabBarLabel({focused, route}),
      })}>
      <Tab.Screen name="Map" component={MapStackNavigator} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
    </Tab.Navigator>
  );
};

export default BottomTabNavigator;
