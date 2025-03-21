import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

import SplashScreen from './src/pages/Onboarding/SplashScreen';
import SignInScreen from './src/pages/Onboarding/SignInScreen';
import SignUpScreen from './src/pages/Onboarding/SignUpScreen';

import MapScreen from './src/pages/Map/MapScreen';
import SearchScreen from './src/pages/Map/SearchScreen';
import StoreDetailScreen from './src/pages/Map/StoreDetailScreen';
import EnterStoreRecommendationInformationScreen from './src/pages/Map/EnterStoreRecommendationInformationScreen';
import KeywordReviewScreen from './src/pages/Map/KeywordReviewScreen';
import WriteReviewScreen from './src/pages/Map/WriteReviewScreen';
import ReviewDetailScreen from './src/pages/Map/ReviewDetailScreen';

import RecommendScreen from './src/pages/Recommend/RecommendScreen';

import ProfileScreen from './src/pages/Profile/ProfileScreen';
import EditProfileScreen from './src/pages/Profile/EditProfileScreen';
import MyReviewListScreen from './src/pages/Profile/MyReviewListScreen';
import DeleteAccountScreen from './src/pages/Profile/DeleteAccountScreen';

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
