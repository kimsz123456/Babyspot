import React from 'react';

import {StoreBasicInformationType} from '../NearStoreListScreen/components/StoreBasicInformation/types';

import * as S from './styles';
import SelectedStoreBasicCard from '../NearStoreListScreen/components/SelectedStoreBasicCard';

interface StoreBasicScreenProps {
  store: StoreBasicInformationType;
}

const StoreBasicScreen = ({store}: StoreBasicScreenProps) => {
  return (
    <S.StoreBasicScreenContainer handleComponent={() => null}>
      <S.BottomSheetContent>
        <S.TopIcon />
        <SelectedStoreBasicCard store={store} />
      </S.BottomSheetContent>
    </S.StoreBasicScreenContainer>
  );
};

export default StoreBasicScreen;
