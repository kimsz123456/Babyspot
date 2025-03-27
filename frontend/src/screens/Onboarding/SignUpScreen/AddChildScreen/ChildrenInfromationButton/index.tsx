import React from 'react';
import {TouchableOpacity} from 'react-native';
import {IC_MINUS, IC_PLUS} from '../../../../../constants/icons';
import * as S from './styles';

interface ChildrenInfromationButtonProps {
  year: number;
  currentCount: number;
  onMinusPressed: () => void;
  onPlusPressed: () => void;
}

const ChildrenInfromationButton = (props: ChildrenInfromationButtonProps) => {
  return (
    <S.ChildrenInfromationButtonContainer>
      <S.ChildrenInfromationButtonText>{`${props.year}년생`}</S.ChildrenInfromationButtonText>
      <S.IconContainer>
        <TouchableOpacity onPress={props.onMinusPressed}>
          <S.IconImage source={IC_MINUS} />
        </TouchableOpacity>
        <S.ChildrenInfromationButtonText>
          {props.currentCount}
        </S.ChildrenInfromationButtonText>
        <TouchableOpacity onPress={props.onPlusPressed}>
          <S.IconImage source={IC_PLUS} />
        </TouchableOpacity>
      </S.IconContainer>
    </S.ChildrenInfromationButtonContainer>
  );
};

export default ChildrenInfromationButton;
