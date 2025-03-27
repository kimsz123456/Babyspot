import React from 'react';
import * as S from './styles';
import MainButton from '../../../../components/atoms/Button/MainButton';

const ProfileImageScreen = () => {
  return (
    <S.SignUpScreenView>
      <S.SignUpInputSectionTitle>{`프로필 사진을 골라주세요.`}</S.SignUpInputSectionTitle>
      <MainButton text={'다음'} />
    </S.SignUpScreenView>
  );
};

export default ProfileImageScreen;
