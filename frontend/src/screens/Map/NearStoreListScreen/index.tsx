import React, {useRef} from 'react';

import BottomSheet from '@gorhom/bottom-sheet';
import {ScrollView} from 'react-native-gesture-handler';

import MOCK from './components/StoreBasicInformation/mock';
import StoreBasicInformation from './components/StoreBasicInformation';

import scale from '../../../utils/scale';

import * as S from './styles';

const SNAP_POINTS = [scale(32), '80%'];

const NearStoreListScreen = () => {
  const bottomSheetRef = useRef<BottomSheet>(null);
  const imageCarouselRef = useRef<ScrollView>(null);

  return (
    <S.BottomSheetContainer
      ref={bottomSheetRef}
      index={0}
      snapPoints={SNAP_POINTS}
      handleComponent={() => null}
      simultaneousHandlers={imageCarouselRef}>
      <S.BottomSheetContent>
        <S.NearStoreListScreenContainer>
          <S.TopIcon />
          <S.Title>주변 음식점</S.Title>
          {MOCK.map((store, idx) => (
            <StoreBasicInformation
              key={idx}
              store={store}
              imageCarouselRef={imageCarouselRef}
            />
          ))}
        </S.NearStoreListScreenContainer>
      </S.BottomSheetContent>
    </S.BottomSheetContainer>
  );
};

export default NearStoreListScreen;
