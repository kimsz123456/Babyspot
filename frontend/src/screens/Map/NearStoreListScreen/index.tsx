import React from 'react';

import MOCK from './components/StoreBasicInformation/mock';
import StoreBasicInformation from './components/StoreBasicInformation';

import * as S from './styles';

const NearStoreListScreen = () => {
  return (
    <S.NearStoreListScreenContainer>
      <S.TopIcon />
      <S.Title>주변 음식점</S.Title>
      {MOCK.map((store, idx) => (
        <StoreBasicInformation key={idx} store={store} />
      ))}
    </S.NearStoreListScreenContainer>
  );
};

export default NearStoreListScreen;
