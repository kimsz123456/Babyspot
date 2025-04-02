import React, {useEffect, useState} from 'react';
import * as S from './styles';
import {IMG_DEFAULT_PROFILE} from '../../../../../constants/images';
import {IC_IMAGE_EDIT} from '../../../../../constants/icons';
import {launchImageLibrary} from 'react-native-image-picker';
import {Alert} from 'react-native';
import {useGlobalStore} from '../../../../../stores/globalStore';
import Config from 'react-native-config';

interface ProfileImageProps {
  onImageSelect: (imageData: {uri: string; type: string} | null) => void;
}

const ProfileImage = ({onImageSelect}: ProfileImageProps) => {
  const {memberProfile} = useGlobalStore();
  const [selectedImage, setSelectedImage] = useState<{
    uri: string;
    type: string;
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
        };
        setSelectedImage(imageData);
        onImageSelect(imageData);
      }
    } catch (error) {
      console.error('이미지 선택 실패:', error);
      Alert.alert('오류', '이미지 선택에 실패했습니다.');
    }
  };

  const cleanImageUrl = (url: string) => {
    const cloudfrontPrefix = Config.CLOUDFRONT_PREFIX || '';
    if (url.startsWith(cloudfrontPrefix)) {
      const potentialUrl = url.substring(cloudfrontPrefix.length);
      if (
        potentialUrl.startsWith('http://') ||
        potentialUrl.startsWith('https://')
      ) {
        return potentialUrl;
      }
    }
    return url;
  };

  const getImageSource = () => {
    if (selectedImage?.uri) {
      return {uri: selectedImage.uri};
    }
    if (memberProfile?.profile_img) {
      const uri = cleanImageUrl(memberProfile.profile_img);
      return {uri};
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
