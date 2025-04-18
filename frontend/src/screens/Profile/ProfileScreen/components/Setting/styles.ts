import styled from 'styled-components/native';
import {View, Text, Image, Pressable} from 'react-native';

import {FontStyles} from '../../../../../constants/fonts';
import {
  GrayColors,
  SecondaryColors,
  SystemColors,
} from '../../../../../constants/colors';
import scale from '../../../../../utils/scale';

const SettingContainer = styled(View)`
  padding: ${scale(24)}px ${scale(24)}px;
`;
const SettingTitle = styled(Text)`
  ${FontStyles.headingMedium};
  color: ${GrayColors[800]};
`;
const SettingItems = styled(View)`
  padding-top: ${scale(24)}px;
  gap: ${scale(16)}px;
`;

const GPSContainer = styled(View)`
  padding: ${scale(8)}px 0px;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;
const GPSTitle = styled(Text)`
  ${FontStyles.bodyMedium};
  color: ${GrayColors[800]};
`;
const GPSStateContainer = styled(Pressable)`
  flex-direction: row;
  align-items: center;
  gap: ${scale(8)}px;
`;
const GPSState = styled(Text)`
  ${FontStyles.bodyMedium};
  color: ${SystemColors.success};
`;
const GPSQuestion = styled(Image)`
  width: ${scale(24)}px;
  height: ${scale(24)}px;
`;

const PrivacyTermsContainer = styled(Pressable)`
  padding: ${scale(8)}px 0px;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;
const PrivacyTermsTitle = styled(Text)`
  ${FontStyles.bodyMedium};
  color: ${GrayColors[800]};
`;

const AppVersionContainer = styled(View)`
  padding: ${scale(8)}px 0px;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;
const AppVersionTitle = styled(Text)`
  ${FontStyles.bodyMedium};
  color: ${GrayColors[800]};
`;
const AppVersionNumber = styled(Text)`
  ${FontStyles.bodyMedium};
  color: ${SecondaryColors[500]};
`;

const LogoutContainer = styled(Pressable)`
  padding: ${scale(8)}px 0px;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;
const LogoutTitle = styled(Text)`
  ${FontStyles.bodyMedium};
  color: ${GrayColors[800]};
`;
const RightArrowButton = styled(Image)`
  width: ${scale(24)}px;
  height: ${scale(24)}px;
`;

const DeleteAccountContainer = styled(View)`
  padding: ${scale(8)}px 0px;
  flex-direction: row;
  align-items: center;
  justify-content: flex-end;
`;
const DeleteAccount = styled(Text)`
  ${FontStyles.bodyMedium};
  color: ${GrayColors[300]};
`;

export {
  SettingContainer,
  SettingTitle,
  SettingItems,
  GPSContainer,
  GPSTitle,
  GPSStateContainer,
  GPSState,
  GPSQuestion,
  PrivacyTermsContainer,
  PrivacyTermsTitle,
  AppVersionContainer,
  AppVersionTitle,
  AppVersionNumber,
  LogoutContainer,
  LogoutTitle,
  RightArrowButton,
  DeleteAccountContainer,
  DeleteAccount,
};
