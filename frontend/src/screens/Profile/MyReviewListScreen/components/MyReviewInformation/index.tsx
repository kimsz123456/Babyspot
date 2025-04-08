import React, {useState} from 'react';
import {
  IC_GRAY_STAR,
  IC_HEART,
  IC_YELLOW_STAR,
} from '../../../../../constants/icons';

import * as S from './styles';
import {ReviewType} from '../../../../../services/reviewService';
import {useProfileNavigation} from '../../../../../hooks/useNavigationHooks';

interface MyReviewInformationProps {
  review: ReviewType;
}

const MyReviewInformation = ({review}: MyReviewInformationProps) => {
  const totalImages = review.imgUrls.length;
  const navigation = useProfileNavigation();
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <S.MyReviewInformationContainer>
      <S.DetailContainer>
        <S.TitleContainer>
          <S.FirstRowContainer>
            <S.StoreName>{review.storeName}</S.StoreName>
            <S.StoreCategory>{review.category}</S.StoreCategory>
            {review.okZone && (
              <S.OKZoneMarker>
                <S.OKZoneText>OK Zone</S.OKZoneText>
              </S.OKZoneMarker>
            )}
          </S.FirstRowContainer>
          <S.EditTextContainer
            onPress={() => {
              navigation.navigate('WriteReviewScreen', {review: review});
            }}>
            <S.EditText>수정</S.EditText>
          </S.EditTextContainer>
        </S.TitleContainer>
        <S.SecondRowContainer>
          <S.RatingContainer>
            <S.RatingText>내 별점</S.RatingText>
            <S.Rating>{review.rating}.0</S.Rating>
            {[...Array(5)].map((_, i) => (
              <S.SmallIcon
                key={i}
                source={i < review.rating ? IC_YELLOW_STAR : IC_GRAY_STAR}
              />
            ))}
          </S.RatingContainer>
        </S.SecondRowContainer>
        <S.ReviewTextContainer onPress={() => setIsExpanded(!isExpanded)}>
          <S.ReviewText numberOfLines={isExpanded ? undefined : 2}>
            {review.content}
          </S.ReviewText>
        </S.ReviewTextContainer>
      </S.DetailContainer>

      <S.ImageContainer>
        {totalImages > 4 ? (
          <>
            {review.imgUrls.slice(0, 3).map((imageUrl, idx) => (
              <S.Images
                key={`image-${review.reviewId}-${idx}`}
                source={{uri: imageUrl}}
              />
            ))}
            <S.OverlayWrapper key={`overlay-${review.reviewId}`}>
              <S.Images source={{uri: review.imgUrls[3]}} />
              <S.OverlayText>+{totalImages - 4}</S.OverlayText>
            </S.OverlayWrapper>
          </>
        ) : (
          review.imgUrls.map((imageUrl, idx) => (
            <S.Images
              key={`image-${review.reviewId}-${idx}`}
              source={{uri: imageUrl}}
            />
          ))
        )}
      </S.ImageContainer>

      <S.LastRowContainer>
        <S.LikesContainer>
          <S.LikeIcon source={IC_HEART} />
          <S.Likes>{review.likeCount}</S.Likes>
        </S.LikesContainer>
        <S.Date>{review.createdAt}</S.Date>
      </S.LastRowContainer>
    </S.MyReviewInformationContainer>
  );
};

export default MyReviewInformation;
