import {GrayColors} from './../../../../constants/colors';
import styled from 'styled-components';
import * as SignUpScreenS from '../styles';
import {Text, View} from 'react-native';
import {FontStyles} from '../../../../constants/fonts';
import scale from '../../../../utils/scale';

export const SignUpScreenView = SignUpScreenS.SignUpScreenView;
export const SingUpInputSection = SignUpScreenS.SingUpInputSection;
export const SignUpInputSectionTitle = SignUpScreenS.SignUpInputSectionTitle;

export const TextInputTitle = styled(Text)`
  ${FontStyles.headingSmall}
  color: ${GrayColors[800]};
`;

export const NicknameInputContainer = styled(View)`
  gap: ${scale(24)}px;
`;

export const SubButtonContainer = styled(View)`
  align-self: flex-end;
  width: ${scale(86)}px;
`;
