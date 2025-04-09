import React from 'react';
import * as S from './styles';
import SubButtonTextType from './types';
import {PrimaryColors} from '../../../../constants/colors';

const SubButton = ({
  text,
  color = PrimaryColors[500],
  onPress,
  disabled,
}: SubButtonTextType) => {
  return (
    <S.SubButtonContainer onPress={onPress} $disabled={disabled} $color={color}>
      <S.SubButtonText $color={color} $disabled={disabled}>
        {text}
      </S.SubButtonText>
    </S.SubButtonContainer>
  );
};

export default SubButton;
