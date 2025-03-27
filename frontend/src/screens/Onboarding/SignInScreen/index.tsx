import React from 'react';
import {IC_APP_LOGO, IC_KAKAO_LOGO} from '../../../constants/icons';
import * as S from './styles';
import {kakaoLogin} from '../../../services/onboardingService';
import {KakaoOAuthToken, login} from '@react-native-seoul/kakao-login';
import EncryptedStorage from 'react-native-encrypted-storage';
import {useGlobalStore} from '../../../stores/globalStore';
import {useOnboardingStore} from '../../../stores/onboardingStore';
import {useOnboardingNavigation} from '../../../hooks/useNavigationHooks';
import {useNavigation} from '@react-navigation/native';

const SignInScreen = () => {
  const navigation = useOnboardingNavigation();
  const mapNavigation = useNavigation();

  const signInByKakao = async () => {
    const token: KakaoOAuthToken = await login();

    try {
      const response = await kakaoLogin(token.accessToken);

      useGlobalStore.getState().setAccessToken(response.access_token);
      useOnboardingStore.getState().setTempToken(response.temp_token);
      await EncryptedStorage.setItem('refreshToken', response.refresh_token);

      if (response.access_token == null) {
        navigation.navigate('SignUp');
      } else {
        mapNavigation.navigate('Map');
      }
    } catch (error) {
      return Promise.reject(error);
    }
  };
  return (
    <S.SignInScreenContainer>
      <S.SignInAppLogoImage source={IC_APP_LOGO} />
      <S.BetweenMarginView />
      <S.KakaoLoginButton onPress={signInByKakao}>
        <S.KakaoLogoImage source={IC_KAKAO_LOGO} />
        <S.KakaoLoginButtonText>카카오 로그인</S.KakaoLoginButtonText>
      </S.KakaoLoginButton>
    </S.SignInScreenContainer>
  );
};

export default SignInScreen;
