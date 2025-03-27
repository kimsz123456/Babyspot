import React from 'react';
import SignInScreen from '../screens/Onboarding/SignInScreen';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import SignUpScreen from '../screens/Onboarding/SignUpScreen';
import NicknameScreen from '../screens/Onboarding/SignUpScreen/NicknameScreen';
import ProfileImageScreen from '../screens/Onboarding/SignUpScreen/ProfileImageScreen';
import AddChildScreen from '../screens/Onboarding/SignUpScreen/AddChildScreen';
import SignUpCompleteScreen from '../screens/Onboarding/SignUpScreen/SignUpCompleteScreen';

export type OnboardingStackParamList = {
  SignIn: undefined;
  SignUp: undefined;
  Nickname: undefined;
  ProfileImage: undefined;
  AddChild: undefined;
  SignUpComplete: undefined;
};

const OnboardingStackNavigator = () => {
  const Stack = createNativeStackNavigator<OnboardingStackParamList>();

  return (
    <Stack.Navigator>
      <Stack.Screen
        name="SignIn"
        component={SignInScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="SignUp"
        component={SignUpScreen}
        options={{title: ''}}
      />
      <Stack.Screen
        name="Nickname"
        component={NicknameScreen}
        options={{title: ''}}
      />
      <Stack.Screen
        name="ProfileImage"
        component={ProfileImageScreen}
        options={{title: ''}}
      />
      <Stack.Screen
        name="AddChild"
        component={AddChildScreen}
        options={{title: ''}}
      />
      <Stack.Screen
        name="SignUpComplete"
        component={SignUpCompleteScreen}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
};

export default OnboardingStackNavigator;
