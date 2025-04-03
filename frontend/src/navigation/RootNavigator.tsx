import React, {useEffect, useState} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import OnboardingStackNavigator from './OnboardingStackNavigator';
import BottomTabNavigator from './BottomTabNavigator';
import EncryptedStorage from 'react-native-encrypted-storage';
import {getTokenByRefreshToken} from '../services/onboardingService';
import {ActivityIndicator, View} from 'react-native';
import {useGlobalStore} from '../stores/globalStore';
import {getMemberProfile} from '../services/profileService';

const RootNavigator = () => {
  const {
    isLoggedIn,
    setIsLoggedIn,
    accessToken,
    setAccessToken,
    setMemberProfile,
  } = useGlobalStore();

  const [loading, setLoading] = useState(true);
  console.log(accessToken);

  useEffect(() => {
    const checkRefreshToken = async () => {
      try {
        const refreshToken = await EncryptedStorage.getItem('refreshToken');

        if (!refreshToken) {
          setIsLoggedIn(false);
          setLoading(false);
          return;
        }

        const response = await getTokenByRefreshToken();

        setAccessToken(response.accessToken);
        await EncryptedStorage.setItem('refreshToken', response.refreshToken);

        setIsLoggedIn(true);
      } catch (error) {
        setIsLoggedIn(false);
      } finally {
        setLoading(false);
      }
    };

    checkRefreshToken();
  }, []);

  const fetchMemberProfile = async () => {
    if (!isLoggedIn) return;

    try {
      const profile = await getMemberProfile();
      setMemberProfile(profile);
    } catch (error) {
      throw error;
    }
  };

  useEffect(() => {
    fetchMemberProfile();
  }, [isLoggedIn]);

  if (loading) {
    return (
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <NavigationContainer>
      {isLoggedIn ? <BottomTabNavigator /> : <OnboardingStackNavigator />}
    </NavigationContainer>
  );
};

export default RootNavigator;
