import {GrayColors, PrimaryColors} from './../../../../constants/colors';
import styled from 'styled-components';
import * as SignUpScreenS from '../styles';
import {Text, TouchableOpacity, View} from 'react-native';
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

export const TextInputContainer = styled(View)`
  flex-direction: row;
  align-items: center;
  gap: ${scale(16)}px;
`;

export const NicknameInput = styled(View)`
  flex: 1;
`;

export const CheckNicknameButton = styled(TouchableOpacity)<{
  $disabled: boolean;
}>`
  padding: ${scale(8)}px ${scale(16)}px;
  border: 1px solid
    ${props => (props.$disabled ? GrayColors[200] : PrimaryColors[500])};
  border-radius: 5px;
`;

export const CheckNicknameText = styled(Text)<{$disabled: boolean}>`
  ${FontStyles.bodySmall};
  color: ${props => (props.$disabled ? GrayColors[500] : PrimaryColors[500])};
`;
