import React, {useEffect, useState} from 'react';
import * as S from './styles.ts';
import {IMG_DEFAULT_PROFILE} from '../../../constants/images.ts';
import {
  IC_AGE1,
  IC_AGE2,
  IC_AGE3,
  IC_AGE4,
  IC_AGE5,
  IC_AGE6,
  IC_AGE7,
} from '../../../constants/icons.ts';
import {MyReviewList} from './components/MyReviewList/index.tsx';
import {ThickDividerContainer} from '../../../components/atoms/Divider/styles.ts';
import Setting from './components/Setting/index.tsx';
import ProfileEditIconButton from './components/Buttons/ProfileEditIconButton/index.tsx';
import {useProfileNavigation} from '../../../hooks/useNavigationHooks.ts';
import {useGlobalStore} from '../../../stores/globalStore';
import {ImageSourcePropType} from 'react-native';

const AGE_ICONS: {[key: number]: ImageSourcePropType} = {
  1: IC_AGE1,
  2: IC_AGE2,
  3: IC_AGE3,
  4: IC_AGE4,
  5: IC_AGE5,
  6: IC_AGE6,
  7: IC_AGE7,
};

const ProfileScreen = () => {
  const navigation = useProfileNavigation();
  const {memberProfile} = useGlobalStore();

  const getBabyAgeIcon = (babyBirthYears?: number[]) => {
    if (!babyBirthYears || babyBirthYears.length === 0) {
      return <S.AgeIcons source={IC_AGE3} />;
    }
    const currentYear = new Date().getFullYear();
    return babyBirthYears.map((birthYear, index) => {
      const age = currentYear - birthYear + 1;
      const icon = AGE_ICONS[age] || IC_AGE3;
      return <S.AgeIcons key={index} source={icon} />;
    });
  };

  return (
    <S.BackGround>
      <S.ProfileContainer>
        <S.ProfileImage
          source={
            memberProfile?.profile_img
              ? {uri: memberProfile.profile_img}
              : IMG_DEFAULT_PROFILE
          }
        />
        <S.ProfileInfo>
          <S.NameContainer>
            <S.Name>{memberProfile?.nickname || '사용자'}</S.Name> 님
          </S.NameContainer>
          <S.AgeIconsContainer>
            {getBabyAgeIcon(memberProfile?.babyBirthYears)}
          </S.AgeIconsContainer>
        </S.ProfileInfo>
        <ProfileEditIconButton />
      </S.ProfileContainer>
      <S.ReviewContainer>
        <S.ReviewTitleContainer>
          <S.ReviewTitle>내 리뷰</S.ReviewTitle>
          <S.MoreReview onPress={() => navigation.navigate('MyReviewList')}>
            더보기
          </S.MoreReview>
        </S.ReviewTitleContainer>
        <MyReviewList />
      </S.ReviewContainer>
      <ThickDividerContainer />
      <Setting />
    </S.BackGround>
  );
};

export default ProfileScreen;
