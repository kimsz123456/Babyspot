import React, {RefObject, useState} from 'react';

import {
  Dimensions,
  NativeScrollEvent,
  NativeSyntheticEvent,
} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';

import {MyReviewInformationType} from './types';
import {AGE_MARKERS} from '../../../../../constants/constants';
import {
  IC_GRAY_STAR,
  IC_HEART,
  IC_YELLOW_STAR,
} from '../../../../../constants/icons';

import * as S from './styles';

const {width} = Dimensions.get('window');

interface MyReviewInformationProps {
  store: MyReviewInformationType;
  imageCarouselRef: RefObject<ScrollView | null>;
}

const MyReviewInformation = ({
  store,
  imageCarouselRef,
}: MyReviewInformationProps) => {
  const totalImages = store.imageUrls.length;
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleScroll = (e: NativeSyntheticEvent<NativeScrollEvent>) => {
    const contentOffsetX = e.nativeEvent.contentOffset.x;
    const index = Math.round(contentOffsetX / width);

    setCurrentIndex(index);
  };

  return (
    <S.MyReviewInformationContainer>
      <S.DetailContainer>
        <S.FirstRowContainer>
          <S.StoreName>{store.name}</S.StoreName>
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
            <S.RatingText>내 별점</S.RatingText>
            <S.Rating>{store.rating}.0</S.Rating>
            {[...Array(5)].map((_, i) => (
              <S.SmallIcon
                key={i}
                source={i < store.rating ? IC_YELLOW_STAR : IC_GRAY_STAR}
              />
            ))}
          </S.RatingContainer>
        </S.SecondRowContainer>
        <S.ReviewText>{store.review}</S.ReviewText>
      </S.DetailContainer>

      <S.ImageContainer>
        {totalImages > 4 ? (
          <>
            {store.imageUrls.slice(0, 3).map((imageUrl, idx) => (
              <S.Images key={idx} source={{uri: imageUrl}} />
            ))}
            <S.OverlayWrapper key="overlay">
              <S.Images source={{uri: store.imageUrls[3]}} />
              <S.OverlayText>+{totalImages - 4}</S.OverlayText>
            </S.OverlayWrapper>
          </>
        ) : (
          store.imageUrls.map((imageUrl, idx) => (
            <S.Images key={idx} source={{uri: imageUrl}} />
          ))
        )}
      </S.ImageContainer>

      <S.LastRowContainer>
        <S.LikesContainer>
          <S.LikeIcon source={IC_HEART} />
          <S.Likes>{store.likes}</S.Likes>
        </S.LikesContainer>
        <S.Date>{store.date}</S.Date>
      </S.LastRowContainer>
    </S.MyReviewInformationContainer>
  );
};

export default MyReviewInformation;
