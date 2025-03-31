import React, {useEffect, useState} from 'react';
import * as S from './styles';
import {IC_QUESTION, IC_RIGHT_ARROW} from '../../../../../constants/icons';
import {ThinDivider} from '../../../../../components/atoms/Divider';
import {useProfileNavigation} from '../../../../../hooks/useNavigationHooks';
import VersionCheck from 'react-native-version-check';
import PrivacyPolicyButton from '../Buttons/PrivacyPolicyButton';
import {PermissionsAndroid} from 'react-native';
import {FontStyles} from '../../../../../constants/fonts';
import {SystemColors} from '../../../../../constants/colors';

const Setting = () => {
  const navigation = useProfileNavigation();
  const [appVersion, setAppVersion] = useState('');
  const [isGPSEnabled, setIsGPSEnabled] = useState(false);

  useEffect(() => {
    const currentVersion = VersionCheck.getCurrentVersion();
    setAppVersion(currentVersion);

    const checkGPSPermission = async () => {
      try {
        const granted = await PermissionsAndroid.check(
          PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        );
        setIsGPSEnabled(granted);
      } catch (error) {
        console.error('GPS 권한 확인 실패:', error);
        setIsGPSEnabled(false);
      }
    };

    checkGPSPermission();
  }, []);

  return (
    <S.SettingContainer>
      <S.SettingTitle>설정</S.SettingTitle>
      <S.SettingItems>
        <S.GPSContainer>
          <S.GPSTitle>GPS 설정</S.GPSTitle>
          <S.GPSStateContainer>
            <S.GPSState
              style={{
                color: isGPSEnabled
                  ? `${SystemColors.success}`
                  : `${SystemColors.danger}`,
              }}>
              {isGPSEnabled ? '되어있음' : '꺼져있음'}
            </S.GPSState>
            <S.GPSQuestion source={IC_QUESTION} />
          </S.GPSStateContainer>
        </S.GPSContainer>
        <ThinDivider />
        <S.PrivacyTermsContainer>
          <S.PrivacyTermsTitle>개인정보 이용약관</S.PrivacyTermsTitle>
          <PrivacyPolicyButton />
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
