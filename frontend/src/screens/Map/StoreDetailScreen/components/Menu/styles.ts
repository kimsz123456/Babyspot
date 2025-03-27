import {Image, Text, TouchableOpacity, View} from 'react-native';

import styled from 'styled-components/native';

import scale from '../../../../../utils/scale';
import {FontStyles} from '../../../../../constants/fonts';
import {GrayColors} from '../../../../../constants/colors';

export const MenuContainer = styled(View)`
  display: flex;
  flex-direction: column;
  gap: ${scale(8)}px;
  padding: ${scale(24)}px ${scale(16)}px;
`;

export const Title = styled(Text)`
  ${FontStyles.headingMedium}
  color: ${GrayColors[800]};
`;

export const MenuListContainer = styled(View)`
  display: flex;
  flex-direction: column;
`;

export const LineContainer = styled(View)`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: ${scale(8)}px 0;
`;

export const BasicText = styled(Text)`
  ${FontStyles.bodyMedium}
  line-height: ${scale(28)}px;
  color: ${GrayColors[800]};
`;

export const BoldText = styled(Text)`
  font-weight: 700;
`;

export const MoreButtonContainer = styled(TouchableOpacity)`
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: ${scale(32)}px;
`;

export const MoreButton = styled(View)`
  position: absolute;
  display: flex;
  flex-direction: row;
  gap: ${scale(8)}px;
  padding: ${scale(8)}px ${scale(16)}px;
  border-radius: 100px;
  background-color: ${GrayColors[100]};
`;

export const ButtonText = styled(Text)`
  ${FontStyles.captionMedium}
  color: ${GrayColors[700]};
`;

export const ArrowIcon = styled(Image)<{$isMenuOpened: boolean}>`
  width: ${scale(16)}px;
  height: ${scale(16)}px;

  transform: ${({$isMenuOpened}) =>
    $isMenuOpened ? 'rotate(180deg)' : 'rotate(0deg)'};
`;
