import React from 'react';
import {Alert} from 'react-native';

import {launchImageLibrary} from 'react-native-image-picker';

import {useOnboardingNavigation} from '../../../../hooks/useNavigationHooks';
import {useOnboardingStore} from '../../../../stores/onboardingStore';

import MainButton from '../../../../components/atoms/Button/MainButton';

import {IC_AGE1} from '../../../../constants/icons';

import * as S from './styles';

const ProfileImageScreen = () => {
  const navigation = useOnboardingNavigation();
  const {
    profileImagePath,
    setProfileImageName,
    setProfileImageType,
    setProfileImagePath,
  } = useOnboardingStore();

  const handleSelectImage = async () => {
    try {
      const result = await launchImageLibrary({
        mediaType: 'photo',
        quality: 1,
      });

      if (result.assets && result.assets[0]) {
        const uploadedImageData = result.assets[0];

        setProfileImagePath(uploadedImageData.uri || null);

        setProfileImageName(uploadedImageData.fileName || null);
        setProfileImageType(uploadedImageData.type || null);
      }
    } catch (error) {
      Alert.alert('오류', '이미지 선택에 실패했습니다.');
    }
  };

  return (
    <S.SignUpScreenView>
      <S.SingUpInputSection>
        <S.SignUpInputSectionTitle>
          {'프로필 사진을 골라주세요.'}
        </S.SignUpInputSectionTitle>
        <S.CameraButton onPress={handleSelectImage}>
          {!profileImagePath ? (
            <S.CameraIconImage source={IC_AGE1} />
          ) : (
            <S.ProfileImage source={{uri: profileImagePath}} />
          )}
        </S.CameraButton>
      </S.SingUpInputSection>
      <MainButton
        text={'다음'}
        onPress={() => {
          navigation.navigate('AddChild');
        }}
        disabled={!profileImagePath}
      />
    </S.SignUpScreenView>
  );
};

export default ProfileImageScreen;
