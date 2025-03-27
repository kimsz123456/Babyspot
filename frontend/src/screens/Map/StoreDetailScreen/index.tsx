import React, {useState} from 'react';

import {useRoute} from '@react-navigation/native';

import StoreBasicInformation from '../NearStoreListScreen/components/StoreBasicInformation';
import Home from './components/Home';
import Menu from './components/Menu';
import {ThickDivider} from '../../../components/atoms/Divider';

import MOCK from './mock';

import * as S from './styles';

const TAB_NAMES = ['홈', '메뉴', '키워드', '리뷰'];

const StoreDetailScreen = () => {
  const [selectedTab, setSelectedTab] = useState(0);

  const route = useRoute<any>(); // TODO: 타입 변경
  const {storeBasicInformation} = route.params;

  const handleTabPress = (idx: number) => {
    setSelectedTab(idx);
  };

  return (
    <S.StoreDetailScreenContainer>
      <S.BasicInformationContainer>
        <StoreBasicInformation store={storeBasicInformation} />
      </S.BasicInformationContainer>

      <S.TabBar>
        {TAB_NAMES.map((name, idx) => (
          <S.TabContainer
            key={idx}
            onPress={() => handleTabPress(idx)}
            $isSelected={selectedTab === idx ? true : false}>
            <S.TabName $isSelected={selectedTab === idx ? true : false}>
              {name}
            </S.TabName>
          </S.TabContainer>
        ))}
      </S.TabBar>

      <Home basicInformation={storeBasicInformation} detailInformation={MOCK} />
      <ThickDivider />
      <Menu label="메뉴" menus={MOCK.menus} />
    </S.StoreDetailScreenContainer>
  );
};

export default StoreDetailScreen;
