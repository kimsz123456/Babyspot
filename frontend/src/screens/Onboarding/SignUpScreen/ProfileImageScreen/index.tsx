import React from 'react';
import * as S from './styles';
import MainButton from '../../../../components/atoms/Button/MainButton';
import {IC_AGE1} from '../../../../constants/icons';
import {useOnboardingStore} from '../../../../stores/onboardingStore';
import {useOnboardingNavigation} from '../../../../hooks/useNavigationHooks';

const sampleImagePaths = [
  'https://img.mbn.co.kr/filewww/news/other/2020/07/16/002622210002.jpg',
  'https://cdn.hankyung.com/photo/202203/B20220330181301797.jpg',
  'https://menu.moneys.co.kr/moneyweek/thumb/2024/11/12/06/2024111208052870834_1.jpg',
  'https://images.khan.co.kr/article/2024/03/05/news-p.v1.20240305.9dc707937ff0483e9f91ee16c87312dd_P1.jpg',
];
const ProfileImageScreen = () => {
  const navigation = useOnboardingNavigation();

  const profileImagePath = useOnboardingStore(state => state.profileImagePath);
  const setProfileImagePath = useOnboardingStore(
    state => state.setProfileImagePath,
  );

  return (
    <S.SignUpScreenView>
      <S.SingUpInputSection>
        <S.SignUpInputSectionTitle>{`프로필 사진을 골라주세요.`}</S.SignUpInputSectionTitle>
        <S.CameraButton
          onPress={() => {
            const randomNumber = Math.floor(
              Math.random() * sampleImagePaths.length,
            );

            setProfileImagePath(sampleImagePaths[randomNumber]);
          }}>
          {!profileImagePath ? (
            <S.CameraIconImage source={IC_AGE1} />
          ) : (
            <S.ProfileImage source={{uri: profileImagePath}} />
          )}
        </S.CameraButton>
      </S.SingUpInputSection>
      <MainButton
        text={'다음'}
        onPress={() => {
          navigation.navigate('AddChild');
        }}
        disabled={!profileImagePath}
      />
    </S.SignUpScreenView>
  );
};

export default ProfileImageScreen;
