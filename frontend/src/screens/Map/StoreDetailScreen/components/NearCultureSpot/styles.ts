import {Image, Pressable, Text, View} from 'react-native';
import styled from 'styled-components';
import scale from '../../../../../utils/scale';
import {FontStyles} from '../../../../../constants/fonts';
import {GrayColors} from '../../../../../constants/colors';

export const NearCultureSpotContainer = styled(View)`
  padding: ${scale(16)}px ${scale(24)}px;
  flex-direction: column;
  gap: ${scale(16)}px;
`;

export const TitleContainer = styled(View)`
  flex-direction: column;
  gap: ${scale(4)}px;
`;

export const Title = styled(Text)`
  ${FontStyles.headingMedium};
  color: ${GrayColors[800]};
`;

export const Caption = styled(Text)`
  ${FontStyles.captionMedium};
  color: ${GrayColors[400]};
`;

export const SpotCardListContainer = styled(View)`
  gap: ${scale(8)}px;
`;

export const SpotCardContainer = styled(Pressable)`
  flex-direction: row;
  align-items: center;
  border: 1px solid ${GrayColors[300]};
  border-radius: 10px;
  padding: ${scale(8)}px;
  height: ${scale(80)}px;
  gap: ${scale(8)}px;
`;

export const CategoryTypeContainer = styled(View)`
  width: ${scale(64)}px;
  height: ${scale(64)}px;
`;

export const CardCategoryText = styled(Text)`
  ${FontStyles.captionSmall};
  color: ${GrayColors[700]};
`;

export const CategoryIconContainer = styled(View)`
  flex: 1;
  align-items: center;
  justify-content: center;
`;

export const CategoryIcon = styled(Image)`
  width: ${scale(24)}px;
  height: ${scale(24)}px;
`;

export const CardBodyContainer = styled(View)`
  flex: 1;
  height: 100%;
  justify-content: space-between;
`;

export const CardTitle = styled(Text)`
  ${FontStyles.bodySmall};
  color: ${GrayColors[800]};
  font-weight: 700;
`;

export const CardDistanceText = styled(Text)`
  ${FontStyles.captionMedium};
  color: ${GrayColors[700]};
`;

export const ArrowIcon = styled(Image)`
  width: ${scale(24)}px;
  height: ${scale(24)}px;
`;
