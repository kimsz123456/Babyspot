import React from 'react';

import {TouchableOpacity} from '@gorhom/bottom-sheet';

import {StoreBasicInformationType} from '../NearStoreListScreen/components/StoreBasicInformation/types';
import StoreBasicInformation from '../NearStoreListScreen/components/StoreBasicInformation';

import * as S from './styles';
import {useMapNavigation} from '../../../hooks/useNavigationHooks';

interface StoreBasicScreenProps {
  store: StoreBasicInformationType;
}

const StoreBasicScreen = ({store}: StoreBasicScreenProps) => {
  const navigation = useMapNavigation();

  const handleBottomSheetPress = () => {
    navigation.navigate('StoreDetail', {storeBasicInformation: store});
  };

  return (
    <S.StoreBasicScreenContainer handleComponent={() => null}>
      <S.BottomSheetContent>
        <S.TopIcon />
        <TouchableOpacity onPress={handleBottomSheetPress}>
          <StoreBasicInformation store={store} isShownBusinessHour={true} />
        </TouchableOpacity>
      </S.BottomSheetContent>
    </S.StoreBasicScreenContainer>
  );
};

export default StoreBasicScreen;
