import React, {useEffect} from 'react';
import {useFocusEffect} from '@react-navigation/native';
import MyReview from '../MyReview';
import * as S from './styles.ts';
import {getMyReviews} from '../../../../../services/reviewService.ts';
import NoDataContainer from '../../../../../components/atoms/NoDataContainer/index.tsx';
import {useGlobalStore} from '../../../../../stores/globalStore';
import {sortReview} from '../../../../../utils/sortReview';

export const MyReviewList = () => {
  const {
    myReviews,
    setMyReviews,
    shouldRefreshReviews,
    setShouldRefreshReviews,
  } = useGlobalStore();

  const fetchMyReviews = async () => {
    try {
      const response = await getMyReviews();
      const lastThreeReviews = sortReview(response.content).slice(0, 3);
      setMyReviews(lastThreeReviews);
      setShouldRefreshReviews(false);
    } catch (error) {
      throw error;
    }
  };

  useFocusEffect(
    React.useCallback(() => {
      fetchMyReviews();
    }, []),
  );

  useEffect(() => {
    if (shouldRefreshReviews) {
      fetchMyReviews();
    }
  }, [shouldRefreshReviews]);

  if (myReviews.length === 0) {
    return <NoDataContainer text="작성한 리뷰가 없습니다." />;
  }

  return (
    <S.ReviewListContainer>
      {myReviews.map(review => (
        <MyReview key={review.reviewId} review={review} />
      ))}
    </S.ReviewListContainer>
  );
};
