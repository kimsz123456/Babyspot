import styled from 'styled-components/native';
import {FontStyles} from '../../../constants/fonts';
import {PrimaryColors} from '../../../constants/colors';
import {GrayColors} from '../../../constants/colors';
import scale from '../../../utils/scale';
import {Image, Text, View} from 'react-native';

const BackGround = styled(View)`
  flex: 1;
  background-color: ${GrayColors[0]};
`;

const ProfileContainer = styled(View)`
  padding-top: ${scale(32)};
  padding-left: ${scale(24)};
  padding-right: ${scale(24)};
  flex-direction: row;
  align-items: center;
`;
const ProfileImage = styled(Image)`
  height: ${scale(64)}px;
  width: ${scale(64)}px;
  border-radius: 10px;
  border-width: 1px;
  border-color: ${GrayColors[100]};
`;
const ProfileInfo = styled(View)`
  margin-left: ${scale(16)};
  flex: 1;
`;
const NameContainer = styled(Text)`
  ${FontStyles.bodyMedium};
  color: ${GrayColors[800]};
  flex: 1;
  top: 0;
`;
const Name = styled(Text)`
  font-weight: bold;
  color: ${PrimaryColors[500]};
`;
const AgeIcons = styled(Image)`
  width: ${scale(24)};
  height: ${scale(24)};
  botton: 0;
`;
const ProfileEdit = styled(Image)`
  width: ${scale(32)};
  height: ${scale(32)};
`;

export {
  BackGround,
  ProfileContainer,
  ProfileImage,
  ProfileInfo,
  NameContainer,
  Name,
  AgeIcons,
  ProfileEdit,
};
