import React from 'react';

import {createNativeStackNavigator} from '@react-navigation/native-stack';

import MapScreen from '../screens/Map/MapScreen';
import SearchScreen from '../screens/Map/SearchScreen';
import StoreDetailScreen from '../screens/Map/StoreDetailScreen';

const MapStackNavigator = () => {
  const Stack = createNativeStackNavigator();

  return (
    <Stack.Navigator>
      <Stack.Screen
        name="MapMain"
        component={MapScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Search"
        component={SearchScreen}
        options={{presentation: 'modal', headerShown: false}}
      />
      <Stack.Screen
        name="StoreDetail"
        component={StoreDetailScreen}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
};

export default MapStackNavigator;
