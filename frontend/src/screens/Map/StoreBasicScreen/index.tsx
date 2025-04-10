import React from 'react';

import * as S from './styles';
import SelectedStoreBasicCard from '../NearStoreListScreen/components/SelectedStoreBasicCard';

const StoreBasicScreen = () => {
  return (
    <S.StoreBasicScreenContainer handleComponent={() => null}>
      <S.BottomSheetContent>
        <S.TopIcon />
        <SelectedStoreBasicCard />
      </S.BottomSheetContent>
    </S.StoreBasicScreenContainer>
  );
};

export default StoreBasicScreen;
