import React from 'react';
import * as S from './styles';
import ProfileImage from './components/ProfileImage';
import MyInformation from './components/MyInformation';
import ChildAge from './components/ChildAge';
import MainButton from '../../../components/atoms/Button/MainButton';

const ProfileEditScreen = () => {
  return (
    <S.BackGround>
      {/* 이미지 추가 연동필요 */}
      <ProfileImage />
      <MyInformation />
      <ChildAge />
      <S.ProfileEditButtonWrapper>
        <MainButton text="프로필 수정" />
      </S.ProfileEditButtonWrapper>
    </S.BackGround>
  );
};

export default ProfileEditScreen;
