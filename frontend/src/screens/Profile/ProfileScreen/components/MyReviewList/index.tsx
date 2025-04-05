import React, {useEffect} from 'react';
import MyReview from '../MyReview';
import * as S from './styles.ts';
import {getMyReviews} from '../../../../../services/reviewService.ts';
import NoDataContainer from '../../../../../components/atoms/NoDataContainer/index.tsx';
import {useGlobalStore} from '../../../../../stores/globalStore';

export const MyReviewList = () => {
  const {
    myReviews,
    setMyReviews,
    shouldRefreshReviews,
    setShouldRefreshReviews,
  } = useGlobalStore();

  useEffect(() => {
    const fetchMyReviews = async () => {
      try {
        const response = await getMyReviews({
          page: 0,
          size: 3,
        });
        const sortedReviews = response.content.sort(
          (a, b) =>
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
        );
        setMyReviews(sortedReviews);
        setShouldRefreshReviews(false);
      } catch (error) {
        throw error;
      }
    };

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
