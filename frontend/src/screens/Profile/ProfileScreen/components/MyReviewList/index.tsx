import React, {useEffect, useState} from 'react';
import MyReview from '../MyReview';
import * as S from './styles.ts';
import {
  getMyReviews,
  ReviewType,
} from '../../../../../services/reviewService.ts';
import NoDataContainer from '../../../../../components/atoms/NoDataContainer/index.tsx';
import {useFocusEffect} from '@react-navigation/native';

export const MyReviewList = () => {
  const [reviews, setReviews] = useState<ReviewType[]>([]);

  useFocusEffect(
    React.useCallback(() => {
      const fetchMyReviews = async () => {
        try {
          console.log('리렌더링');
          const response = await getMyReviews({
            page: 0,
            size: 3,
          });
          const sortedReviews = response.content.sort(
            (a, b) =>
              new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
          );
          setReviews(sortedReviews);
        } catch (error) {
          throw error;
        }
      };
      fetchMyReviews();
    }, []),
  );

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
