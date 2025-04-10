import {ScrollView, View} from 'react-native';
import styled from 'styled-components/native';
import {GrayColors} from '../../../constants/colors';
import scale from '../../../utils/scale';

const BackGround = styled(ScrollView)`
  flex: 1;
  padding: ${scale(32)}px ${scale(24)}px;
  background-color: ${GrayColors[0]};
`;

const ProfileEditButtonWrapper = styled(View)`
  padding-top: ${scale(8)}px;
  padding-bottom: ${scale(32)}px;
`;

export {BackGround, ProfileEditButtonWrapper};
