import React, {useState} from 'react';
import * as S from './styles';
import {RouteProp, useRoute} from '@react-navigation/native';
import {MapStackParamList} from '../../../navigation/MapStackNavigator';
import {IC_NAVER_BLOG, IC_NAVER_PLACE} from '../../../constants/icons';
import {ReviewFromTypes} from '../StoreDetailScreen/components/Keyword';
import {TouchableOpacity} from 'react-native';
import {withDivider} from '../../../utils/withDivider';
import {ThinDivider} from '../../../components/atoms/Divider';

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
          {withDivider(
            [
              ...keywordInformation.keywordReviews.map((review, index) => {
                const [isFold, setIsFold] = useState(true);

                let iconImage;
                switch (review.reviewFrom) {
                  case ReviewFromTypes.Blog:
                    iconImage = IC_NAVER_BLOG;
                    break;

                  case ReviewFromTypes.Place:
                    iconImage = IC_NAVER_PLACE;
                    break;
                }

                return (
                  <S.ReviewContainer
                    key={index}
                    onPress={() => {
                      setIsFold(!isFold);
                    }}>
                    <S.IconImage source={iconImage} resizeMode="contain" />
                    <S.ContentText
                      numberOfLines={isFold ? 2 : undefined}
                      ellipsizeMode="tail">
                      {review.content}
                    </S.ContentText>
                  </S.ReviewContainer>
                );
              }),
            ],
            <ThinDivider />,
          )}
        </S.ReviewListContainer>
      </S.KeywordReviewContainer>
    </S.ScrollViewContainer>
  );
};

export default KeywordReviewScreen;
