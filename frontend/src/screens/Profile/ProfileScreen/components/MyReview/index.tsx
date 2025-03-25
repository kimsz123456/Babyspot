import React from 'react';
import * as S from './styles';
import {IC_YELLOW_STAR} from '../../../../../constants/icons';
import ReviewType from './types';

interface MyReviewProps {
  review: ReviewType;
}

const MyReview: React.FC<MyReviewProps> = ({review}) => {
  return (
    <S.ReviewContainer>
      <S.ReviewTitleContainer>
        <S.ReviewTitle>{review.storeName}</S.ReviewTitle>
        <S.ReviewScoreContainer>
          <S.ReviewStar source={IC_YELLOW_STAR} />
          <S.ReviewScore>{review.score}</S.ReviewScore>
        </S.ReviewScoreContainer>
        <S.ReviewDate>{review.date}</S.ReviewDate>
      </S.ReviewTitleContainer>
      <S.ReviewContents>{review.content}</S.ReviewContents>
    </S.ReviewContainer>
  );
};

export default MyReview;
