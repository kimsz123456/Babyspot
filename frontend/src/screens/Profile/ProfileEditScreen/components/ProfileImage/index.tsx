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
        const imageData = {
          uri: asset.uri!,
          type: asset.type || 'image/jpeg',
          fileName: asset.fileName || 'profile.jpg',
        };
        setSelectedImage(imageData);
        onImageSelect(imageData);
      }
    } catch (error) {
      console.error('이미지 선택 실패:', error);
      Alert.alert('오류', '이미지 선택에 실패했습니다.');
    }
  };

  const getImageSource = () => {
    if (selectedImage?.uri) {
      return {uri: selectedImage.uri};
    }
    if (memberProfile?.profile_img) {
      // CloudFront URL이 이미 포함되어 있는지 확인
      if (memberProfile.profile_img.startsWith('http')) {
        return {uri: memberProfile.profile_img};
      }
      // 상대 경로인 경우 CloudFront URL 생성
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
