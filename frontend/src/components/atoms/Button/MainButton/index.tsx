import React from 'react';
import * as S from './styles';
import MainButtonTextType from './types';

const MainButton = ({text, onPress}: MainButtonTextType) => {
  return (
    <S.MainButtonContainer>
      <S.MainButtonText>{text}</S.MainButtonText>
    </S.MainButtonContainer>
  );
};

export default MainButton;
