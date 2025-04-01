import React, {useEffect, useState} from 'react';
import * as S from './styles';
import {IMG_DEFAULT_PROFILE} from '../../../../../constants/images';
import {IC_IMAGE_EDIT} from '../../../../../constants/icons';
import {launchImageLibrary} from 'react-native-image-picker';
import {Alert} from 'react-native';
import {
  getMemberProfile,
  MemberProfile,
} from '../../../../../services/profileService';

interface ProfileImageProps {
  onImageSelect: (imageData: {uri: string; type: string} | null) => void;
}

const ProfileImage = ({onImageSelect}: ProfileImageProps) => {
  const [userProfile, setUserProfile] = useState<MemberProfile | null>(null);
  const [selectedImage, setSelectedImage] = useState<{
    uri: string;
    type: string;
  } | null>(null);

  useEffect(() => {
    fetchUserProfile();
  }, []);

  const fetchUserProfile = async () => {
    try {
      const data = await getMemberProfile();
      setUserProfile(data);
      console.log('프로필 이미지 URL:', data.profile_img);
    } catch (error) {
      console.error('프로필 이미지 정보 조회 실패:', error);
    }
  };

  const handleImageEdit = async () => {
    try {
      const result = await launchImageLibrary({
        mediaType: 'photo',
        quality: 1,
      });

      if (result.assets && result.assets[0]) {
        const asset = result.assets[0];
        console.log('선택된 이미지 정보:', asset);

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
    const cloudfrontPrefix = 'https://d1by7kxpz32c54.cloudfront.net/';
    // URL에 cloudfrontPrefix가 포함되어 있고, 그 뒤에 또 다른 'http'가 나오면 제거
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
    if (userProfile?.profile_img) {
      // API에서 받은 URL을 정제한 후 사용
      const uri = cleanImageUrl(userProfile.profile_img);
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
