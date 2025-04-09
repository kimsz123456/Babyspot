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

  const selectedPlace = useMapStore(state => state.selectedPlace);

  return (
    <S.PlaceSearchButton
      onPress={() => {
        if (router.name == 'MapMain') {
          navigation.navigate('Search');
        } else if (router.name == 'Search') {
          navigation.navigate('PlaceSearchScreen');
        }
      }}>
      {router.name !== 'MapMain' && (
        <Pressable onPress={() => navigation.goBack()}>
          <S.LeftArrowIcon source={IC_LEFT_ARROW} />
        </Pressable>
      )}
      <S.Placeholder
        isPlaceholder={!(router.name == 'MapMain' && selectedPlace != null)}>
        {router.name == 'MapMain' && selectedPlace
          ? selectedPlace.place_name
            ? selectedPlace.place_name + ', ' + selectedPlace.road_address_name
            : selectedPlace.road_address_name
          : `검색할 장소를 입력해주세요`}
      </S.Placeholder>
    </S.PlaceSearchButton>
  );
};

export default PlaceSearchButton;
