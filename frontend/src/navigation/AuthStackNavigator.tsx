import React from 'react';
import SignInScreen from '../screens/Onboarding/SignInScreen';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

const AuthStackNavigator = () => {
  const Stack = createNativeStackNavigator();

  return (
    <Stack.Navigator>
      <Stack.Screen
        name="SignIn"
        component={SignInScreen}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
};

export default AuthStackNavigator;
