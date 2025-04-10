import {Image, Text, View} from 'react-native';
import styled from 'styled-components';
import scale from '../../../../../utils/scale';
import {FontStyles} from '../../../../../constants/fonts';
import {GrayColors} from '../../../../../constants/colors';

export const NoContentContainer = styled(View)`
  justify-content: center;
  align-items: center;
  padding: ${scale(16)}px;
  gap: ${scale(12)}px;
`;

export const NoContentIconImage = styled(Image)`
  width: ${scale(60)}px;
  height: ${scale(60)}px;
`;

export const NoContentText = styled(Text)`
  ${FontStyles.bodyMedium};
  color: ${GrayColors[300]};
  text-align: center;
`;
