import React from 'react';
import {Pressable} from 'react-native';

import {useNavigation, useRoute} from '@react-navigation/native';

import {IC_LEFT_ARROW} from '../../../../constants/icons';

import * as S from './styles';

// TODO: 검색 화면의 경우, 카카오 API 연결
const PlaceSearchButton = () => {
  const navigation = useNavigation();
  const router = useRoute();

  return (
    <S.PlaceSearchButton onPress={() => navigation.navigate('Search')}>
      {router.name !== 'Map' && (
        <Pressable onPress={() => navigation.goBack()}>
          <S.LeftArrowIcon source={IC_LEFT_ARROW} />
        </Pressable>
      )}
      <S.Placeholder>검색할 장소를 입력해주세요</S.Placeholder>
    </S.PlaceSearchButton>
  );
};

export default PlaceSearchButton;
