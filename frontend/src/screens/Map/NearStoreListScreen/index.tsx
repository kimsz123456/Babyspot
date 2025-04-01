import React, {RefObject, useRef} from 'react';

import BottomSheet, {TouchableWithoutFeedback} from '@gorhom/bottom-sheet';
import {ScrollView} from 'react-native-gesture-handler';

import StoreBasicInformation from './components/StoreBasicInformation';
import {StoreBasicInformationType} from './components/StoreBasicInformation/types';

import {useMapNavigation} from '../../../hooks/useNavigationHooks';

import scale from '../../../utils/scale';

import * as S from './styles';
import NoContent from './components/NoContent';

const SNAP_POINTS = [scale(32), '80%'];

interface NearStoreListScreenProps {
  stores: StoreBasicInformationType[];
}

const NearStoreListScreen = ({stores}: NearStoreListScreenProps) => {
  const bottomSheetRef = useRef<BottomSheet>(null);
  const imageCarouselRef = useRef<ScrollView>(null);

  const navigation = useMapNavigation();

  const handleStorePress = (store: StoreBasicInformationType) => {
    navigation.navigate('StoreDetail', {storeBasicInformation: store});
  };

  return (
    <S.BottomSheetContainer
      ref={bottomSheetRef}
      index={0}
      snapPoints={SNAP_POINTS}
      handleComponent={() => null}
      simultaneousHandlers={
        imageCarouselRef as unknown as RefObject<ScrollView>
      }>
      <S.BottomSheetContent>
        <S.NearStoreListScreenContainer>
          <S.TopIcon />
          <S.Title>주변 음식점</S.Title>
          {stores.length == 0 ? (
            <NoContent />
          ) : (
            stores.map(store => (
              <TouchableWithoutFeedback
                key={store.storeId}
                onPress={() => handleStorePress(store)}>
                <StoreBasicInformation
                  store={store}
                  imageCarouselRef={imageCarouselRef}
                  isShownBusinessHour={true}
                />
              </TouchableWithoutFeedback>
            ))
          )}
        </S.NearStoreListScreenContainer>
      </S.BottomSheetContent>
    </S.BottomSheetContainer>
  );
};

export default NearStoreListScreen;
