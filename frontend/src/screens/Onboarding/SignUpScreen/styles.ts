import {GrayColors, PrimaryColors} from './../../../constants/colors';
import {Text, View} from 'react-native';
import styled from 'styled-components';
import {FontStyles} from '../../../constants/fonts';
import scale from '../../../utils/scale';

export const SignUpScreenView = styled(View)`
  flex: 1;
  flex-direction: column;
  justify-content: space-between;
  align-content: center;
  background-color: ${GrayColors[0]};
  padding: ${scale(48)}px ${scale(24)}px ${scale(92)}px ${scale(24)}px;
`;

export const SignUpTextContainer = styled(View)`
  gap: ${scale(24)}px;
`;

export const SignUpWelcomeTitle = styled(Text)`
  ${FontStyles.displayMedium};
  color: ${PrimaryColors[500]};
`;

export const SignUpWelcomeSubTitle = styled(Text)`
  ${FontStyles.headingMedium};
  color: ${GrayColors[800]};
`;

export const SingUpInputSection = styled(View)`
  gap: ${scale(40)}px;
`;
export const SignUpInputSectionTitle = styled(Text)`
  ${FontStyles.headingMedium};
  color: ${GrayColors[800]};
`;
