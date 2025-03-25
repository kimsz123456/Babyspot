import React from 'react';
import MyReview from '../MyReview';
import * as S from './styles.ts';
import mockReviews from '../../mock/mockData.ts';

const MyReviewList = () => {
  return (
    <S.ReviewListContainer>
      {mockReviews.map(review => (
        <MyReview key={review.id} review={review} />
      ))}
    </S.ReviewListContainer>
  );
};

export default MyReviewList;
