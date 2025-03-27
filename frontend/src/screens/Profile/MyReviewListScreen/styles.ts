import {Text, View} from 'react-native';

import styled from 'styled-components/native';

import scale from '../../../utils/scale';
import {GrayColors} from '../../../constants/colors';

export const MyReviewListScreenContainer = styled(View)`
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
