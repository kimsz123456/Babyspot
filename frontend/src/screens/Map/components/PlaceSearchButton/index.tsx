import React from 'react';
import {Pressable} from 'react-native';

import {useRoute} from '@react-navigation/native';

import {IC_LEFT_ARROW} from '../../../../constants/icons';

import * as S from './styles';
import {useMapNavigation} from '../../../../hooks/useNavigationHooks';

// TODO: 검색 화면의 경우, 카카오 API 연결
const PlaceSearchButton = () => {
  const navigation = useMapNavigation();
  const router = useRoute();

  return (
    <S.PlaceSearchButton
      onPress={() => {
        if (router.name == 'MapMain') {
          navigation.navigate('Search');
        } else if (router.name == 'Search') {
          navigation.navigate('KakaoPostcode');
        }
      }}>
      {router.name !== 'MapMain' && (
        <Pressable onPress={() => navigation.goBack()}>
          <S.LeftArrowIcon source={IC_LEFT_ARROW} />
        </Pressable>
      )}
      <S.Placeholder>검색할 장소를 입력해주세요</S.Placeholder>
    </S.PlaceSearchButton>
  );
};

export default PlaceSearchButton;
