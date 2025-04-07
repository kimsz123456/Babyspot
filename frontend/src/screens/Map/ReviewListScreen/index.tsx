/* eslint-disable react-hooks/exhaustive-deps */

import React, {useEffect, useState} from 'react';
import * as S from './styles';
import {RouteProp, useRoute} from '@react-navigation/native';
import {MapStackParamList} from '../../../navigation/MapStackNavigator';
import ReviewCard from '../StoreDetailScreen/components/Review/ReviewCard';
import {TouchableOpacity} from 'react-native';
import {ThinDivider} from '../../../components/atoms/Divider';
import MoreButtonWithDivider from '../../../components/atoms/MoreButtonWithDivider';
import {IC_YELLOW_STAR, IC_COMMENT, IC_FILTER} from '../../../constants/icons';
import {withDivider} from '../../../utils/withDivider';
import ReviewFilterModal from './ReviewFilterModal';
import {
  getStoreReviews,
  ReviewResponseType,
} from '../../../services/reviewService';

type StoreDetailRouteProp = RouteProp<MapStackParamList, 'ReviewListScreen'>;

const ReviewListScreen = () => {
  const route = useRoute<StoreDetailRouteProp>();
  const {storeId} = route.params;
  const [modalOpened, setModalOpened] = useState(false);
  const [selectedAges, setSelectedAges] = useState<number[]>([]);
  const [reviews, setReviews] = useState<ReviewResponseType['content']>([]);
  const [totalElements, setTotalElements] = useState(0);
  const [displayedReviews, setDisplayedReviews] = useState<
    ReviewResponseType['content']
  >([]);
  const [filteredReviews, setFilteredReviews] = useState<
    ReviewResponseType['content']
  >([]);

  const filteredAges = route.params.filterAges;
  const PAGE_SIZE = 4;

  const calculateFilteredReviews = (
    reviews: ReviewResponseType['content'],
    ages: number[],
  ) => {
    if (ages.length === 0) {
      return reviews;
    }
    return reviews.filter(review =>
      review.babyAges.some(age => ages.includes(age)),
    );
  };

  const calculateAverageRating = () => {
    if (reviews.length === 0) {
      return 0;
    }
    const sum = reviews.reduce((acc, review) => acc + review.rating, 0);
    return (sum / reviews.length).toFixed(1);
  };

  const fetchReviews = async () => {
    try {
      const response = await getStoreReviews(storeId);

      setReviews(response.content);
      setTotalElements(response.totalElements);
      setDisplayedReviews(response.content.slice(0, PAGE_SIZE));
      setFilteredReviews(response.content);
    } catch (error) {
      throw error;
    }
  };

  useEffect(() => {
    fetchReviews();
  }, [storeId]);

  useEffect(() => {
    if (filteredAges) {
      setSelectedAges(filteredAges);
    }
  }, [filteredAges]);

  useEffect(() => {
    const filtered = calculateFilteredReviews(reviews, selectedAges);
    setFilteredReviews(filtered);
    setDisplayedReviews(filtered.slice(0, PAGE_SIZE));
  }, [selectedAges, reviews]);

  const handleMoreButtonPress = () => {
    const currentLength = displayedReviews.length;
    const nextReviews = filteredReviews.slice(
      currentLength,
      currentLength + PAGE_SIZE,
    );
    setDisplayedReviews([...displayedReviews, ...nextReviews]);
  };

  return (
    <>
      <S.ReviewListScreenScrollView>
        <S.ReviewContainer>
          <S.TitleHeaderContainer>
            <S.TitleInformationContainer>
              <S.Title>{'리뷰'}</S.Title>
              <S.InformationListContainer>
                <S.InformationContainer>
                  <S.InformationIconImage source={IC_YELLOW_STAR} />
                  <S.InformationText
                    $isStar>{`별점 ${calculateAverageRating()}`}</S.InformationText>
                </S.InformationContainer>
                <S.InformationContainer>
                  <S.InformationIconImage source={IC_COMMENT} />
                  <S.InformationText $isStar={false}>
                    {`리뷰 ${totalElements}개`}
                  </S.InformationText>
                </S.InformationContainer>
              </S.InformationListContainer>
            </S.TitleInformationContainer>
            <TouchableOpacity
              onPress={() => {
                setModalOpened(true);
              }}>
              <S.FilterIconImage source={IC_FILTER} />
            </TouchableOpacity>
          </S.TitleHeaderContainer>
          <S.ReviewCardListContainer>
            {filteredReviews.length > 0 ? (
              withDivider(
                displayedReviews.map((review, index) => (
                  <ReviewCard key={index} {...review} />
                )),
                <ThinDivider />,
              )
            ) : (
              <S.NoReviewText> 리뷰가 없습니다. </S.NoReviewText>
            )}
          </S.ReviewCardListContainer>

          {filteredReviews.length > PAGE_SIZE &&
            displayedReviews.length < filteredReviews.length && (
              <MoreButtonWithDivider
                onPressed={handleMoreButtonPress}
                isOpened={false}
                openedText={'리뷰 접기'}
                closedText={'리뷰 더 보기'}
              />
            )}
        </S.ReviewContainer>
      </S.ReviewListScreenScrollView>
      <ReviewFilterModal
        modalOpened={modalOpened}
        setModalOpened={setModalOpened}
        selectedAge={selectedAges}
        setSelectedAge={setSelectedAges}
      />
    </>
  );
};

export default ReviewListScreen;
