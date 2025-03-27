import React from 'react';
import * as S from './styles';
import {IMG_DEFAULT_PROFILE} from '../../../../../constants/images';
import {IC_IMAGE_EDIT} from '../../../../../constants/icons';

const ProfileImage = () => {
  return (
    <S.ProfileImageWrapper>
      <S.ProfileImageContainer>
        <S.ProfileImage source={IMG_DEFAULT_PROFILE} />
        <S.ImageEditButton source={IC_IMAGE_EDIT} />
      </S.ProfileImageContainer>
    </S.ProfileImageWrapper>
  );
};

export default ProfileImage;
