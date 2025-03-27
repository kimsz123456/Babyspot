import {Text, View} from 'react-native';

import styled from 'styled-components/native';
import BottomSheet, {BottomSheetScrollView} from '@gorhom/bottom-sheet';

import scale from '../../../utils/scale';
import {GrayColors} from '../../../constants/colors';
import {FontStyles} from '../../../constants/fonts';

export const BottomSheetContainer = styled(BottomSheet)`
  z-index: 20;
`;

export const BottomSheetContent = styled(BottomSheetScrollView).attrs({
  showsVerticalScrollIndicator: false,
})``;

export const NearStoreListScreenContainer = styled(View)`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: ${scale(8)}px;
  padding: ${scale(8)}px ${scale(24)}px;
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
  border-top-width: 1px;
  border-top-color: ${GrayColors[200]};
  background-color: ${GrayColors[0]};
  elevation: 1;
`;

export const TopIcon = styled(View)`
  width: ${scale(24)}px;
  height: ${scale(4)}px;
  border-radius: 5px;
  background-color: ${GrayColors[200]};
`;

export const Title = styled(Text)`
  ${FontStyles.headingMedium}
`;
