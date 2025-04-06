import React, {useState} from 'react';
import {FlatList} from 'react-native';
import {useMapNavigation} from '../../../../hooks/useNavigationHooks';
import {useMapStore} from '../../../../stores/mapStore';
import {
  getGeocodingByKeyword,
  GetGeocodingByKeywordResponse,
} from '../../../../services/mapService';
import LinedTextInput from '../../../../components/atoms/Button/LinedTextInput';
import * as S from './styles';
import NoDataContainer from '../../../../components/atoms/NoDataContainer';

const PlaceSearchScreen = () => {
  const [keyword, setKeyword] = useState('');
  const [results, setResults] = useState<GetGeocodingByKeywordResponse[]>([]);
  const navigation = useMapNavigation();
  const setSelectedPlace = useMapStore(state => state.setSelectedPlace);

  const searchPlaces = async (text: string) => {
    setKeyword(text);

    if (!text.trim()) {
      setResults([]);
      return;
    }

    try {
      const response = await getGeocodingByKeyword(text);
      setResults(response);
    } catch (error) {
      console.error('장소 검색 오류:', error);
    }
  };

  const handleSelect = (item: GetGeocodingByKeywordResponse) => {
    setSelectedPlace(item);
    navigation.navigate('MapMain', {searchedPlace: item});
  };

  const renderHighlightedName = (
    placeName: string,
    keyword: string,
    index: number,
  ) => {
    const parts = placeName.split(new RegExp(`(${keyword})`, 'gi'));

    return parts.map((part, i) => {
      const key = `${index}-${i}`;
      const isMatch =
        part.toLowerCase() === keyword.toLowerCase() && keyword !== '';

      return isMatch ? (
        <S.HighlightedText key={`highlight-${key}`}>{part}</S.HighlightedText>
      ) : part ? (
        <S.PlaceNameRawText key={`normal-${key}`}>{part}</S.PlaceNameRawText>
      ) : null;
    });
  };

  return (
    <S.PlaceSearchContainer>
      <LinedTextInput
        text={keyword}
        setText={searchPlaces}
        placeholder="장소나 주소를 입력하세요"
      />

      <FlatList
        data={results}
        keyExtractor={item => item.id.toString()}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={<NoDataContainer text={'검색 결과가 없습니다.'} />}
        renderItem={({item, index}) => (
          <S.PlaceButtonTile
            $showLine={index != results.length - 1}
            onPress={() => handleSelect(item)}>
            <S.PlaceNameText>
              {renderHighlightedName(item.place_name, keyword, index)}
            </S.PlaceNameText>
            <S.PlaceAddressText>
              {item.road_address_name || item.address_name}
            </S.PlaceAddressText>
          </S.PlaceButtonTile>
        )}
        keyboardShouldPersistTaps="handled"
      />
    </S.PlaceSearchContainer>
  );
};

export default PlaceSearchScreen;
