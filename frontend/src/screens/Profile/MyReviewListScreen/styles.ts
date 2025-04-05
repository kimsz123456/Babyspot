import {FlatList, View} from 'react-native';

import styled from 'styled-components/native';

import scale from '../../../utils/scale';
import {GrayColors} from '../../../constants/colors';
import {ReviewType} from '../../../services/reviewService';

export const BackGround = styled(View)`
  flex: 1;
  background-color: ${GrayColors[0]};
`;

export const Wrapper = styled(FlatList<ReviewType>)`
  padding: ${scale(32)}px ${scale(24)}px;
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

export const LoadingContainer = styled.View`
  padding: 20px;
  align-items: center;
`;
