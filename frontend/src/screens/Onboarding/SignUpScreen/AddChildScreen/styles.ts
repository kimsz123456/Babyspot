import styled from 'styled-components';
import * as SignUpScreenS from '../styles';
import {Text, View} from 'react-native';
import {FontStyles} from '../../../../constants/fonts';
import scale from '../../../../utils/scale';

export const SignUpScreenView = SignUpScreenS.SignUpScreenView;
export const SingUpInputSection = SignUpScreenS.SingUpInputSection;
export const SignUpInputSectionTitle = SignUpScreenS.SignUpInputSectionTitle;

export const AddChildrenSectionTitle = styled(Text)`
  ${FontStyles.headingSmall};
  margin-bottom: ${scale(8)}px;
`;

export const ChildrenInformationSection = styled(View)`
  flex-direction: column;
  gap: ${scale(16)}px;
  align-content: center;
`;
