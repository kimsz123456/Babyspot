import {FlatList, Text, View} from 'react-native';
import styled from 'styled-components';
import scale from '../../../utils/scale';
import {FontStyles} from '../../../constants/fonts';
import {GrayColors} from '../../../constants/colors';
import {AgeProps} from '../ReviewListScreen/ReviewFilterModal';

export const SelectRecommendationAgeScreenContainer = styled(View)`
  flex: 1;
  background-color: ${GrayColors[0]};
  padding: ${scale(40)}px ${scale(24)}px;
  justify-content: space-between;
`;

export const TextContainer = styled(View)`
  gap: ${scale(8)}px;
`;

export const Title = styled(Text)`
  ${FontStyles.headingMedium};
  color: ${GrayColors[800]};
`;

export const SubTitle = styled(Text)<{$isBold: boolean}>`
  ${FontStyles.captionMedium};
  color: ${GrayColors[800]};
  font-weight: ${({$isBold}) => ($isBold ? 700 : 500)};
`;

export const IconListContainer = styled(FlatList<AgeProps>)`
  margin-top: ${scale(40)}px;
  flex-grow: 0;
`;
