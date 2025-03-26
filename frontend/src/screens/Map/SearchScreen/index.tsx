import React from 'react';
import {View} from 'react-native';

import PlaceSearchButton from '../components/PlaceSearchButton';
import SearchHistory from './components/SearchHistory';

import * as S from './styles';

const MOCK = [
  {
    address: '구이구이 3번로 2길 20-11 샤샤샤샤샤샤',
    date: new Date('2024-03-02'),
  },
  {
    address: '구이구이 3번로 2길 20-11',
    date: new Date('2024-03-02'),
  },
  {
    address: '구이구이 3번로 2길 20-11',
    date: new Date('2024-03-02'),
  },
  {
    address: '구이구이 3번로 2길 20-11',
    date: new Date('2024-03-02'),
  },
  {
    address: '구이구이 3번로 2길 20-11',
    date: new Date('2024-03-02'),
  },
];

const SearchScreen = () => {
  return (
    <S.SearchScreenContainer>
      <S.SearchButtonContainer>
        <PlaceSearchButton />
      </S.SearchButtonContainer>

      <S.SearchHistoryListContainer>
        <S.SearchHistoryListTitle>최근 검색</S.SearchHistoryListTitle>
        <S.SearchHistoryList>
          {MOCK.map((history, idx) => (
            <View key={idx}>
              {idx > 0 && <S.Divider />}
              <SearchHistory address={history.address} date={history.date} />
            </View>
          ))}
        </S.SearchHistoryList>
      </S.SearchHistoryListContainer>
    </S.SearchScreenContainer>
  );
};

export default SearchScreen;
