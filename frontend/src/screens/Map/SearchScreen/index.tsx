import React from 'react';
import PlaceSearchButton from '../components/PlaceSearchButton';
import SearchHistory from './components/SearchHistory';
import * as S from './styles';
import NoDataContainer from '../../../components/atoms/NoDataContainer';
import {withDivider} from '../../../utils/withDivider';

const SearchScreen = () => {
  return (
    <S.SearchScreenContainer>
      <S.SearchButtonContainer>
        <PlaceSearchButton />
      </S.SearchButtonContainer>

      <S.SearchHistoryListContainer>
        <S.SearchHistoryListTitle>최근 검색</S.SearchHistoryListTitle>
        <S.SearchHistoryList>
          <NoDataContainer text="서비스 준비 중입니다." />
          {/* {withDivider(
            [
              ...[].map((history, index) => (
                <SearchHistory
                  key={index}
                  address={history.address}
                  date={history.date}
                />
              )),
            ],
            <S.Divider />,
          )} */}
        </S.SearchHistoryList>
      </S.SearchHistoryListContainer>
    </S.SearchScreenContainer>
  );
};

export default SearchScreen;
