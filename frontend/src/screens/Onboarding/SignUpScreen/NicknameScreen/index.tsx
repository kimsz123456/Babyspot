import React from 'react';
import * as S from './styles';
import MainButton from '../../../../components/atoms/Button/MainButton';

const NicknameScreen = () => {
  return (
    <S.SignUpScreenView>
      <S.SingUpInputSection>
        <S.SignUpInputSectionTitle>{`닉네임을 입력해주세요.`}</S.SignUpInputSectionTitle>
      </S.SingUpInputSection>
      <MainButton text={'다음'} />
    </S.SignUpScreenView>
  );
};

export default NicknameScreen;
