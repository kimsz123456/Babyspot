import React from 'react';
import * as S from './styles';
import {IC_YELLOW_STAR} from '../../../../../constants/icons';
import {ReviewType} from '../../../../../services/reviewService.ts';

interface MyReviewProps {
  review: ReviewType;
}

const MyReview = ({review}: MyReviewProps) => {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return `${date.getFullYear()}.${String(date.getMonth() + 1).padStart(
      2,
      '0',
    )}.${String(date.getDate()).padStart(2, '0')}`;
  };

  return (
    <S.ReviewContainer>
      <S.ReviewTitleContainer>
        <S.ReviewTitle>{review.storeName}</S.ReviewTitle>
        <S.ReviewScoreContainer>
          <S.ReviewStar source={IC_YELLOW_STAR} />
          <S.ReviewScore>{review.rating}</S.ReviewScore>
        </S.ReviewScoreContainer>
        <S.ReviewDate>{formatDate(review.createdAt)}</S.ReviewDate>
      </S.ReviewTitleContainer>
      <S.ReviewContents>{review.content}</S.ReviewContents>
    </S.ReviewContainer>
  );
};

export default MyReview;
