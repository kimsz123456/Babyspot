import React, {RefObject, useState} from 'react';
import {
  Dimensions,
  NativeScrollEvent,
  NativeSyntheticEvent,
} from 'react-native';

import {ScrollView} from 'react-native-gesture-handler';
import Config from 'react-native-config';

import OKZoneMarker from '../../../../../components/atoms/OKZoneMarker';

import {StoreBasicInformationType} from './types';
import {AGE_MARKERS, DAY} from '../../../../../constants/constants';
import {IC_COMMENT, IC_YELLOW_STAR} from '../../../../../constants/icons';

import * as S from './styles';
import {IMG_DEFAULT_STORE} from '../../../../../constants/images';

const {width} = Dimensions.get('window');

const CURRENT_DAY = new Date().getDay();
const CLOUDFRONT_PREFIX = Config.CLOUDFRONT_PREFIX;

interface StoreBasicInformationProps {
  store: StoreBasicInformationType;
  imageCarouselRef?: RefObject<ScrollView | null>;
  isShownBusinessHour?: boolean;
}

const StoreBasicInformation = ({
  store,
  imageCarouselRef,
  isShownBusinessHour,
}: StoreBasicInformationProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const haveBabyAges = store.babyAges && store.babyAges.length > 0;

  const handleScroll = (e: NativeSyntheticEvent<NativeScrollEvent>) => {
    const contentOffsetX = e.nativeEvent.contentOffset.x;
    const index = Math.round(contentOffsetX / width);

    setCurrentIndex(index);
  };

  return (
    <S.StoreBasicInformationContainer>
      <S.CarouselContainer>
        <ScrollView
          ref={imageCarouselRef}
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          onScroll={handleScroll}
          scrollEventThrottle={16}>
          {store.images.length > 0 ? (
            store.images.map((image, idx) => (
              <S.ImageContainer key={idx}>
                <S.StoreImage
                  source={{uri: `${CLOUDFRONT_PREFIX}${image.storeImg}`}}
                />
              </S.ImageContainer>
            ))
          ) : (
            <S.ImageContainer>
              <S.StoreImage source={IMG_DEFAULT_STORE} />
            </S.ImageContainer>
          )}
        </ScrollView>
        {store.images.length > 0 && (
          <S.ImageIndicatorContainer>
            <S.ImageIndicator>
              <S.ImageCurrentIndex>{currentIndex + 1}</S.ImageCurrentIndex>/
              {store.images.length}
            </S.ImageIndicator>
          </S.ImageIndicatorContainer>
        )}
      </S.CarouselContainer>

      <S.DetailContainer>
        <S.FirstRowContainer>
          <S.StoreName>{store.title}</S.StoreName>
          <S.StoreCategory>{store.category}</S.StoreCategory>
          {haveBabyAges && (
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

        {isShownBusinessHour && (
          <S.BusinessHourContainer>
            <S.Day>{DAY[CURRENT_DAY]}</S.Day>
            <S.BusinessHour>
              {store.businessHour[DAY[CURRENT_DAY].slice(0, 1)]}
            </S.BusinessHour>
          </S.BusinessHourContainer>
        )}
      </S.DetailContainer>
    </S.StoreBasicInformationContainer>
  );
};

export default StoreBasicInformation;
