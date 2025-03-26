import React, {useRef} from 'react';

import BottomSheet from '@gorhom/bottom-sheet';

import MOCK from './components/StoreBasicInformation/mock';
import StoreBasicInformation from './components/StoreBasicInformation';

import scale from '../../../utils/scale';

import * as S from './styles';

const SNAP_POINTS = [scale(32), '80%'];

const NearStoreListScreen = () => {
  const bottomSheetRef = useRef<BottomSheet>(null);

  return (
    <S.BottomSheetContainer
      ref={bottomSheetRef}
      index={0}
      snapPoints={SNAP_POINTS}
      enablePanDownToClose={false}
      handleComponent={() => null}>
      <S.BottomSheetScrollContent showsVerticalScrollIndicator={false}>
        <S.NearStoreListScreenContainer>
          <S.TopIcon />
          <S.Title>주변 음식점</S.Title>
          {MOCK.map((store, idx) => (
            <StoreBasicInformation key={idx} store={store} />
          ))}
        </S.NearStoreListScreenContainer>
      </S.BottomSheetScrollContent>
    </S.BottomSheetContainer>
  );
};

export default NearStoreListScreen;
