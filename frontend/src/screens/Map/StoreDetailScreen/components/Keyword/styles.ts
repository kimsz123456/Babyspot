import {Text, TouchableOpacity, View} from 'react-native';
import styled from 'styled-components/native';
import scale from '../../../../../utils/scale';
import {FontStyles} from '../../../../../constants/fonts';
import {GrayColors, PrimaryColors} from '../../../../../constants/colors';

export const KeywordSectionContainer = styled(View)`
  display: flex;
  flex-direction: column;
  gap: ${scale(16)}px;
  padding: ${scale(16)}px ${scale(24)}px;
`;

export const TitleContainer = styled(View)`
  flex-direction: row;
  align-items: center;
  gap: ${scale(8)}px;
`;

export const Title = styled(Text)`
  ${FontStyles.headingMedium}
  color: ${GrayColors[800]};
`;

export const TotalCountText = styled(Text)`
  ${FontStyles.bodyMedium}
  color: ${GrayColors[300]};
`;

export const KeywordListContainer = styled(View)`
  display: flex;
  flex-direction: column;
  gap: ${scale(16)}px;
`;

export const KeywordBar = styled(View)`
  width: 100%;
  height: ${scale(56)}px;
  border-radius: ${scale(5)}px;
  background-color: ${GrayColors[100]};
`;

export const ColoredBar = styled(View)<{$percent: number}>`
  width: ${({$percent}) => `${$percent}%`};
  height: 100%;
  border-radius: ${scale(5)}px;
  background-color: ${PrimaryColors[100]};
`;

export const TextContainer = styled(TouchableOpacity)`
  position: absolute;
  width: 100%;
  height: 100%;
  justify-content: space-between;
  flex-direction: row;
  align-items: center;
  padding: 0 ${scale(32)}px;
`;

export const KeywordText = styled(Text)`
  ${FontStyles.bodyMedium};
  font-weight: 700;
  color: ${GrayColors[800]};
`;

export const KeywordCountText = styled(Text)`
  ${FontStyles.captionMedium};
  font-weight: 700;
  color: ${PrimaryColors[500]};
`;
