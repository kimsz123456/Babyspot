import {View, Text, ScrollView} from 'react-native';

import styled from 'styled-components/native';

import scale from '../../../utils/scale';
import {GrayColors} from '../../../constants/colors';
import {FontStyles} from '../../../constants/fonts';

export const BackGround = styled(ScrollView)`
  flex: 1;
  background-color: ${GrayColors[0]};
`;

export const MyReviewListScreenContainer = styled(View)`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: ${scale(32)}px ${scale(24)}px;
  background-color: ${GrayColors[0]};
`;

export const Divider = styled(View)`
  padding: ${scale(8)}px 0px;
  width: 100%;
`;
