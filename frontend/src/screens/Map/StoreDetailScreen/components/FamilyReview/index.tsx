import React, {useState} from 'react';
import * as S from './styles';
import {Sentiment} from '../../../../../services/mapService';
import NoDataContainer from '../../../../../components/atoms/NoDataContainer';

export interface FamilyReviewProps extends Sentiment {}

const FamilyReview = (props: FamilyReviewProps) => {
  return (
    <S.FamilyReviewContainer>
      <S.Title>{`패밀리 리뷰`}</S.Title>
      <S.ReviewByEmotionSection>
        <S.EmotionTitle $isPositive={true}>{`긍정`}</S.EmotionTitle>
        {props.positive.length == 0 ? (
          <NoDataContainer text="해당 가게는 데이터를 준비 중입니다." />
        ) : (
          <>
            <S.SummaryText>{`❝ ${props.positiveSummary} ❞`}</S.SummaryText>
            <S.ReviewTextContainer>
              {props.positive.slice(0, 5).map((review, index) => {
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
          </>
        )}
      </S.ReviewByEmotionSection>
      <S.ReviewByEmotionSection>
        <S.EmotionTitle $isPositive={false}>{`부정`}</S.EmotionTitle>
        {props.negative.length == 0 ? (
          <NoDataContainer text="해당 가게는 데이터를 준비 중입니다." />
        ) : (
          <>
            <S.SummaryText>{`❝ ${props.negativeSummary} ❞`}</S.SummaryText>
            <S.ReviewTextContainer>
              {props.negative.slice(0, 5).map((review, index) => {
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
          </>
        )}
      </S.ReviewByEmotionSection>
    </S.FamilyReviewContainer>
  );
};

export default FamilyReview;
