import {ScrollView, View} from 'react-native';

import styled from 'styled-components/native';
import {NaverMapView} from '@mj-studio/react-native-naver-map';

import scale from '../../../utils/scale';

export const MapScreenContainer = styled(View)`
  flex: 1;
  position: relative;
`;

export const FloatingContainer = styled(View)`
  z-index: 10;
  position: absolute;
  top: ${scale(32)}px;
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: ${scale(16)}px;
`;

export const SearchAndRecommendContainer = styled(View)`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  gap: ${scale(8)}px;
  padding: 0 ${scale(24)}px;
`;

export const ChipContainer = styled(ScrollView)``;

export const NaverMap = styled(NaverMapView)`
  flex: 1;
`;
