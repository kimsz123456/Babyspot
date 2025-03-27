import {View} from 'react-native';

import styled from 'styled-components';

import scale from '../../../utils/scale';
import {GrayColors} from '../../../constants/colors';

export const StoreDetailScreenContainer = styled(View)`
  flex: 1;
  padding: ${scale(24)}px;
  background-color: ${GrayColors[0]};
`;
