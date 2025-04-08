import React, {useState} from 'react';
import {
  IC_GRAY_STAR,
  IC_HEART,
  IC_YELLOW_STAR,
} from '../../../../../constants/icons';

import * as S from './styles';
import {ReviewType} from '../../../../../services/reviewService';

interface MyReviewInformationProps {
  reviews: ReviewType;
}

const MyReviewInformation = ({reviews}: MyReviewInformationProps) => {
  const totalImages = reviews.imgUrls.length;
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <S.MyReviewInformationContainer>
      <S.DetailContainer>
        <S.FirstRowContainer>
          <S.StoreName>{reviews.storeName}</S.StoreName>
          <S.StoreCategory>{reviews.category}</S.StoreCategory>
          {reviews.okZone && (
            <S.OKZoneMarker>
              <S.OKZoneText>OK Zone</S.OKZoneText>
            </S.OKZoneMarker>
          )}
        </S.FirstRowContainer>
        <S.SecondRowContainer>
          <S.RatingContainer>
            <S.RatingText>내 별점</S.RatingText>
            <S.Rating>{reviews.rating}.0</S.Rating>
            {[...Array(5)].map((_, i) => (
              <S.SmallIcon
                key={i}
                source={i < reviews.rating ? IC_YELLOW_STAR : IC_GRAY_STAR}
              />
            ))}
          </S.RatingContainer>
        </S.SecondRowContainer>
        <S.ReviewTextContainer onPress={() => setIsExpanded(!isExpanded)}>
          <S.ReviewText numberOfLines={isExpanded ? undefined : 2}>
            {reviews.content}
          </S.ReviewText>
        </S.ReviewTextContainer>
      </S.DetailContainer>

      <S.ImageContainer>
        {totalImages > 4 ? (
          <>
            {reviews.imgUrls.slice(0, 3).map((imageUrl, idx) => (
              <S.Images key={idx} source={{uri: imageUrl}} />
            ))}
            <S.OverlayWrapper key="overlay">
              <S.Images source={{uri: reviews.imgUrls[3]}} />
              <S.OverlayText>+{totalImages - 4}</S.OverlayText>
            </S.OverlayWrapper>
          </>
        ) : (
          reviews.imgUrls.map((imageUrl, idx) => (
            <S.Images key={idx} source={{uri: imageUrl}} />
          ))
        )}
      </S.ImageContainer>

      <S.LastRowContainer>
        <S.LikesContainer>
          <S.LikeIcon source={IC_HEART} />
          <S.Likes>{reviews.likeCount}</S.Likes>
        </S.LikesContainer>
        <S.Date>{reviews.createdAt}</S.Date>
      </S.LastRowContainer>
    </S.MyReviewInformationContainer>
  );
};

export default MyReviewInformation;
