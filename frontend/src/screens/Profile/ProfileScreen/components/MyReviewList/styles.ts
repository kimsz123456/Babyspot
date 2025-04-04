import styled from 'styled-components/native';
import {View, Text} from 'react-native';
import scale from '../../../../../utils/scale';
import {GrayColors} from '../../../../../constants/colors';
import {FontStyles} from '../../../../../constants/fonts';

export const ReviewListContainer = styled(View)`
  padding-top: ${scale(24)}px;
  padding-bottom: ${scale(24)}px;
  gap: ${scale(16)}px;
`;

export const EmptyText = styled(Text)`
  ${FontStyles.bodyMedium};
  color: ${GrayColors[700]};
  text-align: center;
  padding: ${scale(48)}px 0px;
`;
