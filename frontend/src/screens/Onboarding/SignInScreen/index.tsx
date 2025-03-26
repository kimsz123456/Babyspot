import React from 'react';
import {IC_APP_LOGO, IC_KAKAO_LOGO} from '../../../constants/icons';
import * as S from './styles';

const SignInScreen = () => {
  return (
    <S.SignInScreenContainer>
      <S.SignInAppLogoImage source={IC_APP_LOGO} />
      <S.BetweenMarginView />
      <S.KakaoLoginButton onPress={() => {}}>
        <S.KakaoLogoImage source={IC_KAKAO_LOGO} />
        <S.KakaoLoginButtonText>카카오 로그인</S.KakaoLoginButtonText>
      </S.KakaoLoginButton>
    </S.SignInScreenContainer>
  );
};

export default SignInScreen;
