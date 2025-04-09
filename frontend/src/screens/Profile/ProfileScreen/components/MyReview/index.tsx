import React from 'react';
import * as S from './styles';
import {IC_YELLOW_STAR} from '../../../../../constants/icons';
import {ReviewType} from '../../../../../services/reviewService.ts';

interface MyReviewProps {
  review: ReviewType;
}

const MyReview = ({review}: MyReviewProps) => {
  return (
    <S.ReviewContainer>
      <S.ReviewTitleContainer>
        <S.ReviewTitle>{review.storeName}</S.ReviewTitle>
        <S.ReviewScoreContainer>
          <S.ReviewStar source={IC_YELLOW_STAR} />
          <S.ReviewScore>{review.rating}</S.ReviewScore>
        </S.ReviewScoreContainer>
        <S.ReviewDate>{review.createdAt.slice(0, 10)}</S.ReviewDate>
      </S.ReviewTitleContainer>
      <S.ReviewContents>{review.content}</S.ReviewContents>
    </S.ReviewContainer>
  );
};

export default MyReview;
