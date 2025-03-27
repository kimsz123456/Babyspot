import React from 'react';
import * as S from './styles';
import MainButton from '../../../../components/atoms/Button/MainButton';
import {IC_COMPLETE} from '../../../../constants/icons';
import {useGlobalStore} from '../../../../stores/globalStore';

const SignUpCompleteScreen = () => {
  const setIsLoggedIn = useGlobalStore(state => state.setIsLoggedIn);

  return (
    <S.SignUpScreenView>
      <S.SignUpCompleteContainer>
        <S.SignUpCompleteIconImage source={IC_COMPLETE} />
        <S.SignUpCompleteText>{`회원가입이 완료되었습니다!`}</S.SignUpCompleteText>
      </S.SignUpCompleteContainer>
      <MainButton
        text={'시작하기'}
        onPress={() => {
          setIsLoggedIn(true);
        }}
      />
    </S.SignUpScreenView>
  );
};

export default SignUpCompleteScreen;
