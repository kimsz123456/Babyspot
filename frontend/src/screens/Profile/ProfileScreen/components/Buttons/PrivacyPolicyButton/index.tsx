import React from 'react';
import {useNavigation, useRoute} from '@react-navigation/native';
import * as S from './styles';
import {IC_RIGHT_ARROW} from '../../../../../../constants/icons';

const PrivacyPolicyButton = () => {
  const navigation = useNavigation<any>(); // TODO: 타입 변경

  return (
    <S.PrivacyPolicyWrapper
      onPress={() => navigation.navigate('PrivacyPolicy')}>
      <S.PrivacyPolicyButton source={IC_RIGHT_ARROW} />
    </S.PrivacyPolicyWrapper>
  );
};

export default PrivacyPolicyButton;
