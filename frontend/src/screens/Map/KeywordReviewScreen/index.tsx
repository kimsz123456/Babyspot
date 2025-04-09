import React, {useMemo, useRef, useState} from 'react';
import * as S from './styles';
import {RouteProp, useRoute} from '@react-navigation/native';
import {MapStackParamList} from '../../../navigation/MapStackNavigator';
import {IC_NAVER_BLOG, IC_NAVER_PLACE} from '../../../constants/icons';
import {ReviewFromTypes} from '../StoreDetailScreen/components/Keyword';
import {withDivider} from '../../../utils/withDivider';
import {ThinDivider} from '../../../components/atoms/Divider';
import NoDataContainer from '../../../components/atoms/NoDataContainer';
import {ScrollView} from 'react-native';
import {
  IMG_DINING_CODE,
  IMG_GOOGLE,
  IMG_KAKAO_TALK,
} from '../../../constants/images';

type KeywordReviewScreenRouteProp = RouteProp<
  MapStackParamList,
  'KeywordReview'
>;

const KeywordReviewScreen = () => {
  const route = useRoute<KeywordReviewScreenRouteProp>();
  const {keywordInformation} = route.params;

  const scrollRef = useRef<ScrollView>(null);

  return (
    <S.ScrollViewContainer ref={scrollRef}>
      <S.KeywordReviewContainer>
        <S.TextContainer>
          <S.Title>{keywordInformation.keyword}</S.Title>
          <S.CountText>{keywordInformation.count}</S.CountText>
        </S.TextContainer>

        <S.ReviewListContainer>
          {keywordInformation.keywordReviews.length === 0 ? (
            <NoDataContainer text="키워드에 대한 리뷰를 수집 중입니다." />
          ) : (
            withDivider(
              keywordInformation.keywordReviews.map((review, index) => {
                const [isFold, setIsFold] = useState(true);
                const keyword = keywordInformation.keyword;

                let iconImage;
                switch (review.reviewFrom) {
                  case ReviewFromTypes.Blog:
                    iconImage = IC_NAVER_BLOG;
                    break;
                  case ReviewFromTypes.Place:
                    iconImage = IC_NAVER_PLACE;
                    break;
                  case ReviewFromTypes.DINING_CODE:
                    iconImage = IMG_DINING_CODE;
                    break;
                  case ReviewFromTypes.GOOGLE:
                    iconImage = IMG_GOOGLE;
                    break;
                  case ReviewFromTypes.KAKAO:
                    iconImage = IMG_KAKAO_TALK;
                    break;
                }

                const parsedContent = useMemo(() => {
                  const parts = review.content.split(
                    new RegExp(`(${keyword})`, 'gi'),
                  );
                  return parts.map((part, i) => {
                    if (part.toLowerCase() === keyword.toLowerCase()) {
                      return (
                        <S.HighlightedText key={`highlight-${index}-${i}`}>
                          {part}
                        </S.HighlightedText>
                      );
                    }
                    return (
                      <S.ContentText key={`normal-${index}-${i}`}>
                        {part}
                      </S.ContentText>
                    );
                  });
                }, [review.content, keyword, index]);

                const handlePress = () => {
                  setIsFold(!isFold);

                  if (
                    isFold &&
                    index === keywordInformation.keywordReviews.length - 1
                  ) {
                    setTimeout(() => {
                      scrollRef.current?.scrollToEnd({animated: true});
                    }, 0);
                  }
                };

                return (
                  <S.ReviewContainer key={index} onPress={handlePress}>
                    <S.IconImage source={iconImage} resizeMode="contain" />
                    <S.ContentText
                      numberOfLines={isFold ? 2 : undefined}
                      ellipsizeMode="tail">
                      {parsedContent}
                    </S.ContentText>
                  </S.ReviewContainer>
                );
              }),
              <ThinDivider />,
            )
          )}
        </S.ReviewListContainer>
      </S.KeywordReviewContainer>
    </S.ScrollViewContainer>
  );
};

export default KeywordReviewScreen;
