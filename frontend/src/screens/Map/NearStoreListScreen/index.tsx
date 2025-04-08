import React, {Ref, RefObject, useRef} from 'react';

import BottomSheet, {TouchableWithoutFeedback} from '@gorhom/bottom-sheet';
import {ScrollView} from 'react-native-gesture-handler';

import {useMapStore} from '../../../stores/mapStore';

import StoreBasicInformation from './components/StoreBasicInformation';
import NoContent from './components/NoContent';
import {useMapNavigation} from '../../../hooks/useNavigationHooks';

import scale from '../../../utils/scale';

import * as S from './styles';

const SNAP_POINTS = [scale(32), scale(280), '80%'];

interface NearStoreListScreenProps {
  bottomSheetRef: Ref<BottomSheet>;
}

const NearStoreListScreen = ({bottomSheetRef}: NearStoreListScreenProps) => {
  const imageCarouselRef = useRef<ScrollView>(null);

  const navigation = useMapNavigation();
  const {selectedAges, filteredStoreBasicInformation, setSelectedStoreIndex} =
    useMapStore();

  const handleStorePress = (idx: number) => {
    setSelectedStoreIndex(idx);
    navigation.navigate('StoreDetail');
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
          <S.Title>
            {selectedAges.length > 0 ? '추천 음식점' : '주변 음식점'}
          </S.Title>
          {filteredStoreBasicInformation.length === 0 ? (
            <NoContent />
          ) : (
            filteredStoreBasicInformation.map((store, idx) => (
              <TouchableWithoutFeedback
                key={store.storeId}
                onPress={() => handleStorePress(idx)}>
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
