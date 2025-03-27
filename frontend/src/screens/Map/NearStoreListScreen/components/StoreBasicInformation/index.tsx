import React, {RefObject, useState} from 'react';

import {
  Dimensions,
  NativeScrollEvent,
  NativeSyntheticEvent,
} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';

import {StoreBasicInformationType} from './types';
import {AGE_MARKERS, DAY} from '../../../../../constants/constants';
import {IC_COMMENT, IC_YELLOW_STAR} from '../../../../../constants/icons';

import * as S from './styles';

const {width} = Dimensions.get('window');

const CURRENT_DAY = new Date().getDay();

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
          {store.imageUrls.map((imageUrl, idx) => (
            <S.ImageContainer key={idx}>
              <S.StoreImage source={{uri: imageUrl}} />
            </S.ImageContainer>
          ))}
        </ScrollView>
        <S.ImageIndicatorContainer>
          <S.ImageIndicator>
            <S.ImageCurrentIndex>{currentIndex + 1}</S.ImageCurrentIndex>/
            {store.imageUrls.length}
          </S.ImageIndicator>
        </S.ImageIndicatorContainer>
      </S.CarouselContainer>

      <S.DetailContainer>
        <S.FirstRowContainer>
          <S.StoreName>{store.title}</S.StoreName>
          <S.StoreCategory>{store.category}</S.StoreCategory>
          <S.AgeMarkerContainer>
            {store.ages.map((age, idx) => (
              <S.AgeMarker
                key={idx}
                source={AGE_MARKERS[age]}
                $ageIndex={idx}
              />
            ))}
          </S.AgeMarkerContainer>
          {store.isOKZone && (
            <S.OKZoneMarker>
              <S.OKZoneText>OK Zone</S.OKZoneText>
            </S.OKZoneMarker>
          )}
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
              {store.businessHour[DAY[CURRENT_DAY]]}
            </S.BusinessHour>
          </S.BusinessHourContainer>
        )}
      </S.DetailContainer>
    </S.StoreBasicInformationContainer>
  );
};

export default StoreBasicInformation;
