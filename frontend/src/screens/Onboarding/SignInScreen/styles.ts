import {Image, Text, TouchableOpacity, View} from 'react-native';
import styled from 'styled-components/native';
import scale from '../../../utils/scale';
import {GrayColors} from '../../../constants/colors';

export const SignInScreenContainer = styled(View)`
  flex: 1;
  justify-content: center;
  align-items: center;
  background-color: ${GrayColors[0]};
  padding-top: ${scale(100)}px;
`;

export const SignInAppLogoImage = styled(Image)`
  height: ${scale(66)}px;
  object-fit: contain;
`;

export const BetweenMarginView = styled(View)`
  height: ${scale(300)}px;
`;

export const KakaoLoginButton = styled(TouchableOpacity)`
  flex-direction: row;
  align-items: center;
  justify-content: center;
  gap: ${scale(8)}px;
  padding: ${scale(11)}px ${scale(14)}px;
  background-color: #fee500;
  width: ${scale(272)}px;
  border-radius: ${scale(6)}px;
`;

export const KakaoLogoImage = styled(Image)`
  width: ${scale(18)}px;
  height: ${scale(18)}px;
`;

export const KakaoLoginButtonText = styled(Text)``;
