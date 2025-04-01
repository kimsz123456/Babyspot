import React, {useState} from 'react';
import * as S from './styles';
import ReviewCard, {ReviewCardProps} from '../Review/ReviewCard';
import {useMapNavigation} from '../../../../../hooks/useNavigationHooks';
import StarRating from '../../../../../components/atoms/StarRating';
interface MyReviewProps {
  storeName: string;
  review: ReviewCardProps | null;
}
const MyReview = ({storeName, review}: MyReviewProps) => {
  const navigation = useMapNavigation();

  const [rating, setRating] = useState(0);
  return (
    <S.MyReviewContainer>
      {review ? (
        <>
          <ReviewCard {...review} isMine />
        </>
      ) : (
        <>
          <S.ReviewTextContainer>
            <S.ReviewText>{`방문 후기를 남겨주세요`}</S.ReviewText>
            <S.MyReviewText>{`${rating} / 5.0`}</S.MyReviewText>
          </S.ReviewTextContainer>
          <S.StarContainer>
            <StarRating
              rating={rating}
              starSize={51}
              ratingPressed={rating => {
                setRating(rating);
                navigation.navigate('WriteReviewScreen', {storeName, rating});
              }}
            />
          </S.StarContainer>
        </>
      )}
    </S.MyReviewContainer>
  );
};

export default MyReview;
