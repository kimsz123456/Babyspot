import React, {useState} from 'react';
import * as S from './styles';
import {ToastAndroid, View} from 'react-native';
import AgeButton from '../../../components/atoms/AgeButton';
import scale from '../../../utils/scale';
import {AgeProps} from '../ReviewListScreen/ReviewFilterModal';
import MainButton from '../../../components/atoms/Button/MainButton';
import {useMapNavigation} from '../../../hooks/useNavigationHooks';

const MAX_SELECT_COUNT = 3;
const INITIAL_AGES: AgeProps[] = Array.from({length: 7}, (_, index) => ({
  age: index + 1,
  isSelected: false,
}));

const SelectRecommendationAgeScreen = () => {
  const [ages, setAges] = useState(INITIAL_AGES);

  const navigation = useMapNavigation();

  const selectedCount = ages.filter(age => age.isSelected).length;

  return (
    <S.SelectRecommendationAgeScreenContainer>
      <View>
        <S.TextContainer>
          <S.Title>{`아이들 나이를 바탕으로,\n주변 가게를 추천해드릴게요.`}</S.Title>
          <S.SubTitle $isBold={false}>
            {`출생 이후 1살인 `}
            <S.SubTitle $isBold={true}>{`세는 나이`}</S.SubTitle>
            {`가 기준이에요.`}
          </S.SubTitle>
        </S.TextContainer>

        <S.IconListContainer
          data={ages}
          numColumns={4}
          keyExtractor={(_, index) => index.toString()}
          columnWrapperStyle={{gap: scale(4), justifyContent: 'center'}}
          contentContainerStyle={{gap: scale(16)}}
          renderItem={({item}) => (
            <AgeButton
              age={item.age}
              isSelected={item.isSelected}
              onPressed={() => {
                const selectedCount = ages.filter(age => age.isSelected).length;

                if (selectedCount >= MAX_SELECT_COUNT && !item.isSelected) {
                  ToastAndroid.show(
                    '최대 3개만 선택 가능합니다.',
                    ToastAndroid.SHORT,
                  );

                  return;
                }

                setAges(prev => {
                  return prev.map(age => {
                    return age.age == item.age
                      ? {...age, isSelected: !age.isSelected}
                      : age;
                  });
                });
              }}
            />
          )}
        />
      </View>
      <MainButton
        disabled={selectedCount == 0}
        text={'추천 받기'}
        onPress={() => {
          navigation.pop();
        }}
      />
    </S.SelectRecommendationAgeScreenContainer>
  );
};

export default SelectRecommendationAgeScreen;
