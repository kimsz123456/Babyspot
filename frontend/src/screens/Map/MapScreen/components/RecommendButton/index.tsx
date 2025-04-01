import React from 'react';

import * as S from './styles';

import {IC_BABY} from '../../../../../constants/icons';
import {useMapNavigation} from '../../../../../hooks/useNavigationHooks';

const RecommendButton = () => {
  const navigation = useMapNavigation();

  return (
    <S.RecommendButton
      onPress={() => {
        navigation.navigate('SelectRecommendationAgeScreen');
      }}>
      <S.BabyIcon source={IC_BABY} />
      <S.RecommendText>추천</S.RecommendText>
    </S.RecommendButton>
  );
};

export default RecommendButton;
