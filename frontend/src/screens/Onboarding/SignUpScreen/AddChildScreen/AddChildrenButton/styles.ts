import {GrayColors} from './../../../../../constants/colors';
import {Image, Text, TouchableOpacity, View} from 'react-native';
import styled from 'styled-components';
import scale from '../../../../../utils/scale';
import {FontStyles} from '../../../../../constants/fonts';

export const AddChildrenContainer = styled(TouchableOpacity)`
  align-self: center;
  flex-direction: row;
  border-radius: 100px;
  padding: ${scale(8)}px ${scale(16)}px;
  border: 1px solid ${GrayColors[200]};
  gap: ${scale(8)}px;
`;

export const AddChildrenText = styled(Text)`
  ${FontStyles.bodyMedium};
  color: ${GrayColors[800]};
`;

export const IconImage = styled(Image)`
  width: ${scale(24)}px;
  height: ${scale(24)}px;
`;
