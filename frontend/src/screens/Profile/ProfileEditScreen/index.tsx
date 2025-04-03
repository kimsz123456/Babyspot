import React, {useState} from 'react';
import * as S from './styles';
import ProfileImage from './components/ProfileImage';
import MyInformation from './components/MyInformation';
import ChildAge from './components/ChildAge';
import MainButton from '../../../components/atoms/Button/MainButton';
import {Alert} from 'react-native';
import {useProfileNavigation} from '../../../hooks/useNavigationHooks';
import {patchMemberProfile} from '../../../services/profileService';
import {useGlobalStore} from '../../../stores/globalStore';

const ProfileEditScreen = () => {
  const navigation = useProfileNavigation();
  const {setMemberProfile} = useGlobalStore();
  const [nickname, setNickname] = useState<string>('');

  const handleProfileUpdate = async () => {
    try {
      const updateData = {
        nickname: nickname,
        profileImgUrl: '',
        contentType: 'image/jpeg',
        babyAges: [],
      };

      const response = await patchMemberProfile(updateData);

      setMemberProfile({
        ...response,
        babyBirthYears: [],
      });

      Alert.alert('성공', '프로필이 수정되었습니다.', [
        {
          text: '확인',
          onPress: () => navigation.navigate('ProfileMain'),
        },
      ]);
    } catch (error) {
      console.error('프로필 수정 실패:', error);
      Alert.alert('오류', '프로필 수정에 실패했습니다.');
    }
  };

  return (
    <S.BackGround>
      <ProfileImage onImageSelect={() => {}} />
      <MyInformation onNicknameChange={setNickname} />
      <ChildAge />
      <S.ProfileEditButtonWrapper>
        <MainButton text="프로필 수정" onPress={handleProfileUpdate} />
      </S.ProfileEditButtonWrapper>
    </S.BackGround>
  );
};

export default ProfileEditScreen;
