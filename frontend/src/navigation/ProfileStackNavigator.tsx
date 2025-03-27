import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import MapScreen from '../screens/Map/MapScreen';
import SearchScreen from '../screens/Map/SearchScreen';
import ProfileScreen from '../screens/Profile/ProfileScreen';
import ProfileEditScreen from '../screens/Profile/ProfileEditScreen';

const ProfileStackNavigator = () => {
  const Stack = createNativeStackNavigator();

  return (
    <Stack.Navigator>
      <Stack.Screen
        name="ProfileMain"
        component={ProfileScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="ProfileEdit"
        component={ProfileEditScreen}
        options={{title: '프로필 수정'}}
      />
    </Stack.Navigator>
  );
};

export default ProfileStackNavigator;
