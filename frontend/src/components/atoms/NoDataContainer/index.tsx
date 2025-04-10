import React from 'react';
import * as S from './styles';

const NoDataContainer = ({text}: {text: string}) => {
  return <S.NoReviewText> {text} </S.NoReviewText>;
};

export default NoDataContainer;
