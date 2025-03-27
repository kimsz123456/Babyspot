import React from 'react';
import {useNavigation, useRoute} from '@react-navigation/native';
import * as S from './styles';
import {IC_PROFILE_EDIT} from '../../../../../constants/icons';

const ProfileEditIconButton = () => {
  const navigation = useNavigation();
  const router = useRoute();

  return (
    <S.ProfileEditIconButton onPress={() => navigation.navigate('ProfileEdit')}>
      <S.ProfileEditIcon source={IC_PROFILE_EDIT} />
    </S.ProfileEditIconButton>
  );
};

export default ProfileEditIconButton;
