import {Text, TouchableOpacity, View} from 'react-native';
import styled from 'styled-components';
import {GrayColors, SystemColors} from '../../../../../constants/colors';
import {FontStyles} from '../../../../../constants/fonts';
import scale from '../../../../../utils/scale';

export const FamilyReviewContainer = styled(View)`
  display: flex;
  flex-direction: column;
  gap: ${scale(16)}px;
  padding: ${scale(16)}px ${scale(24)}px;
`;

export const Title = styled(Text)`
  ${FontStyles.headingMedium}
  color: ${GrayColors[800]};
`;

export const TitleCaption = styled(Text)`
  ${FontStyles.captionMedium}
  color: ${GrayColors[400]};
`;

export const TitleContainer = styled(View)`
  flex-direction: row;
  align-items: center;
  gap: ${scale(8)}px;
`;

export const ReviewByEmotionSection = styled(View)`
  gap: ${scale(8)}px;
`;

export const EmotionTitle = styled(Text)<{$isPositive: boolean}>`
  ${FontStyles.headingSmall};
  color: ${({$isPositive}) =>
    $isPositive ? SystemColors['success'] : SystemColors['danger']};
`;

export const SummaryText = styled(Text)`
  ${FontStyles.bodySmall};
  font-weight: 700;
  color: ${GrayColors[800]};
`;

export const ReviewTextContainer = styled(View)`
  gap: ${scale(8)}px;
`;

export const ReviewTextButton = styled(TouchableOpacity)``;

export const ReviewText = styled(Text)<{$isPositive: boolean}>`
  padding: ${scale(4)}px ${scale(8)}px;
  background-color: ${GrayColors[100]};
  border-radius: ${scale(5)}px;
  ${FontStyles.captionMedium};
  color: ${({$isPositive}) =>
    $isPositive ? SystemColors['success'] : SystemColors['danger']};
`;
