import React from 'react';
import * as S from './styles';
import {ThinDivider} from '../Divider';
import {IC_DOWN_ARROW} from '../../../constants/icons';

interface MoreButtonWithDividerProps {
  onPressed: () => void;
  isOpened: boolean;
  openedText: string;
  closedText: string;
}

const MoreButtonWithDivider = (props: MoreButtonWithDividerProps) => {
  return (
    <S.MoreButtonContainer onPress={props.onPressed}>
      <ThinDivider />
      <S.MoreButton>
        <S.ButtonText>
          {props.isOpened ? props.openedText : props.closedText}
        </S.ButtonText>
        <S.ArrowIcon source={IC_DOWN_ARROW} $isOpened={props.isOpened} />
      </S.MoreButton>
    </S.MoreButtonContainer>
  );
};

export default MoreButtonWithDivider;
