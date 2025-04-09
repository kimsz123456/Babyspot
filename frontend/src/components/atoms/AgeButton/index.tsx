import React from 'react';
import * as S from './styles';
import {
  IC_NON_BORDER_AGE_1,
  IC_NON_BORDER_AGE_2,
  IC_NON_BORDER_AGE_3,
  IC_NON_BORDER_AGE_4,
  IC_NON_BORDER_AGE_5,
  IC_NON_BORDER_AGE_6,
  IC_NON_BORDER_AGE_7,
} from '../../../constants/icons';

interface AgeButtonProps {
  age: number;
  isSelected: boolean;
  onPressed: () => void;
}
const AgeButton = ({age, isSelected, onPressed}: AgeButtonProps) => {
  let imageSource;

  switch (age) {
    case 1:
      imageSource = IC_NON_BORDER_AGE_1;
      break;
    case 2:
      imageSource = IC_NON_BORDER_AGE_2;
      break;
    case 3:
      imageSource = IC_NON_BORDER_AGE_3;
      break;
    case 4:
      imageSource = IC_NON_BORDER_AGE_4;
      break;
    case 5:
      imageSource = IC_NON_BORDER_AGE_5;
      break;
    case 6:
      imageSource = IC_NON_BORDER_AGE_6;
      break;
    case 7:
      imageSource = IC_NON_BORDER_AGE_7;
      break;

    default:
      imageSource = IC_NON_BORDER_AGE_1;
      break;
  }
  return (
    <S.IconButtonContainer $isSelected={isSelected} onPress={onPressed}>
      <S.IconImage source={imageSource} />
      <S.IconText $isSelected={isSelected}>{`${age}세`}</S.IconText>
    </S.IconButtonContainer>
  );
};

export default AgeButton;
