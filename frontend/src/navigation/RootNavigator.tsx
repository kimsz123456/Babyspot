import React, {useEffect, useState} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import OnboardingStackNavigator from './OnboardingStackNavigator';
import BottomTabNavigator from './BottomTabNavigator';
import EncryptedStorage from 'react-native-encrypted-storage';
import {getTokenByRefreshToken} from '../services/onboardingService';
import {ActivityIndicator, View} from 'react-native';
import {useGlobalStore} from '../stores/globalStore';

const RootNavigator = () => {
  const [refreshTokenAlived, setRefreshTokenAlived] = useState<boolean | null>(
    null,
  );

  useEffect(() => {
    const checkRefreshToken = async () => {
      try {
        const refreshToken = await EncryptedStorage.getItem('refreshToken');

        if (!refreshToken) {
          setRefreshTokenAlived(false);
          return;
        }

        const response = await getTokenByRefreshToken();

        useGlobalStore.getState().setAccessToken(response.accessToken);
        await EncryptedStorage.setItem('refreshToken', response.refreshToken);

        setRefreshTokenAlived(true);
      } catch (error) {
        setRefreshTokenAlived(false);

        Promise.reject(error);
      }
    };

    checkRefreshToken();
  }, []);

  if (refreshTokenAlived === null) {
    return (
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <NavigationContainer>
      {refreshTokenAlived ? (
        <BottomTabNavigator />
      ) : (
        <OnboardingStackNavigator />
      )}
    </NavigationContainer>
  );
};

export default RootNavigator;
