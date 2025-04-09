import React, {useState} from 'react';
import * as S from './styles';
import ProfileImage from './components/ProfileImage';
import MyInformation from './components/MyInformation';
import ChildAge from './components/ChildAge';
import MainButton from '../../../components/atoms/Button/MainButton';
import {Alert} from 'react-native';
import {useProfileNavigation} from '../../../hooks/useNavigationHooks';
import {
  getMemberProfile,
  patchMemberProfile,
} from '../../../services/profileService';
import {useGlobalStore} from '../../../stores/globalStore';
import uploadImageToS3 from '../../../utils/uploadImageToS3';

const ProfileEditScreen = () => {
  const navigation = useProfileNavigation();
  const {setMemberProfile, memberProfile} = useGlobalStore();
  const [nickname, setNickname] = useState<string>(
    memberProfile?.nickname || '',
  );
  const [babyAges, setBabyAges] = useState<number[]>(
    memberProfile?.babyBirthYears || [],
  );
  const [selectedImage, setSelectedImage] = useState<{
    uri: string;
    type: string;
    fileName: string;
  } | null>(() => {
    if (memberProfile?.profile_img) {
      return {
        uri: memberProfile.profile_img,
        type: '',
        fileName: memberProfile.profile_img.split('/').pop() || 'profile.jpg',
      };
    }
    return null;
  });

  const handleProfileUpdate = async () => {
    try {
      const response = await patchMemberProfile({
        nickname: nickname.trim(),
        profileImgUrl: selectedImage?.uri || '',
        contentType: selectedImage?.type || '',
        babyAges: babyAges,
      });
      const {preSignedUrl} = response;
      await uploadImageToS3({
        imageType: selectedImage?.type || '',
        imagePath: selectedImage?.uri || '',
        preSignedUrl: preSignedUrl || '',
      });

      const updatedProfile = await getMemberProfile();
      setMemberProfile(updatedProfile);
      Alert.alert('성공', '프로필이 수정되었습니다.', [
        {
          text: '확인',
          onPress: () => navigation.navigate('ProfileMain'),
        },
      ]);
    } catch (error) {
      throw error;
    }
  };

  return (
    <S.BackGround>
      <ProfileImage onImageSelect={setSelectedImage} />
      <MyInformation nickname={nickname} setNickname={setNickname} />
      <ChildAge onBabyAgesChange={setBabyAges} />
      <S.ProfileEditButtonWrapper>
        <MainButton
          disabled={nickname.trim() == '' || babyAges.length == 0}
          text="프로필 수정"
          onPress={handleProfileUpdate}
        />
      </S.ProfileEditButtonWrapper>
    </S.BackGround>
  );
};

export default ProfileEditScreen;
