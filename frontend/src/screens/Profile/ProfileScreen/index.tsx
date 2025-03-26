import React from 'react';
import * as S from './styles.ts';
import {IMG_DEFAULT_PROFILE} from '../../../constants/images.ts';
import {IC_AGE3} from '../../../constants/icons.ts';
import {MyReviewList} from './components/MyReviewList/index.tsx';
import {ThickDividerContainer} from '../../../components/atoms/Divider/styles.ts';
import Setting from './components/Setting/index.tsx';
import ProfileEditIconButton from './components/Buttons/index.tsx';

const ProfileScreen = () => {
  const name = '감귤하우스';
  return (
    <S.BackGround>
      {/* api 연동시 프로필 컴포넌트로 뽑아서 동적으로 받을 수 있게 하기 */}
      <S.ProfileContainer>
        <S.ProfileImage source={IMG_DEFAULT_PROFILE} />
        <S.ProfileInfo>
          <S.NameContainer>
            <S.Name>{name}</S.Name> 님
          </S.NameContainer>
          <S.AgeIcons source={IC_AGE3} />
        </S.ProfileInfo>
        <ProfileEditIconButton />
      </S.ProfileContainer>
      <S.ReviewContainer>
        <S.ReviewTitleContainer>
          <S.ReviewTitle>내 리뷰</S.ReviewTitle>
          <S.MoreReview>더보기</S.MoreReview>
        </S.ReviewTitleContainer>
        <MyReviewList />
      </S.ReviewContainer>
      <ThickDividerContainer />
      <Setting />
    </S.BackGround>
  );
};

export default ProfileScreen;
