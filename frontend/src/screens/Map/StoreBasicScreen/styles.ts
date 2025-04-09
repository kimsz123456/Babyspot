import {View} from 'react-native';

import BottomSheet, {BottomSheetView} from '@gorhom/bottom-sheet';
import styled from 'styled-components/native';

import scale from '../../../utils/scale';
import {GrayColors} from '../../../constants/colors';

export const StoreBasicScreenContainer = styled(BottomSheet)`
  z-index: 20;
`;

export const BottomSheetContent = styled(BottomSheetView)`
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
`;

export const TopIcon = styled(View)`
  width: ${scale(24)}px;
  height: ${scale(4)}px;
  border-radius: 5px;
  background-color: ${GrayColors[200]};
`;
