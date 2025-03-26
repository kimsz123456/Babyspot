import React from 'react';
import * as S from './styles';
import ProfileImage from './components/ProfileImage';
import MyInformation from './components/MyInformation';
import ChildAge from './components/ChildAge';
import ProfileEditButton from '../../../components/atoms/Button/ProfileEditButton';

const ProfileEditScreen = () => {
  return (
    <S.BackGround>
      {/* 이미지 추가 연동필요 */}
      <ProfileImage />
      <MyInformation />
      <ChildAge />
      <S.ProfileEditButtonWrapper>
        <ProfileEditButton />
      </S.ProfileEditButtonWrapper>
    </S.BackGround>
  );
};

export default ProfileEditScreen;
