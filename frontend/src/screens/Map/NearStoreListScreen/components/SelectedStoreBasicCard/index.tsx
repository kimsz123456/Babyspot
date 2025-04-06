import React from 'react';

import Config from 'react-native-config';

import {useMapStore} from '../../../../../stores/mapStore';

import OKZoneMarker from '../../../../../components/atoms/OKZoneMarker';

import {AGE_MARKERS, DAY} from '../../../../../constants/constants';
import {IC_COMMENT, IC_YELLOW_STAR} from '../../../../../constants/icons';

import * as S from './styles';
import {StoreBasicInformationType} from '../StoreBasicInformation/types';
import {useMapNavigation} from '../../../../../hooks/useNavigationHooks';

const CURRENT_DAY = new Date().getDay();
const CLOUDFRONT_PREFIX = Config.CLOUDFRONT_PREFIX;

interface StoreBasicInformationProps {
  store: StoreBasicInformationType;
}

const SelectedStoreBasicCard = ({store}: StoreBasicInformationProps) => {
  const navigation = useMapNavigation();
  const {selectedAges} = useMapStore();

  const haveBabyAges = store.babyAges && store.babyAges.length > 0;

  return (
    <S.StoreBasicInformationContainer
      onPress={() => {
        navigation.navigate('StoreDetail', {storeBasicInformation: store});
      }}>
      <S.DetailContainer>
        <S.FirstRowContainer>
          <S.StoreName>{store.title}</S.StoreName>
          <S.StoreCategory>{store.category}</S.StoreCategory>
          {selectedAges.length > 0 && haveBabyAges && (
            <S.AgeMarkerContainer>
              {store.babyAges.map((age, idx) => (
                <S.AgeMarker
                  key={idx}
                  source={AGE_MARKERS[age]}
                  $ageIndex={idx}
                />
              ))}
            </S.AgeMarkerContainer>
          )}
          {store.okZone && <OKZoneMarker />}
        </S.FirstRowContainer>

        <S.SecondRowContainer>
          <S.RatingContainer>
            <S.SmallIcon source={IC_YELLOW_STAR} />
            <S.Rating>별점 {store.rating}</S.Rating>
          </S.RatingContainer>
          <S.ReviewContainer>
            <S.SmallIcon source={IC_COMMENT} />
            <S.ReviewCount>리뷰 {store.reviewCount}개</S.ReviewCount>
          </S.ReviewContainer>
        </S.SecondRowContainer>

        <S.BusinessHourContainer>
          <S.Day>{DAY[CURRENT_DAY]}</S.Day>
          <S.BusinessHour>
            {store.businessHour[DAY[CURRENT_DAY].slice(0, 1)]}
          </S.BusinessHour>
        </S.BusinessHourContainer>
      </S.DetailContainer>

      <S.ImageContainer>
        {store.images.length > 4 ? (
          <>
            {store.images.slice(0, 3).map((imageUrl, idx) => (
              <S.Images
                key={idx}
                source={{uri: `${CLOUDFRONT_PREFIX}${imageUrl.storeImg}`}}
              />
            ))}
            <S.OverlayWrapper key="overlay">
              <S.Images
                source={{
                  uri: `${CLOUDFRONT_PREFIX}${store.images[3].storeImg}`,
                }}
              />
              <S.OverlayText>+{store.images.length - 4}</S.OverlayText>
            </S.OverlayWrapper>
          </>
        ) : (
          store.images.map((imageUrl, idx) => (
            <S.Images
              key={idx}
              source={{uri: `${CLOUDFRONT_PREFIX}${imageUrl.storeImg}`}}
            />
          ))
        )}
      </S.ImageContainer>
    </S.StoreBasicInformationContainer>
  );
};

export default SelectedStoreBasicCard;
