import React, {useEffect, useState} from 'react';
import * as S from './styles';
import {IC_QUESTION, IC_RIGHT_ARROW} from '../../../../../constants/icons';
import {ThinDivider} from '../../../../../components/atoms/Divider';
import {useProfileNavigation} from '../../../../../hooks/useNavigationHooks';
import VersionCheck from 'react-native-version-check';
import PrivacyPolicyButton from '../Buttons/PrivacyPolicyButton';
import {Alert, Linking, PermissionsAndroid} from 'react-native';
import {FontStyles} from '../../../../../constants/fonts';
import {SystemColors} from '../../../../../constants/colors';

const Setting = () => {
  const navigation = useProfileNavigation();
  const [appVersion, setAppVersion] = useState('');
  const [isGPSEnabled, setIsGPSEnabled] = useState(false);

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

  useEffect(() => {
    const currentVersion = VersionCheck.getCurrentVersion();
    setAppVersion(currentVersion);

    checkGPSPermission();

    const unsubscribe = navigation.addListener('focus', () => {
      checkGPSPermission();
    });

    return unsubscribe;
  }, []);

  const requestGPSPermission = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        {
          title: '위치 권한 요청',
          message: '주변 맛집을 찾기 위해 위치 권한이 필요합니다.',
          buttonNeutral: '나중에 묻기',
          buttonNegative: '거부',
          buttonPositive: '허용',
        },
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        setIsGPSEnabled(true);
      } else {
        Alert.alert(
          'GPS 권한 설정',
          '위치 권한이 거부되었습니다.\n설정 화면에서 직접 권한을 허용해주세요.',
          [
            {
              text: '취소',
              style: 'cancel',
            },
            {
              text: '설정으로 이동',
              onPress: () => Linking.openSettings(),
            },
          ],
        );
        setIsGPSEnabled(false);
      }
    } catch (error) {
      console.error('GPS 권한 확인 실패:', error);
      setIsGPSEnabled(false);
    }
  };

  const handleGPSPress = async () => {
    if (isGPSEnabled) {
      Alert.alert(
        'GPS 권한 상태',
        'GPS 권한이 허용되어 있습니다.\n설정 화면에서 권한을 변경할 수 있습니다.',
        [
          {
            text: '취소',
            style: 'cancel',
          },
          {
            text: '설정으로 이동',
            onPress: () => {
              Linking.openSettings();
            },
          },
        ],
        {cancelable: true},
      );
    } else {
      requestGPSPermission();
    }
  };

  return (
    <S.SettingContainer>
      <S.SettingTitle>설정</S.SettingTitle>
      <S.SettingItems>
        <S.GPSContainer>
          <S.GPSTitle>GPS 설정</S.GPSTitle>
          <S.GPSStateContainer onPress={handleGPSPress}>
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
