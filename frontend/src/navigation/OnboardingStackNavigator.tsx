import React from 'react';
import SignInScreen from '../screens/Onboarding/SignInScreen';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import SignUpScreen from '../screens/Onboarding/SignUpScreen';

export type OnboardingStackParamList = {
  SignIn: undefined;
  SignUp: undefined;
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
    </Stack.Navigator>
  );
};

export default OnboardingStackNavigator;
