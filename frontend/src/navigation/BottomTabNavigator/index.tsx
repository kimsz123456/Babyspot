import React, {useEffect} from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import ProfileScreen from '../../screens/Profile/ProfileScreen';
import scale from '../../utils/scale';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import MapStackNavigator from './../MapStackNavigator';
import ProfileStackNavigator from '../ProfileStackNavigator';
import BottomTabBarIcon from './BottomTabBarIcon';
import BottomTabBarLabel from './BottomTabBarLabel';
import {useGlobalStore} from '../../stores/globalStore';
import {getMemberProfile} from '../../services/profileService';
import {Pressable} from 'react-native';

const BottomTabNavigator = () => {
  const Tab = createBottomTabNavigator();
  const insets = useSafeAreaInsets();
  const {setMemberProfile} = useGlobalStore();

  const handleTabPress = async (route: string) => {
    if (route === 'Profile') {
      try {
        const updatedProfile = await getMemberProfile();
        setMemberProfile(updatedProfile);
      } catch (error) {
        throw error;
      }
    }
  };

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
        tabBarButton: props => (
          <Pressable
            {...props}
            onPress={e => {
              handleTabPress(route.name);
              props.onPress?.(e);
            }}
          />
        ),
      })}>
      <Tab.Screen name="Map" component={MapStackNavigator} />
      <Tab.Screen name="Profile" component={ProfileStackNavigator} />
    </Tab.Navigator>
  );
};

export default BottomTabNavigator;
