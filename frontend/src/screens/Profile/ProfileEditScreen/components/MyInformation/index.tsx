import React from 'react';
import * as S from './styles';
import {ThinDivider} from '../../../../../components/atoms/Divider';

const MyInformation = () => {
  const nickName = '감귤하우스';
  const email = 'workinghangyu@gmail.com';
  return (
    <S.InformationContainer>
      <S.NicknameContainer>
        <S.NicknameTitle>닉네임</S.NicknameTitle>
        <S.Nickname>{nickName}</S.Nickname>
        <ThinDivider />
      </S.NicknameContainer>
    </S.InformationContainer>
  );
};

export default MyInformation;
