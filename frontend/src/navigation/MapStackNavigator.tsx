import React from 'react';

import {createNativeStackNavigator} from '@react-navigation/native-stack';

import MapScreen from '../screens/Map/MapScreen';
import SearchScreen from '../screens/Map/SearchScreen';
import StoreDetailScreen from '../screens/Map/StoreDetailScreen';
import {KeywordProps} from '../screens/Map/StoreDetailScreen/components/Keyword';
import KeywordReviewScreen from '../screens/Map/KeywordReviewScreen';
import {ReviewProps} from '../screens/Map/StoreDetailScreen/components/Review';
import ReviewListScreen from '../screens/Map/ReviewListScreen';
import CustomHeader from './CustomHeader';
import WriteReviewScreen from '../screens/Map/WriteReviewScreen';
import CompleteScreen, {
  CompleteTypes,
} from '../screens/Map/WriteReviewScreen/CompleteScreen';
import SelectRecommendationAgeScreen from '../screens/Map/SelectRecommendationAgeScreen';
import {ReviewType} from '../services/reviewService';
import {GetGeocodingByKeywordResponse} from '../services/mapService';
import PlaceSearchScreen from '../screens/Map/SearchScreen/PlaceSearchScreen';
import {useMapStore} from '../stores/mapStore';

export type MapStackParamList = {
  MapMain: {searchedPlace: GetGeocodingByKeywordResponse};
  Search: undefined;
  PlaceSearchScreen: undefined;
  StoreDetail: undefined;
  KeywordReview: {keywordInformation: KeywordProps};
  ReviewListScreen: {
    reviewInformation: ReviewProps;
    filterAges?: number[];
    storeId: number;
  };
  WriteReviewScreen: {review: ReviewType};
  CompleteScreen: {completeType: CompleteTypes};
  SelectRecommendationAgeScreen: undefined;
};

const MapStackNavigator = () => {
  const Stack = createNativeStackNavigator<MapStackParamList>();

  const {storeBasicInformation, selectedStoreIndex} = useMapStore();

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
        name="PlaceSearchScreen"
        component={PlaceSearchScreen}
        options={() => ({
          header(props) {
            return <CustomHeader props={props} title={'장소 검색'} />;
          },
        })}
      />
      <Stack.Screen
        name="StoreDetail"
        component={StoreDetailScreen}
        options={() => ({
          header(props) {
            return (
              <CustomHeader
                props={props}
                title={storeBasicInformation[selectedStoreIndex]?.title || ''}
              />
            );
          },
        })}
      />
      <Stack.Screen
        name="KeywordReview"
        component={KeywordReviewScreen}
        options={() => ({
          header(props) {
            return <CustomHeader props={props} title={'키워드 리뷰'} />;
          },
        })}
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
      <Stack.Screen
        name="WriteReviewScreen"
        component={WriteReviewScreen}
        options={({route}) => ({
          header(props) {
            return (
              <CustomHeader
                props={props}
                title={route.params.review.storeName}
              />
            );
          },
        })}
      />
      <Stack.Screen
        name="CompleteScreen"
        component={CompleteScreen}
        options={() => ({
          headerShown: false,
        })}
      />
      <Stack.Screen
        name="SelectRecommendationAgeScreen"
        component={SelectRecommendationAgeScreen}
        options={() => ({
          header(props) {
            return <CustomHeader props={props} title={'가게 추천'} />;
          },
        })}
      />
    </Stack.Navigator>
  );
};

export default MapStackNavigator;
