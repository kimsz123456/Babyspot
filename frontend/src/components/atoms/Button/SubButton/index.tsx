import React from 'react';
import * as S from './styles';
import SubButtonTextType from './types';
import {PrimaryColors} from '../../../../constants/colors';

const SubButton = ({
  text,
  color = PrimaryColors[500],
  onPress,
}: SubButtonTextType) => {
  return (
    <S.SubButtonContainer onPress={onPress} $color={color}>
      <S.SubButtonText $color={color}>{text}</S.SubButtonText>
    </S.SubButtonContainer>
  );
};

export default SubButton;
