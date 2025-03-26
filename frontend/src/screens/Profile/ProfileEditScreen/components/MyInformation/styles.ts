import {Text, View} from 'react-native';
import styled from 'styled-components/native';
import {FontStyles} from '../../../../../constants/fonts';
import {GrayColors} from '../../../../../constants/colors';
import scale from '../../../../../utils/scale';

const InformationContainer = styled(View)`
  padding-top: ${scale(32)}px;
  gap: ${scale(16)}px;
`;

const NicknameContainer = styled(View)`
  flex: 1;
`;
const NicknameTitle = styled(Text)`
  ${FontStyles.captionMedium};
  color: ${GrayColors[800]};
  padding-bottom: ${scale(8)}px;
`;
const Nickname = styled(Text)`
  padding: ${scale(8)}px 0;
  ${FontStyles.bodyMedium};
  color: ${GrayColors[800]};
`;

const EmailContainer = styled(View)`
  flex: 1;
`;
const EmailTitle = styled(Text)`
  ${FontStyles.captionMedium};
  color: ${GrayColors[800]};
  padding-bottom: ${scale(8)}px;
`;
const Email = styled(Text)`
  padding: ${scale(8)}px ${scale(16)}px;
  ${FontStyles.bodyMedium};
  color: ${GrayColors[500]};
  background-color: ${GrayColors[100]};
`;

const ChildContainer = styled(View)`
  flex: 1;
`;
const ChildTitle = styled(Text)`
  ${FontStyles.captionMedium};
  color: ${GrayColors[800]};
  padding-bottom: ${scale(8)}px;
`;

export {
  InformationContainer,
  NicknameContainer,
  NicknameTitle,
  Nickname,
  EmailContainer,
  EmailTitle,
  Email,
  ChildContainer,
  ChildTitle,
};
