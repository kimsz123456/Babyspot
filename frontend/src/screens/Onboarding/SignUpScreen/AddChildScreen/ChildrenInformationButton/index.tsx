import React from 'react';
import {TouchableOpacity} from 'react-native';
import {IC_MINUS, IC_PLUS} from '../../../../../constants/icons';
import * as S from './styles';

interface ChildrenInformationButtonProps {
  year: number;
  currentCount: number;
  onMinusPressed: () => void;
  onPlusPressed: () => void;
}

const ChildrenInformationButton = (props: ChildrenInformationButtonProps) => {
  return (
    <S.ChildrenInformationButtonContainer>
      <S.ChildrenInformationButtonText>{`${props.year}년생`}</S.ChildrenInformationButtonText>
      <S.IconContainer>
        <TouchableOpacity onPress={props.onMinusPressed}>
          <S.IconImage source={IC_MINUS} />
        </TouchableOpacity>
        <S.ChildrenInformationButtonText>
          {props.currentCount}
        </S.ChildrenInformationButtonText>
        <TouchableOpacity onPress={props.onPlusPressed}>
          <S.IconImage source={IC_PLUS} />
        </TouchableOpacity>
      </S.IconContainer>
    </S.ChildrenInformationButtonContainer>
  );
};

export default ChildrenInformationButton;
