import React, {useEffect, useState} from 'react';
import MyReview from '../MyReview';
import * as S from './styles.ts';
import {
  getMyReviews,
  ReviewType,
} from '../../../../../services/reviewService.ts';
import NoDataContainer from '../../../../../components/atoms/NoDataContainer/index.tsx';

export const MyReviewList = () => {
  const [reviews, setReviews] = useState<ReviewType[]>([]);

  useEffect(() => {
    const fetchMyReviews = async () => {
      try {
        const response = await getMyReviews({
          page: 0,
          size: 3,
        });
        setReviews(response.content);
      } catch (error) {
        throw error;
      }
    };
    fetchMyReviews();
  }, []);

  if (reviews.length === 0) {
    return <NoDataContainer text="작성한 리뷰가 없습니다." />;
  }

  return (
    <S.ReviewListContainer>
      {reviews.map(review => (
        <MyReview key={review.reviewId} review={review} />
      ))}
    </S.ReviewListContainer>
  );
};
