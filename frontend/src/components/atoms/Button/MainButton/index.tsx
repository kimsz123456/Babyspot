import React from 'react';
import * as S from './styles';
import MainButtonTextType from './types';

const MainButton = ({text, onPress, disabled}: MainButtonTextType) => {
  return (
    <S.MainButtonContainer disabled={disabled} onPress={onPress}>
      <S.MainButtonText disabled={disabled}>{text}</S.MainButtonText>
    </S.MainButtonContainer>
  );
};

export default MainButton;
