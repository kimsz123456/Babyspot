import React from 'react';

import {createNativeStackNavigator} from '@react-navigation/native-stack';

import MapScreen from '../screens/Map/MapScreen';
import SearchScreen from '../screens/Map/SearchScreen';
import StoreDetailScreen from '../screens/Map/StoreDetailScreen';
import KakaoPostcodeScreen from '../screens/Map/SearchScreen/KakaoPostcodeScreen';
import {StoreBasicInformationType} from '../screens/Map/NearStoreListScreen/components/StoreBasicInformation/types';
import {KeywordProps} from '../screens/Map/StoreDetailScreen/components/Keyword';
import KeywordReviewScreen from '../screens/Map/KeywordReviewScreen';
import {ReviewProps} from '../screens/Map/StoreDetailScreen/components/Review';
import ReviewListScreen from '../screens/Map/ReviewListScreen';
import CustomHeader from './CustomHeader';

export type MapStackParamList = {
  MapMain: {address: string};
  Search: undefined;
  KakaoPostcode: undefined;
  StoreDetail: {storeBasicInformation: StoreBasicInformationType};
  KeywordReview: {keywordInformation: KeywordProps};
  ReviewListScreen: {reviewInformation: ReviewProps; filterAges?: number[]};
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
      <Stack.Screen
        name="KeywordReview"
        component={KeywordReviewScreen}
        options={() => ({title: '키워드 리뷰'})}
      />
      <Stack.Screen
        name="ReviewListScreen"
        component={ReviewListScreen}
        options={({route}) => ({
          header(props) {
            return (
              <CustomHeader
                props={props}
                title={route.params.reviewInformation.storeName}
              />
            );
          },
        })}
      />
    </Stack.Navigator>
  );
};

export default MapStackNavigator;
