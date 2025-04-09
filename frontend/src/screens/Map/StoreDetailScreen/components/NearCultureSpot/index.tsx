import React, {useMemo} from 'react';
import * as S from './styles';
import {
  ConvenienceCategoryTypes,
  ConveniencePlace,
} from '../../../../../services/mapService';
import {ImageRequireSource, Linking} from 'react-native';
import {
  IC_MOVIE,
  IC_MUSEUM,
  IC_RIGHT_ARROW,
  IC_SCENIC,
  IC_TOURIST,
} from '../../../../../constants/icons';
import showToastMessage from '../../../../../utils/showToastMessage';

interface NearCultureSpotProps {
  conveniencePlaces: ConveniencePlace[];
}

const NearCultureSpot = ({conveniencePlaces}: NearCultureSpotProps) => {
  const handleCardPress = async (link: string) => {
    const supported = await Linking.canOpenURL(link);

    if (supported) {
      await Linking.openURL(link);
    } else {
      showToastMessage('링크를 열 수 없습니다.');
    }
  };

  return (
    <S.NearCultureSpotContainer>
      <S.TitleContainer>
        <S.Title>{`주변 문화시설`}</S.Title>
        <S.Caption>{`아이와 함께 갈 수 있는 문화시설들이에요.`}</S.Caption>
      </S.TitleContainer>
      <S.SpotCardListContainer>
        {conveniencePlaces.map((places, index) => {
          const {distanceText, icon} = useMemo(() => {
            let distanceText: string;
            let icon: ImageRequireSource;

            if (places.distance >= 1000) {
              distanceText = `${Math.round(places.distance / 10) / 100}km`;
            } else {
              distanceText = `${places.distance}m`;
            }

            switch (places.category) {
              case ConvenienceCategoryTypes.Performance:
                icon = IC_MOVIE;
                break;
              case ConvenienceCategoryTypes.Museum:
                icon = IC_MUSEUM;
                break;
              case ConvenienceCategoryTypes.Tourist:
                icon = IC_TOURIST;
                break;
              case ConvenienceCategoryTypes.ScenicSpot:
                icon = IC_SCENIC;
                break;
              default:
                icon = IC_MOVIE;
                break;
            }
            return {distanceText, icon};
          }, []);

          return (
            <S.SpotCardContainer
              key={index}
              onPress={() => {
                if (places.link) {
                  places.link && handleCardPress(places.link);
                } else {
                  showToastMessage('해당 가게는 링크를 제공하지 않습니다.');
                }
              }}>
              <S.CategoryTypeContainer>
                <S.CardCategoryText>{places.category}</S.CardCategoryText>
                <S.CategoryIconContainer>
                  <S.CategoryIcon source={icon} />
                </S.CategoryIconContainer>
              </S.CategoryTypeContainer>
              <S.CardBodyContainer>
                <S.CardTitle numberOfLines={2}>{places.title}</S.CardTitle>
                <S.CardDistanceText>{distanceText}</S.CardDistanceText>
              </S.CardBodyContainer>
              <S.ArrowIcon source={IC_RIGHT_ARROW} />
            </S.SpotCardContainer>
          );
        })}
      </S.SpotCardListContainer>
    </S.NearCultureSpotContainer>
  );
};

export default NearCultureSpot;
