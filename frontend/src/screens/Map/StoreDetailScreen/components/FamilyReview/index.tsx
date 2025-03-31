import React from 'react';
import * as S from './styles';

export interface FamilyReviewProps {
  positiveSummary: string;
  positiveReviews: string[];
  negativeSummary: string;
  negativeReviews: string[];
}

const FamilyReview = (props: FamilyReviewProps) => {
  return (
    <S.FamilyReviewContainer>
      <S.Title>{`패밀리 리뷰`}</S.Title>
      <S.ReviewByEmotionSection>
        <S.EmotionTitle $isPositive={true}>{`긍정`}</S.EmotionTitle>
        <S.SummaryText>{props.positiveSummary}</S.SummaryText>
        <S.ReviewTextContainer>
          {props.positiveReviews.map((review, index) => {
            return (
              <S.ReviewText key={index} $isPositive={true}>
                {review}
              </S.ReviewText>
            );
          })}
        </S.ReviewTextContainer>
      </S.ReviewByEmotionSection>
      <S.ReviewByEmotionSection>
        <S.EmotionTitle $isPositive={false}>{`부정`}</S.EmotionTitle>
        <S.SummaryText>{props.negativeSummary}</S.SummaryText>
        <S.ReviewTextContainer>
          {props.negativeReviews.map((review, index) => {
            return (
              <S.ReviewText key={index} $isPositive={false}>
                {review}
              </S.ReviewText>
            );
          })}
        </S.ReviewTextContainer>
      </S.ReviewByEmotionSection>
    </S.FamilyReviewContainer>
  );
};

export default FamilyReview;
