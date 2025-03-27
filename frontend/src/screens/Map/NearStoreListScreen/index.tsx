import {useNavigation} from '@react-navigation/native';

import React, {RefObject, useRef} from 'react';
import BottomSheet, {TouchableWithoutFeedback} from '@gorhom/bottom-sheet';
import {ScrollView} from 'react-native-gesture-handler';

import MOCK from './components/StoreBasicInformation/mock';
import StoreBasicInformation from './components/StoreBasicInformation';
import {StoreBasicInformationType} from './components/StoreBasicInformation/types';

import scale from '../../../utils/scale';

import * as S from './styles';

const SNAP_POINTS = [scale(32), '80%'];

const NearStoreListScreen = () => {
  const bottomSheetRef = useRef<BottomSheet>(null);
  const imageCarouselRef = useRef<ScrollView>(null);

  const navigation = useNavigation<any>(); // TODO: 타입 수정

  const handleStorePress = (store: StoreBasicInformationType) => {
    navigation.navigate('StoreDetail', {store: store});
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
          {MOCK.map(store => (
            <TouchableWithoutFeedback
              key={store.storeId}
              onPress={() => handleStorePress(store)}>
              <StoreBasicInformation
                store={store}
                imageCarouselRef={imageCarouselRef}
                isShownBusinessHour={true}
              />
            </TouchableWithoutFeedback>
          ))}
        </S.NearStoreListScreenContainer>
      </S.BottomSheetContent>
    </S.BottomSheetContainer>
  );
};

export default NearStoreListScreen;
