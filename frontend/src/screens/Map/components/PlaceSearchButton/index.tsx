import React from 'react';
import {Pressable} from 'react-native';

import {useRoute} from '@react-navigation/native';

import {IC_LEFT_ARROW} from '../../../../constants/icons';

import * as S from './styles';
import {useMapNavigation} from '../../../../hooks/useNavigationHooks';
import {useMapStore} from '../../../../stores/mapStore';

const PlaceSearchButton = () => {
  const navigation = useMapNavigation();
  const router = useRoute();

  const selectedAddress = useMapStore(state => state.selectedAddress);

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
      <S.Placeholder
        isPlaceholder={!(router.name == 'MapMain' && selectedAddress != null)}>
        {router.name == 'MapMain' && selectedAddress
          ? selectedAddress.buildingName
            ? selectedAddress.buildingName + ', ' + selectedAddress.roadAddress
            : selectedAddress.roadAddress
          : `검색할 장소를 입력해주세요`}
      </S.Placeholder>
    </S.PlaceSearchButton>
  );
};

export default PlaceSearchButton;
