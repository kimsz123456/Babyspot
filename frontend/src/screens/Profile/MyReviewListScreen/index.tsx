import React, {useEffect, useState} from 'react';
import {ScrollView} from 'react-native-gesture-handler';
import * as S from './styles';
import MyReviewInformation from './components/MyReviewInformation';
import {ThinDivider} from '../../../components/atoms/Divider';
import {getMyReviews, ReviewType} from '../../../services/reviewService';
import NoDataContainer from '../../../components/atoms/NoDataContainer';

const MyReviewListScreen = () => {
  const [reviews, setReviews] = useState<ReviewType[]>([]);
  const imageCarouselRef = React.useRef<ScrollView>(null);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await getMyReviews({
          page: 0,
          size: 10,
        });
        setReviews(response.content);
      } catch (error) {
        throw error;
      }
    };

    fetchReviews();
  }, []);

  if (reviews.length === 0) {
    return (
      <S.BackGround>
        <NoDataContainer text="작성한 리뷰가 없습니다." />
      </S.BackGround>
    );
  }

  return (
    <S.BackGround>
      <S.MyReviewListScreenContainer>
        {reviews.map((review, idx) => (
          <React.Fragment key={review.reviewId}>
            <MyReviewInformation
              reviews={review}
              imageCarouselRef={imageCarouselRef}
            />
            {idx !== reviews.length - 1 && (
              <S.Divider>
                <ThinDivider />
              </S.Divider>
            )}
          </React.Fragment>
        ))}
      </S.MyReviewListScreenContainer>
    </S.BackGround>
  );
};

export default MyReviewListScreen;
