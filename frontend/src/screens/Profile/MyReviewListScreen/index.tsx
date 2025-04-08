import React, {useEffect, useState} from 'react';
import {ActivityIndicator, View} from 'react-native';
import {useFocusEffect} from '@react-navigation/native';
import * as S from './styles';
import MyReviewInformation from './components/MyReviewInformation';
import {ThinDivider} from '../../../components/atoms/Divider';
import {getMyReviews, ReviewType} from '../../../services/reviewService';
import NoDataContainer from '../../../components/atoms/NoDataContainer';
import {sortReviewsByDate} from '../../../screens/Map/StoreDetailScreen/components/Review';

const MyReviewListScreen = () => {
  const [reviews, setReviews] = useState<ReviewType[]>([]);
  const [page, setPage] = useState(0);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [sortedReviews, setSortedReviews] = useState<ReviewType[]>([]);

  const fetchReviews = async (pageNumber: number) => {
    if (loading || !hasMore) return;

    try {
      setLoading(true);
      const response = await getMyReviews({
        page: pageNumber,
        size: 6,
      });

      if (pageNumber === 0) {
        setReviews(response.content);
      } else {
        setReviews(prev => {
          const newReviews = response.content.filter(
            newReview =>
              !prev.some(
                existingReview =>
                  existingReview.reviewId === newReview.reviewId,
              ),
          );
          return [...prev, ...newReviews];
        });
      }

      setHasMore(response.content.length === 6);
      setPage(pageNumber);
    } catch (error) {
      throw error;
    } finally {
      setLoading(false);
    }
  };

  useFocusEffect(
    React.useCallback(() => {
      setPage(0);
      setHasMore(true);
      fetchReviews(0);
    }, []),
  );

  useEffect(() => {
    const sorted = sortReviewsByDate(reviews);
    setSortedReviews(sorted);
  }, [reviews]);

  const handleLoadMore = () => {
    if (!loading && hasMore) {
      fetchReviews(page + 1);
    }
  };

  const renderFooter = () => {
    if (!loading) return null;
    return (
      <S.LoadingContainer>
        <ActivityIndicator size="large" />
      </S.LoadingContainer>
    );
  };

  const renderSeparator = () => (
    <S.Divider>
      <ThinDivider />
    </S.Divider>
  );

  const renderItem = ({item}: {item: ReviewType}) => (
    <MyReviewInformation review={item} />
  );

  if (sortedReviews.length === 0 && !loading) {
    return (
      <S.BackGround>
        <NoDataContainer text="작성한 리뷰가 없습니다." />
      </S.BackGround>
    );
  }

  return (
    <S.BackGround>
      <View style={{flex: 1}}>
        <S.Wrapper
          data={sortedReviews}
          renderItem={renderItem}
          keyExtractor={item => item.reviewId.toString()}
          ItemSeparatorComponent={renderSeparator}
          onEndReached={handleLoadMore}
          onEndReachedThreshold={0.5}
          ListFooterComponent={renderFooter}
          scrollEventThrottle={16}
        />
      </View>
    </S.BackGround>
  );
};

export default MyReviewListScreen;
