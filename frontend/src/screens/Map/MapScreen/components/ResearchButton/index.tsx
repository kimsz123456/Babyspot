import React from 'react';

import {IC_RETRY} from '../../../../../constants/icons';

import * as S from './styles';

const ResearchButton = () => {
  return (
    <S.ResearchButton>
      <S.RetryIcon source={IC_RETRY} />
      <S.ResearchText>이 지역 재검색</S.ResearchText>
    </S.ResearchButton>
  );
};

export default ResearchButton;
