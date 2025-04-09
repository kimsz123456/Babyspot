import React from 'react';

import * as S from './styles';

import {formatDateToString} from '../../../../../utils/format';
import {IC_CLOSE, IC_SEARCH} from '../../../../../constants/icons';

interface SearchHistoryProps {
  address: string;
  date: Date;
}

const SearchHistory = ({address, date}: SearchHistoryProps) => {
  return (
    <S.SearchHistoryContainer>
      <S.Icon source={IC_SEARCH} />
      <S.Address>{address}</S.Address>
      <S.SearchDate>{formatDateToString(date)}</S.SearchDate>
      <S.Icon source={IC_CLOSE} />
    </S.SearchHistoryContainer>
  );
};

export default SearchHistory;
