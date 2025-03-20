import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

import SplashScreen from './pages/onboarding/SplashScreen';
import SignInScreen from './pages/onboarding/SignInScreen';
import SignUpScreen from './pages/onboarding/SignUpScreen';

import MapScreen from './pages/map/MapScreen';
import SearchScreen from './pages/map/SearchScreen';
import StoreDetailScreen from './pages/map/StoreDetailScreen';
import EnterStoreRecommendationInformationScreen from './pages/map/EnterStoreRecommendationInformationScreen';
import KeywordReviewScreen from './pages/map/KeywordReviewScreen';
import WriteReviewScreen from './pages/map/WriteReviewScreen';
import ReviewDetailScreen from './pages/map/ReviewDetailScreen';

import RecommendScreen from './pages/recommend/RecommendScreen';

import ProfileScreen from './pages/profile/ProfileScreen';
import EditProfileScreen from './pages/profile/EditProfileScreen';
import MyReviewListScreen from './pages/profile/MyReviewListScreen';
import DeleteAccountScreen from './pages/profile/DeleteAccountScreen';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Splash">
        <Stack.Screen name="Splash" component={SplashScreen} />
        <Stack.Screen name="SignIn" component={SignInScreen} />
        <Stack.Screen name="SignUp" component={SignUpScreen} />
        <Stack.Screen name="Map" component={MapScreen} />
        <Stack.Screen name="Search" component={SearchScreen} />
        <Stack.Screen name="StoreDetail" component={StoreDetailScreen} />
        <Stack.Screen
          name="EnterRecommendationInformation"
          component={EnterStoreRecommendationInformationScreen}
        />
        <Stack.Screen name="KeywordReview" component={KeywordReviewScreen} />
        <Stack.Screen name="WriteReview" component={WriteReviewScreen} />
        <Stack.Screen name="ReviewDetail" component={ReviewDetailScreen} />
        <Stack.Screen name="Recommend" component={RecommendScreen} />
        <Stack.Screen name="Profile" component={ProfileScreen} />
        <Stack.Screen name="EditProfile" component={EditProfileScreen} />
        <Stack.Screen name="MyReview" component={MyReviewListScreen} />
        <Stack.Screen name="DeleteAccount" component={DeleteAccountScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
