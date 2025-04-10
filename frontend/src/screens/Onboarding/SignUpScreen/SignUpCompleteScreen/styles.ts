import {Image, Text, View} from 'react-native';
import styled from 'styled-components';
import {GrayColors} from '../../../../constants/colors';
import {FontStyles} from '../../../../constants/fonts';
import scale from '../../../../utils/scale';

export const SignUpScreenView = styled(View)`
  flex: 1;
  flex-direction: column;
  justify-content: space-between;
  align-content: center;
  background-color: ${GrayColors[0]};
  padding: ${scale(48)}px ${scale(24)}px ${scale(92)}px ${scale(24)}px;
`;

export const SignUpCompleteContainer = styled(View)`
  flex: 1;
  align-items: center;
  justify-content: center;
  padding-bottom: ${scale(120)}px;
  gap: ${scale(36)}px;
`;

export const SignUpCompleteIconImage = styled(Image)`
  width: ${scale(50)}px;
  height: ${scale(50)}px;
`;

export const SignUpCompleteText = styled(Text)`
  ${FontStyles.headingMedium};
  color: ${GrayColors[800]};
`;
