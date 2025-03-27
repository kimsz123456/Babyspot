import {GrayColors} from './../../../../constants/colors';
import styled from 'styled-components';
import * as SignUpScreenS from '../styles';
import {Image, TouchableOpacity} from 'react-native';
import scale from '../../../../utils/scale';

export const SignUpScreenView = SignUpScreenS.SignUpScreenView;
export const SingUpInputSection = SignUpScreenS.SingUpInputSection;
export const SignUpInputSectionTitle = SignUpScreenS.SignUpInputSectionTitle;

export const CameraButton = styled(TouchableOpacity)`
  width: ${scale(120)}px;
  height: ${scale(120)}px;
  align-items: center;
  align-self: center;
  justify-content: center;
  border-radius: 100%;
  background-color: ${GrayColors[100]};
  border: 1px solid ${GrayColors[200]};
  overflow: hidden;
`;

export const CameraIconImage = styled(Image)`
  width: ${scale(40)}px;
  height: ${scale(40)}px;
`;

export const ProfileImage = styled(Image)`
  width: ${scale(120)}px;
  height: ${scale(120)}px;
`;
