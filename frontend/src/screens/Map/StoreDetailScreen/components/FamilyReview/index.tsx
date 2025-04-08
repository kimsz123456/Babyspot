import React, {useState} from 'react';
import * as S from './styles';
import {Sentiment} from '../../../../../services/mapService';
import NoDataContainer from '../../../../../components/atoms/NoDataContainer';

export interface FamilyReviewProps extends Sentiment {}

const MAX_CONTENT_LENGTH = 5;

const FamilyReview = (props: FamilyReviewProps) => {
  return (
    <S.FamilyReviewContainer>
      <S.TitleContainer>
        <S.Title>{`패밀리 리뷰`}</S.Title>
        <S.TitleCaption>{`아이와 함께한 가족의 리뷰에요.`}</S.TitleCaption>
      </S.TitleContainer>
      <S.ReviewByEmotionSection>
        <S.EmotionTitle $isPositive={true}>{`긍정`}</S.EmotionTitle>
        {props.positive.length == 0 ? (
          <NoDataContainer text="리뷰가 없습니다." />
        ) : (
          <>
            <S.SummaryText>{`❝ ${props.positiveSummary} ❞`}</S.SummaryText>
            <S.ReviewTextContainer>
              {props.positive
                .slice(0, MAX_CONTENT_LENGTH)
                .map((review, index) => {
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
          <NoDataContainer text="리뷰가 없습니다." />
        ) : (
          <>
            <S.SummaryText>{`❝ ${props.negativeSummary} ❞`}</S.SummaryText>
            <S.ReviewTextContainer>
              {props.negative
                .slice(0, MAX_CONTENT_LENGTH)
                .map((review, index) => {
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
