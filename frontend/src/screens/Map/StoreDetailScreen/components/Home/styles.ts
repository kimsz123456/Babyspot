import {Image, Text, TouchableOpacity, View} from 'react-native';

import styled from 'styled-components/native';

import scale from '../../../../../utils/scale';
import {FontStyles} from '../../../../../constants/fonts';
import {GrayColors} from '../../../../../constants/colors';

export const HomeContainer = styled(View)`
  display: flex;
  flex-direction: column;
  gap: ${scale(8)}px;
  padding: 0px ${scale(24)}px ${scale(16)}px ${scale(24)}px;
`;

export const LineContainer = styled(View)`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: ${scale(8)}px;
  padding: ${scale(4)}px 0;
`;

export const Icon = styled(Image)`
  width: ${scale(16)}px;
  height: ${scale(16)}px;
`;

export const TextContainer = styled(View)`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: ${scale(8)}px;
`;

export const BasicText = styled(Text)`
  ${FontStyles.captionMedium}
  color: ${GrayColors[800]};
`;

export const TimeText = styled(Text)`
  ${FontStyles.captionMedium}
  color: ${GrayColors[800]};
  line-height: ${scale(18)}px;
`;

export const BoldText = styled(Text)`
  ${FontStyles.captionMedium}
  line-height: ${scale(18)}px;
  color: ${GrayColors[800]};
  font-weight: 700;
`;

export const BusinessHourContainer = styled(TouchableOpacity)`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

export const BusinessHourDetailContainer = styled(View)`
  display: flex;
  flex-direction: column;
  gap: ${scale(4)}px;
  margin-top: -${scale(4)}px;
  margin-left: ${scale(24)}px;
`;

export const CategoryContainer = styled(View)`
  display: flex;
  flex-direction: column;
  gap: ${scale(8)}px;
`;

export const CategoryCardList = styled(View)`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
`;

export const CategoryCardContainer = styled(View)`
  display: flex;
  flex-direction: row;
  justify-content: center;
  width: 25%;
`;

export const CategoryCard = styled(View)`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: ${scale(8)}px;
  width: ${scale(66)}px;
  padding: ${scale(8)}px;
`;

export const CategoryIcon = styled(Image)`
  width: ${scale(32)}px;
  height: ${scale(32)}px;
`;

export const CategoryName = styled(Text)`
  ${FontStyles.captionMedium}
  color: ${GrayColors[700]};
  text-align: center;
`;
