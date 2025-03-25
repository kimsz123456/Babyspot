import {Image, Text, TouchableOpacity} from 'react-native';

import styled from 'styled-components/native';

import {GrayColors, PrimaryColors} from '../../../../../constants/colors';
import {FontStyles} from '../../../../../constants/fonts';

export const RecommendButton = styled(TouchableOpacity)`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 4px 9.5px;
  border: 1px solid ${PrimaryColors[500]};
  border-radius: 8px;
  background-color: ${PrimaryColors[500]};
`;

export const BabyIcon = styled(Image)`
  width: 16px;
  height: 16px;
`;

export const RecommendText = styled(Text)`
  ${FontStyles.captionMedium}
  color: ${GrayColors[0]};
`;
