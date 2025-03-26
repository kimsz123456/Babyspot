import {Image, Text, TouchableOpacity} from 'react-native';

import styled from 'styled-components/native';

import scale from '../../../../../utils/scale';

import {GrayColors, PrimaryColors} from '../../../../../constants/colors';
import {FontStyles} from '../../../../../constants/fonts';

export const RecommendButton = styled(TouchableOpacity)`
  display: flex;
  flex-direction: column;
  align-items: center;
  aspect-ratio: 1;
  padding: ${scale(4)}px;
  border: 1px solid ${PrimaryColors[500]};
  border-radius: 8px;
  background-color: ${PrimaryColors[500]};
  elevation: 1;
`;

export const BabyIcon = styled(Image)`
  width: ${scale(16)}px;
  height: ${scale(16)}px;
`;

export const RecommendText = styled(Text)`
  ${FontStyles.captionMedium}
  color: ${GrayColors[0]};
`;
