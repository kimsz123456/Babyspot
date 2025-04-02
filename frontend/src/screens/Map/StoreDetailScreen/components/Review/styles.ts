import {Image, Text, View} from 'react-native';
import styled from 'styled-components';
import scale from '../../../../../utils/scale';
import {FontStyles} from '../../../../../constants/fonts';
import {GrayColors, PrimaryColors} from '../../../../../constants/colors';

export const ReviewContainer = styled(View)`
  display: flex;
  flex-direction: column;
  gap: ${scale(16)}px;
  padding: ${scale(16)}px ${scale(24)}px;
`;

export const TitleHeaderContainer = styled(View)`
  flex-direction: row;
  align-items: center;
  gap: ${scale(16)}px;
  justify-content: space-between;
`;

export const TitleInformationContainer = styled(View)`
  flex-direction: row;
  align-items: center;
  gap: ${scale(4)}px;
`;

export const InformationListContainer = styled(View)`
  flex-direction: row;
  align-items: center;
  gap: ${scale(8)}px;
`;

export const InformationContainer = styled(View)`
  flex-direction: row;
  align-items: center;
`;

export const InformationIconImage = styled(Image)`
  width: ${scale(16)}px;
  height: ${scale(16)}px;
`;

export const InformationText = styled(Text)<{$isStar: boolean}>`
  color: ${({$isStar}) => ($isStar ? PrimaryColors[500] : GrayColors[800])};
  ${FontStyles.captionMedium};
`;

export const Title = styled(Text)`
  ${FontStyles.headingMedium}
  color: ${GrayColors[800]};
`;

export const FilterIconImage = styled(Image)`
  width: ${scale(24)}px;
  height: ${scale(24)}px;
`;

export const ReviewCardListContainer = styled(View)`
  gap: ${scale(8)}px;
`;

export const NoReviewText = styled(Text)`
  text-align: center;
  padding: ${scale(20)}px;
  color: ${GrayColors[500]};
`;
