import React from 'react';

import * as S from './styles';

import {IC_BABY} from '../../../../../constants/icons';

const RecommendButton = () => {
  return (
    <S.RecommendButton>
      <S.BabyIcon source={IC_BABY} />
      <S.RecommendText>추천</S.RecommendText>
    </S.RecommendButton>
  );
};

export default RecommendButton;
