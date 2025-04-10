import {ScrollView, Text, TouchableOpacity, View} from 'react-native';
import styled from 'styled-components';
import scale from '../../../utils/scale';
import {GrayColors} from '../../../constants/colors';
import {FontStyles} from '../../../constants/fonts';

export const StoreDetailScreenContainer = styled(ScrollView)`
  flex: 1;
  background-color: ${GrayColors[0]};
`;

export const BasicInformationContainer = styled(View)`
  padding: ${scale(16)}px ${scale(24)}px 0px ${scale(24)}px;
`;

export const TabBarWrapper = styled(View)`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  background-color: white;
  z-index: 100;
`;

export const TabBar = styled(View)`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  border-top-width: 1px;
  border-bottom-width: 1px;
  border-top-color: ${GrayColors[200]};
  border-bottom-color: ${GrayColors[200]};
  padding: 0px ${scale(24)}px;
  background-color: white;
`;

export const TabContainer = styled(TouchableOpacity)<{$isSelected: boolean}>`
  padding: ${scale(8)}px 0px;
  border-bottom-width: ${({$isSelected}) => ($isSelected ? '2px' : '0px')};
  border-bottom-color: ${({$isSelected}) =>
    $isSelected ? GrayColors[800] : 'transparent'};
`;

export const TabName = styled(Text)<{$isSelected: boolean}>`
  ${FontStyles.bodyMedium}
  color: ${({$isSelected}) =>
    $isSelected ? GrayColors[800] : GrayColors[300]};
  text-align: center;
`;
