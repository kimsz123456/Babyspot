import React from 'react';
import * as S from './styles';
import {RouteProp, useRoute} from '@react-navigation/native';
import {MapStackParamList} from '../../../navigation/MapStackNavigator';
import {
  IC_NAVER_BLOG,
  IC_NAVER_CAFE,
  IC_NAVER_PLACE,
} from '../../../constants/icons';

type KeywordReviewScreenRouteProp = RouteProp<
  MapStackParamList,
  'KeywordReview'
>;

const KeywordReviewScreen = () => {
  const route = useRoute<KeywordReviewScreenRouteProp>();
  const {keywordInformation} = route.params;

  return (
    <S.ScrollViewContainer>
      <S.KeywordReviewContainer>
        <S.TextContainer>
          <S.Title>{keywordInformation.keyword}</S.Title>
          <S.CountText>{keywordInformation.count}</S.CountText>
        </S.TextContainer>

        <S.ReviewListContainer>
          {keywordInformation.keywordReviews.map((review, index) => {
            let iconImage;
            switch (review.reviewFrom) {
              case 'blog':
                iconImage = IC_NAVER_BLOG;
                break;

              case 'place':
                iconImage = IC_NAVER_PLACE;
                break;

              case 'cafe':
                iconImage = IC_NAVER_CAFE;

                break;
            }

            return (
              <S.ReviewContainer key={index}>
                <S.IconImage source={iconImage} resizeMode="contain" />
                <S.ContentText>{review.content}</S.ContentText>
              </S.ReviewContainer>
            );
          })}
        </S.ReviewListContainer>
      </S.KeywordReviewContainer>
    </S.ScrollViewContainer>
  );
};

export default KeywordReviewScreen;
