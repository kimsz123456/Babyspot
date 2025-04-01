import styled from 'styled-components/native';
import {Image, Pressable, View} from 'react-native';
import scale from '../../../../../utils/scale';
import {GrayColors} from '../../../../../constants/colors';

const ProfileImageWrapper = styled(View)`
  align-items: center;
`;
const ProfileImageContainer = styled(Pressable)`
  width: ${scale(120)}px;
  height: ${scale(120)}px;
  position: relative;
`;
const ProfileImage = styled(Image)`
  width: ${scale(120)}px;
  height: ${scale(120)}px;
  border-radius: ${scale(60)}px;
  border-width: 1px;
  border-color: ${GrayColors[200]};
`;
const ImageEditButton = styled(Pressable)`
  width: ${scale(32)}px;
  height: ${scale(32)}px;
  border-radius: ${scale(16)}px;
  border-width: ${scale(1)}px;
  border-color: ${GrayColors[200]};
  position: absolute;
  bottom: 0;
  right: 0;
`;

const ImageEditIcon = styled(Image)`
  width: 100%;
  height: 100%;
`;

export {
  ProfileImageWrapper,
  ProfileImageContainer,
  ProfileImage,
  ImageEditButton,
  ImageEditIcon,
};
