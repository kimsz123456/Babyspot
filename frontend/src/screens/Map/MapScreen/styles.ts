import {View} from 'react-native';

import styled from 'styled-components/native';
import {NaverMapView} from '@mj-studio/react-native-naver-map';

export const MapScreenContainer = styled(View)`
  flex: 1;
  position: relative;
`;

export const SearchAndRecommendContainer = styled(View)`
  z-index: 10;
  position: absolute;
  top: 32px;
  left: 24px;
  right: 24px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  gap: 8px;
`;

export const NaverMap = styled(NaverMapView)`
  flex: 1;
  padding: 32px 64px;
`;
