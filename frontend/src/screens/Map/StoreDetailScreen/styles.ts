import {ScrollView, View} from 'react-native';

import styled from 'styled-components';

import scale from '../../../utils/scale';
import {GrayColors} from '../../../constants/colors';

export const StoreDetailScreenContainer = styled(ScrollView)`
  flex: 1;
  background-color: ${GrayColors[0]};
`;

export const BasicInformationContainer = styled(View)`
  padding: ${scale(16)}px ${scale(24)}px ${scale(8)}px;
`;
