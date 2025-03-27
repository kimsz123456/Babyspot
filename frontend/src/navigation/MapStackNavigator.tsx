import React from 'react';

import {createNativeStackNavigator} from '@react-navigation/native-stack';

import MapScreen from '../screens/Map/MapScreen';
import SearchScreen from '../screens/Map/SearchScreen';
import StoreDetailScreen from '../screens/Map/StoreDetailScreen';
import KakaoPostcodeScreen from '../screens/Map/SearchScreen/KakaoPostcodeScreen';
import {StoreBasicInformationType} from '../screens/Map/NearStoreListScreen/components/StoreBasicInformation/types';

export type MapStackParamList = {
  MapMain: undefined;
  Search: undefined;
  KakaoPostcode: undefined;
  StoreDetail: {storeBasicInformation: StoreBasicInformationType};
};

const MapStackNavigator = () => {
  const Stack = createNativeStackNavigator<MapStackParamList>();

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
        name="KakaoPostcode"
        component={KakaoPostcodeScreen}
        options={{title: '주소 검색'}}
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
