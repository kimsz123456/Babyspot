import React, {useEffect, useState} from 'react';
import * as S from './styles';
import {IC_QUESTION, IC_RIGHT_ARROW} from '../../../../../constants/icons';
import {ThinDivider} from '../../../../../components/atoms/Divider';
import {useProfileNavigation} from '../../../../../hooks/useNavigationHooks';
import VersionCheck from 'react-native-version-check';
import {Alert, Linking, PermissionsAndroid} from 'react-native';
import {SystemColors} from '../../../../../constants/colors';
import {withDivider} from '../../../../../utils/withDivider';

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
      const currentPermission = await PermissionsAndroid.check(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
      );

      if (!currentPermission) {
        Alert.alert(
          'GPS 권한 설정',
          '위치 권한이 필요합니다.\n설정 화면에서 직접 권한을 허용해주세요.',
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
        return;
      }

      // 권한이 아직 없는 경우에만 시스템 권한 요청
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

      setIsGPSEnabled(granted === PermissionsAndroid.RESULTS.GRANTED);
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

  const handlePrivatePolicyPress = () => {
    navigation.navigate('PrivacyPolicy');
  };

  const handleLogoutPress = () => {};

  return (
    <S.SettingContainer>
      <S.SettingTitle>설정</S.SettingTitle>
      <S.SettingItems>
        {withDivider(
          [
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
            </S.GPSContainer>,

            <S.PrivacyTermsContainer onPress={handlePrivatePolicyPress}>
              <S.PrivacyTermsTitle>개인정보 이용약관</S.PrivacyTermsTitle>
              <S.RightArrowButton source={IC_RIGHT_ARROW} />
            </S.PrivacyTermsContainer>,

            <S.AppVersionContainer>
              <S.AppVersionTitle>앱 버전</S.AppVersionTitle>
              <S.AppVersionNumber>{appVersion}</S.AppVersionNumber>
            </S.AppVersionContainer>,

            <S.LogoutContainer onPress={handleLogoutPress}>
              <S.LogoutTitle>로그아웃</S.LogoutTitle>
              <S.RightArrowButton source={IC_RIGHT_ARROW} />
            </S.LogoutContainer>,

            <S.DeleteAccountContainer>
              <S.DeleteAccount
                onPress={() => navigation.navigate('DeleteAccount')}>
                회원탈퇴
              </S.DeleteAccount>
            </S.DeleteAccountContainer>,
          ],

          <ThinDivider />,
        )}
      </S.SettingItems>
    </S.SettingContainer>
  );
};

export default Setting;
