import React, {useEffect, useState} from 'react';
import * as S from './styles.ts';
import {IMG_DEFAULT_PROFILE} from '../../../constants/images.ts';
import {IC_AGE3} from '../../../constants/icons.ts';
import {MyReviewList} from './components/MyReviewList/index.tsx';
import {ThickDividerContainer} from '../../../components/atoms/Divider/styles.ts';
import Setting from './components/Setting/index.tsx';
import ProfileEditIconButton from './components/Buttons/ProfileEditIconButton/index.tsx';
import {useProfileNavigation} from '../../../hooks/useNavigationHooks.ts';
import {
  getMemberProfile,
  MemberProfile,
} from '../../../services/profileService.ts';

const ProfileScreen = () => {
  const navigation = useProfileNavigation();
  const [userProfile, setUserProfile] = useState<MemberProfile | null>(null);

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const data = await getMemberProfile();
        setUserProfile(data);
      } catch (error) {
        console.error('프로필 정보 조회 실패:', error);
      }
    };

    fetchUserProfile();
  }, []);

  return (
    <S.BackGround>
      <S.ProfileContainer>
        <S.ProfileImage
          source={
            userProfile?.profile_img
              ? {uri: userProfile.profile_img}
              : IMG_DEFAULT_PROFILE
          }
        />
        <S.ProfileInfo>
          <S.NameContainer>
            <S.Name>{userProfile?.nickname || '사용자'}</S.Name> 님
          </S.NameContainer>
          <S.AgeIcons source={IC_AGE3} />
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
