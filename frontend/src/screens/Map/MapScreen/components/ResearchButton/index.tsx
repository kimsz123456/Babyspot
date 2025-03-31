import React from 'react';
import {GestureResponderEvent} from 'react-native';

import {IC_RETRY} from '../../../../../constants/icons';

import * as S from './styles';

interface ResearchButtonProps {
  onPress: (e: GestureResponderEvent) => void;
}

const ResearchButton = ({onPress}: ResearchButtonProps) => {
  return (
    <S.ResearchButton onPress={onPress}>
      <S.RetryIcon source={IC_RETRY} />
      <S.ResearchText>이 지역 재검색</S.ResearchText>
    </S.ResearchButton>
  );
};

export default ResearchButton;
