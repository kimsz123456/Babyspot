import React from 'react';

import {useRoute} from '@react-navigation/native';

import StoreBasicInformation from '../NearStoreListScreen/components/StoreBasicInformation';
import Home from './components/Home';
import Menu from './components/Menu';
import {ThickDivider} from '../../../components/atoms/Divider';

import MOCK from './mock';

import * as S from './styles';

const StoreDetailScreen = () => {
  const route = useRoute<any>(); // TODO: 타입 변경
  const {storeBasicInformation} = route.params;

  return (
    <S.StoreDetailScreenContainer>
      <S.BasicInformationContainer>
        <StoreBasicInformation store={storeBasicInformation} />
      </S.BasicInformationContainer>

      <Home basicInformation={storeBasicInformation} detailInformation={MOCK} />
      <ThickDivider />
      <Menu label="메뉴" menus={MOCK.menus} />
    </S.StoreDetailScreenContainer>
  );
};

export default StoreDetailScreen;
