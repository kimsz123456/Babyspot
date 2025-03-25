import {View} from 'react-native';

import styled from 'styled-components/native';
import {NaverMapView} from '@mj-studio/react-native-naver-map';

export const MapScreenContainer = styled(View)`
  flex: 1;
  position: relative;
`;

export const NaverMap = styled(NaverMapView)`
  flex: 1;
  padding: 32px 64px;
`;
