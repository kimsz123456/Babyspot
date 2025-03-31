import React, {useEffect, useState} from 'react';
import * as S from './styles';
import {IC_QUESTION, IC_RIGHT_ARROW} from '../../../../../constants/icons';
import {ThinDivider} from '../../../../../components/atoms/Divider';
import {useNavigation} from '@react-navigation/native';
import VersionCheck from 'react-native-version-check';

const Setting = () => {
  const navigation = useNavigation();
  const [appVersion, setAppVersion] = useState('');

  useEffect(() => {
    const currentVersion = VersionCheck.getCurrentVersion();

    setAppVersion(currentVersion);
  }, []);

  return (
    <S.SettingContainer>
      <S.SettingTitle>설정</S.SettingTitle>
      <S.SettingItems>
        <S.GPSContainer>
          <S.GPSTitle>GPS 설정</S.GPSTitle>
          <S.GPSStateContainer>
            <S.GPSState>되어있음</S.GPSState>
            <S.GPSQuestion source={IC_QUESTION} />
          </S.GPSStateContainer>
        </S.GPSContainer>
        <ThinDivider />
        <S.PrivacyTermsContainer>
          <S.PrivacyTermsTitle>개인정보 이용약관</S.PrivacyTermsTitle>
          <S.PrivacyTermsButton source={IC_RIGHT_ARROW} />
        </S.PrivacyTermsContainer>
        <ThinDivider />
        <S.AppVersionContainer>
          <S.AppVersionTitle>앱 버전</S.AppVersionTitle>
          <S.AppVersionNumber>{appVersion}</S.AppVersionNumber>
        </S.AppVersionContainer>
        <ThinDivider />
        <S.LogoutContainer>
          <S.LogoutTitle>로그아웃</S.LogoutTitle>
          <S.LogoutButton source={IC_RIGHT_ARROW} />
        </S.LogoutContainer>
        <ThinDivider />
        <S.DeleteAccountContainer>
          <S.DeleteAccount onPress={() => navigation.navigate('DeleteAccount')}>
            회원탈퇴
          </S.DeleteAccount>
        </S.DeleteAccountContainer>
      </S.SettingItems>
    </S.SettingContainer>
  );
};

export default Setting;
