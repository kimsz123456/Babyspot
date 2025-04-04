import React from 'react';

import {TouchableWithoutFeedback} from '@gorhom/bottom-sheet';

import {useMapNavigation} from '../../../hooks/useNavigationHooks';

import {StoreBasicInformationType} from '../NearStoreListScreen/components/StoreBasicInformation/types';
import StoreBasicInformation from '../NearStoreListScreen/components/StoreBasicInformation';

import * as S from './styles';

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
        <TouchableWithoutFeedback onPress={handleBottomSheetPress}>
          <StoreBasicInformation store={store} isShownBusinessHour={true} />
        </TouchableWithoutFeedback>
      </S.BottomSheetContent>
    </S.StoreBasicScreenContainer>
  );
};

export default StoreBasicScreen;
