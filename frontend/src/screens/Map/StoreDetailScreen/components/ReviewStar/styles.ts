import {Pressable, Text, View} from 'react-native';
import styled from 'styled-components';
import scale from '../../../../../utils/scale';
import {FontStyles} from '../../../../../constants/fonts';
import {GrayColors} from '../../../../../constants/colors';

export const ReviewStarContainer = styled(Pressable)`
  display: flex;
  flex-direction: column;
  gap: ${scale(24)}px;
  padding: ${scale(24)}px;
`;

export const ReviewTextContainer = styled(View)``;

export const ReviewText = styled(Text)`
  ${FontStyles.bodyMedium};
  color: ${GrayColors[800]};
  text-align: center;
`;

export const ReviewStarText = styled(Text)`
  ${FontStyles.bodySmall};
  color: ${GrayColors[800]};
  text-align: center;
`;

export const StarContainer = styled(View)`
  align-items: center;
`;
