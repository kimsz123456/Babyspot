import React, {useState} from 'react';
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
          {props.positiveReviews.slice(0, 5).map((review, index) => {
            const [isFold, setIsFold] = useState(true);

            return (
              <S.ReviewTextButton
                key={index}
                onPress={() => {
                  setIsFold(!isFold);
                }}>
                <S.ReviewText
                  $isPositive={true}
                  numberOfLines={isFold ? 2 : undefined}
                  ellipsizeMode="tail">
                  {review}
                </S.ReviewText>
              </S.ReviewTextButton>
            );
          })}
        </S.ReviewTextContainer>
      </S.ReviewByEmotionSection>
      <S.ReviewByEmotionSection>
        <S.EmotionTitle $isPositive={false}>{`부정`}</S.EmotionTitle>
        <S.SummaryText>{props.negativeSummary}</S.SummaryText>
        <S.ReviewTextContainer>
          {props.negativeReviews.slice(0, 5).map((review, index) => {
            const [isFold, setIsFold] = useState(true);

            return (
              <S.ReviewTextButton
                key={index}
                onPress={() => {
                  setIsFold(!isFold);
                }}>
                <S.ReviewText
                  $isPositive={false}
                  numberOfLines={isFold ? 2 : undefined}
                  ellipsizeMode="tail">
                  {review}
                </S.ReviewText>
              </S.ReviewTextButton>
            );
          })}
        </S.ReviewTextContainer>
      </S.ReviewByEmotionSection>
    </S.FamilyReviewContainer>
  );
};

export default FamilyReview;
