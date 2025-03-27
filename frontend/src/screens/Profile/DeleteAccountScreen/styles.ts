import {Text, View} from 'react-native';
import styled from 'styled-components/native';
import scale from '../../../utils/scale';
import {GrayColors} from '../../../constants/colors';
import {FontStyles} from '../../../constants/fonts';

const BackGround = styled(View)`
  flex: 1;
  background-color: ${GrayColors[0]};
`;
const DeleteAccountContainer = styled(View)`
  padding: ${scale(32)}px ${scale(24)}px;
`;
const DeleteAccountTitle = styled(Text)`
  ${FontStyles.headingMedium};
  color: ${GrayColors[800]};
  padding-bottom: ${scale(32)}px;
`;
const Contents = styled(Text)`
  ${FontStyles.bodyMedium};
  color: ${GrayColors[800]};
`;
const ButtonWrapper = styled(View)`
  padding-top: ${scale(24)}px;
  gap: ${scale(16)}px;
`;

export {
  BackGround,
  DeleteAccountContainer,
  DeleteAccountTitle,
  Contents,
  ButtonWrapper,
};
