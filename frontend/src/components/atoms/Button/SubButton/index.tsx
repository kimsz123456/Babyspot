import React from 'react';
import * as S from './styles';
import SubButtonTextType from './types';

const SubButton = ({text}: SubButtonTextType) => {
  return (
    <S.SubButtonContainer>
      <S.SubButtonText>{text}</S.SubButtonText>
    </S.SubButtonContainer>
  );
};

export default SubButton;
