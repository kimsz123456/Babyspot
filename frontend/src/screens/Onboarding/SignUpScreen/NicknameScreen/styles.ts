import {GrayColors} from './../../../../constants/colors';
import styled from 'styled-components';
import * as SignUpScreenS from '../styles';
import {Text} from 'react-native';
import {FontStyles} from '../../../../constants/fonts';

export const SignUpScreenView = SignUpScreenS.SignUpScreenView;
export const SingUpInputSection = SignUpScreenS.SingUpInputSection;
export const SignUpInputSectionTitle = SignUpScreenS.SignUpInputSectionTitle;

export const TextInputTitle = styled(Text)`
  ${FontStyles.headingSmall}
  color: ${GrayColors[800]};
`;
