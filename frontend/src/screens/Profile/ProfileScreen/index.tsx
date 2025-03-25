import React from 'react';
import * as S from './styles.ts';
import {IMG_DEFAULT_PROFILE} from '../../../constants/images.ts';
import {IC_AGE3, IC_PROFILE_EDIT} from '../../../constants/icons.ts';
import MyReviewList from './components/MyReviewList/index.tsx';
import {DividerContainer} from '../../../components/atoms/Divider/styles.ts';

const ProfileScreen = () => {
  const name = '감귤하우스';
  return (
    <S.BackGround>
      <S.ProfileContainer>
        {/* api 연동시 실제 사용자 프로필 이미지 */}
        <S.ProfileImage source={IMG_DEFAULT_PROFILE} />
        <S.ProfileInfo>
          <S.NameContainer>
            <S.Name>{name}</S.Name> 님
          </S.NameContainer>
          <S.AgeIcons source={IC_AGE3} />
        </S.ProfileInfo>
        <S.ProfileEdit source={IC_PROFILE_EDIT} />
      </S.ProfileContainer>
      <S.ReviewContainer>
        <S.ReviewTitleContanier>
          <S.ReviewTitle>내 리뷰</S.ReviewTitle>
          <S.MoreReview>더보기</S.MoreReview>
        </S.ReviewTitleContanier>
        <MyReviewList />
      </S.ReviewContainer>
      <DividerContainer />
    </S.BackGround>
  );
};

export default ProfileScreen;
