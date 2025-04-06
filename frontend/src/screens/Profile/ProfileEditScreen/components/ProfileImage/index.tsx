import React, {useEffect, useState} from 'react';
import * as S from './styles';
import {IMG_DEFAULT_PROFILE} from '../../../../../constants/images';
import {IC_IMAGE_EDIT} from '../../../../../constants/icons';
import {launchImageLibrary} from 'react-native-image-picker';
import {Alert} from 'react-native';
import {useGlobalStore} from '../../../../../stores/globalStore';
import Config from 'react-native-config';

interface ProfileImageProps {
  onImageSelect: (
    imageData: {uri: string; type: string; fileName: string} | null,
  ) => void;
}

const ProfileImage = ({onImageSelect}: ProfileImageProps) => {
  const {memberProfile} = useGlobalStore();
  const [selectedImage, setSelectedImage] = useState<{
    uri: string;
    type: string;
    fileName: string;
  } | null>(null);

  const handleImageEdit = async () => {
    try {
      const result = await launchImageLibrary({
        mediaType: 'photo',
        quality: 1,
      });

      if (result.assets && result.assets[0]) {
        const asset = result.assets[0];
        if (!asset.type) {
          Alert.alert('오류', '이미지 타입을 확인할 수 없습니다.');
          return;
        }
        const imageData = {
          uri: asset.uri!,
          type: asset.type,
          fileName: asset.fileName || 'profile.jpg',
        };
        setSelectedImage(imageData);
        onImageSelect(imageData);
      }
    } catch (error) {
      throw error;
      Alert.alert('오류', '이미지 선택에 실패했습니다.');
    }
  };

  const getImageSource = () => {
    if (selectedImage?.uri) {
      return {uri: selectedImage.uri};
    }
    if (memberProfile?.profile_img) {
      if (memberProfile.profile_img.startsWith('http')) {
        return {uri: memberProfile.profile_img};
      }
      const timestamp = Date.now();
      return {
        uri: `${Config.CLOUDFRONT_PREFIX}${memberProfile.profile_img}?v=${timestamp}`,
      };
    }
    return IMG_DEFAULT_PROFILE;
  };

  return (
    <S.ProfileImageWrapper>
      <S.ProfileImageContainer onPress={handleImageEdit}>
        <S.ProfileImage source={getImageSource()} />
        <S.ImageEditButton onPress={handleImageEdit}>
          <S.ImageEditIcon source={IC_IMAGE_EDIT} />
        </S.ImageEditButton>
      </S.ProfileImageContainer>
    </S.ProfileImageWrapper>
  );
};

export default ProfileImage;
