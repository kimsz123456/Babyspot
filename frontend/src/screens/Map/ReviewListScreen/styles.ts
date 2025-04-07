import styled from 'styled-components/native';
import {View, Image, Text} from 'react-native';
import {GrayColors} from '../../../constants/colors';
import {FontStyles} from '../../../constants/fonts';
import scale from '../../../utils/scale';

export const ReviewListScreenContainer = styled(View)`
  flex: 1;
  background-color: ${GrayColors[0]};
`;

export const ReviewListScreenScrollView = styled.ScrollView`
  flex: 1;
  background-color: ${GrayColors[0]};
`;

export const ReviewContainer = styled(View)`
  flex: 1;
  background-color: ${GrayColors[0]};
`;

export const TitleHeaderContainer = styled(View)`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-bottom: ${scale(24)}px;
`;

export const TitleInformationContainer = styled(View)`
  flex-direction: row;
  gap: ${scale(8)}px;
`;

export const Title = styled(Text)`
  ${FontStyles.headingMedium}
  color: ${GrayColors[900]};
`;

export const InformationListContainer = styled(View)`
  flex-direction: row;
  gap: ${scale(16)}px;
`;

export const InformationContainer = styled(View)`
  flex-direction: row;
  align-items: center;
  gap: ${scale(4)}px;
`;

export const InformationIconImage = styled(Image)`
  width: ${scale(20)}px;
  height: ${scale(20)}px;
`;

export const InformationText = styled(Text)<{$isStar?: boolean}>`
  ${FontStyles.captionMedium}
  color: ${props => (props.$isStar ? GrayColors[900] : GrayColors[600])};
`;

export const FilterIconImage = styled(Image)`
  width: ${scale(24)}px;
  height: ${scale(24)}px;
`;

export const ReviewCardListContainer = styled(View)`
  flex: 1;
`;

export const NoReviewText = styled(Text)`
  ${FontStyles.bodySmall}
  color: ${GrayColors[600]};
  text-align: center;
  margin-top: ${scale(24)}px;
`;

export const DividerWrapper = styled(View)`
  padding-top: ${scale(8)}px;
  padding-bottom: ${scale(16)}px;
`;

export const NoReviewContainer = styled(View)`
  padding: ${scale(32)}px ${scale(24)}px;
`;
