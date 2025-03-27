import React from 'react';

import {useRoute} from '@react-navigation/native';

import StoreBasicInformation from '../NearStoreListScreen/components/StoreBasicInformation';

import * as S from './styles';
import Home from './components/Home';
import MOCK from './mock';

const StoreDetailScreen = () => {
  const route = useRoute<any>(); // TODO: 타입 변경
  const {storeBasicInformation} = route.params;

  return (
    <S.StoreDetailScreenContainer>
      <StoreBasicInformation store={storeBasicInformation} />

      <Home basicInformation={storeBasicInformation} detailInformation={MOCK} />
    </S.StoreDetailScreenContainer>
  );
};

export default StoreDetailScreen;
