import React, {useState} from 'react';
import SearchHistory from './components/SearchHistory';
import * as S from './styles';
import NoDataContainer from '../../../components/atoms/NoDataContainer';
import {withDivider} from '../../../utils/withDivider';
import {FlatList, TextInput} from 'react-native';
import {PrimaryColors, GrayColors} from '../../../constants/colors';
import {IC_LEFT_ARROW} from '../../../constants/icons';
import {useMapNavigation} from '../../../hooks/useNavigationHooks';
import scale, {scaleLetterSpacing} from '../../../utils/scale';
import {
  GetGeocodingByKeywordResponse,
  getGeocodingByKeyword,
} from '../../../services/mapService';
import {useMapStore} from '../../../stores/mapStore';

const SearchScreen = () => {
  const navigation = useMapNavigation();
  const {centerCoordinate, setSelectedPlace} = useMapStore();

  const [searchText, setSearchText] = useState('');
  const [results, setResults] = useState<GetGeocodingByKeywordResponse[]>([]);

  const searchPlaces = async (text: string) => {
    setSearchText(text);

    if (!text.trim()) {
      setResults([]);
      return;
    }

    try {
      const response = await getGeocodingByKeyword(
        text,
        centerCoordinate.longitude,
        centerCoordinate.latitude,
      );

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
    <S.SearchScreenContainer>
      <S.PlaceSearchButton>
        <S.LeftArrowIconContainer
          onPress={() => {
            navigation.goBack();
          }}>
          <S.LeftArrowIcon source={IC_LEFT_ARROW} />
        </S.LeftArrowIconContainer>

        <TextInput
          value={searchText}
          placeholder={'검색할 장소를 입력해주세요'}
          selectionColor={PrimaryColors[500]}
          placeholderTextColor={GrayColors[300]}
          style={{
            flex: 1,
            padding: scale(8),
            margin: 0,
            fontSize: scale(16),
            fontFamily: 'Pretendard-Regular',
            lineHeight: scale(24),
            fontWeight: 400,
            letterSpacing: scaleLetterSpacing(16, -2),
            includeFontPadding: false,
            textDecorationColor: GrayColors[800],
          }}
          onChangeText={text => {
            searchPlaces(text);
          }}
        />
      </S.PlaceSearchButton>

      {searchText.trim().length != 0 ? (
        <FlatList
          data={results}
          keyExtractor={item => item.id.toString()}
          showsVerticalScrollIndicator={false}
          ListEmptyComponent={
            <NoDataContainer text={'검색 결과가 없습니다.'} />
          }
          renderItem={({item, index}) => (
            <S.PlaceButtonTile
              $showLine={index != results.length - 1}
              onPress={() => handleSelect(item)}>
              <S.PlaceNameText>
                {renderHighlightedName(item.place_name, searchText, index)}
              </S.PlaceNameText>
              <S.PlaceAddressText>
                {item.road_address_name || item.address_name}
              </S.PlaceAddressText>
            </S.PlaceButtonTile>
          )}
          keyboardShouldPersistTaps="handled"
        />
      ) : (
        <S.SearchHistoryListContainer>
          <S.SearchHistoryListTitle>최근 검색</S.SearchHistoryListTitle>
          <S.SearchHistoryList>
            <NoDataContainer text="서비스 준비 중입니다." />
            {/* {withDivider(
            [
              ...[].map((history, index) => (
                <SearchHistory
                  key={index}
                  address={history.address}
                  date={history.date}
                />
              )),
            ],
            <S.Divider />,
          )} */}
          </S.SearchHistoryList>
        </S.SearchHistoryListContainer>
      )}
    </S.SearchScreenContainer>
  );
};

export default SearchScreen;
