import React from 'react';
import {Image, ImageSourcePropType, Text, View} from 'react-native';

import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import MapScreen from '../screens/Map/MapScreen';
import ProfileScreen from '../screens/Profile/ProfileScreen';
import SearchScreen from '../screens/Map/SearchScreen';

import {
  IC_MAP_NAV,
  IC_MAP_NAV_ACTIVE,
  IC_PROFILE_NAV,
  IC_PROFILE_NAV_ACTIVE,
} from '../constants/icons';
import {GrayColors, PrimaryColors} from '../constants/colors';
import {FontStyles} from '../constants/fonts';
import styled from 'styled-components/native';
import scale from '../utils/scale';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

const BOTTOM_TAB_INFORMATION: {
  [key: string]: {
    label: string;
    iconSource_inactive: ImageSourcePropType;
    iconSource_active: ImageSourcePropType;
  };
} = {
  Map: {
    label: '지도',
    iconSource_inactive: IC_MAP_NAV,
    iconSource_active: IC_MAP_NAV_ACTIVE,
  },
  Profile: {
    label: '프로필',
    iconSource_inactive: IC_PROFILE_NAV,
    iconSource_active: IC_PROFILE_NAV_ACTIVE,
  },
};

const Tab = createBottomTabNavigator({
  screens: {Map: {screen: MapScreen}, Profile: {screen: ProfileScreen}},
});

const Stack = createNativeStackNavigator();

const MapStack = () => (
  <Stack.Navigator>
    <Stack.Screen
      name="Map"
      component={MapScreen}
      options={{headerShown: false}}
    />
    <Stack.Screen
      name="Search"
      component={SearchScreen}
      options={{presentation: 'modal', headerShown: false}}
    />
  </Stack.Navigator>
);

const BottomTabNavigator = () => {
  const insets = useSafeAreaInsets();

  return (
    <NavigationContainer>
      <Tab.Navigator
        initialRouteName="Map"
        screenOptions={({route}) => ({
          headerShown: route.name === 'Map' ? false : true,
          tabBarHideOnKeyboard: true,
          tabBarStyle: {
            height: scale(68) + insets.bottom,
            paddingTop: scale(8),
          },

          tabBarIcon: ({focused}) => {
            return (
              <IconImage
                source={
                  focused
                    ? BOTTOM_TAB_INFORMATION[route.name].iconSource_active
                    : BOTTOM_TAB_INFORMATION[route.name].iconSource_inactive
                }
              />
            );
          },

          tabBarLabel: ({focused}) => {
            return (
              <View style={{flexDirection: 'row'}}>
                <TabBarLabel $focused={focused}>
                  {BOTTOM_TAB_INFORMATION[route.name].label}
                </TabBarLabel>
              </View>
            );
          },
        })}>
        <Tab.Screen name="Map" component={MapStack} />
        <Tab.Screen name="Profile" component={ProfileScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

const IconImage = styled(Image)`
  width: ${scale(24)}px;
  height: ${scale(24)}px;
`;

const TabBarLabel = styled(Text)<{$focused: boolean}>`
  color: ${({$focused}) => ($focused ? PrimaryColors[500] : GrayColors[800])};
  ${FontStyles.captionMedium}
`;

export default BottomTabNavigator;
