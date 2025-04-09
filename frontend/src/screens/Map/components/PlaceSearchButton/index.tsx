import React from 'react';
import * as S from './styles';
import {useMapNavigation} from '../../../../hooks/useNavigationHooks';
import {useMapStore} from '../../../../stores/mapStore';
import {IC_CLOSE_BLACK} from '../../../../constants/icons';

const PlaceSearchButton = () => {
  const navigation = useMapNavigation();

  const selectedPlace = useMapStore(state => state.selectedPlace);

  const handleDeleteSelectedPlace = () => {
    useMapStore.setState({selectedPlace: null});
  };

  return (
    <S.PlaceTextContainer
      onPress={() => {
        navigation.navigate('Search');
      }}>
      <S.PlaceText isPlaceholder={selectedPlace == null}>
        {selectedPlace
          ? selectedPlace.place_name
            ? selectedPlace.place_name + ', ' + selectedPlace.road_address_name
            : selectedPlace.road_address_name
          : `검색할 장소를 입력해주세요`}
      </S.PlaceText>
      {selectedPlace ? (
        <S.IconContainer onPress={handleDeleteSelectedPlace}>
          <S.Icon source={IC_CLOSE_BLACK} />
        </S.IconContainer>
      ) : undefined}
    </S.PlaceTextContainer>
  );
};

export default PlaceSearchButton;
