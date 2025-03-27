import React from 'react';

import {useRoute} from '@react-navigation/native';

import StoreBasicInformation from '../NearStoreListScreen/components/StoreBasicInformation';

import * as S from './styles';

const StoreDetailScreen = () => {
  const route = useRoute<any>(); // TODO: 타입 변경
  const {storeBasicInformation} = route.params;

  return (
    <S.StoreDetailScreenContainer>
      <StoreBasicInformation store={storeBasicInformation} />
    </S.StoreDetailScreenContainer>
  );
};

export default StoreDetailScreen;
