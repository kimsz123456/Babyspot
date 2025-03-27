import React from 'react';
import MainButton from '../../../components/atoms/Button/MainButton';
import * as S from './styles';
import {useOnboardingNavigation} from '../../../hooks/useNavigationHooks';

const SignUpScreen = () => {
  const navigation = useOnboardingNavigation();

  return (
    <S.SignUpScreenView>
      <S.SignUpTextContainer>
        <S.SignUpWelcomeTitle>{`환영합니다!`}</S.SignUpWelcomeTitle>
        <S.SignUpWelcomeSubTitle>{`아래의 버튼을 눌러,\n회원가입을 진행해주세요!`}</S.SignUpWelcomeSubTitle>
      </S.SignUpTextContainer>
      <MainButton
        text={'회원가입'}
        onPress={() => {
          navigation.navigate('Nickname');
        }}
      />
    </S.SignUpScreenView>
  );
};

export default SignUpScreen;
