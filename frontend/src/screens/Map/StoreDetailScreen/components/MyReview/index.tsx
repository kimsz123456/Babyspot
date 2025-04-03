import React, {useState} from 'react';
import * as S from './styles';
import ReviewCard, {ReviewCardProps} from '../Review/ReviewCard';
import {useMapNavigation} from '../../../../../hooks/useNavigationHooks';
import StarRating from '../../../../../components/atoms/StarRating';
import {ReviewType} from '../../../../../services/reviewService';
import {useGlobalStore} from '../../../../../stores/globalStore';
interface MyReviewProps {
  storeId: number;
  storeName: string;
  review: ReviewCardProps | undefined;
}
const MyReview = ({storeId, storeName, review}: MyReviewProps) => {
  const navigation = useMapNavigation();
  const {memberProfile} = useGlobalStore();

  const [rating, setRating] = useState(0);
  return (
    <S.MyReviewContainer>
      {review ? (
        <>
          <ReviewCard {...review} />
        </>
      ) : (
        <>
          <S.ReviewTextContainer>
            <S.ReviewText>{`방문 후기를 남겨주세요`}</S.ReviewText>
            <S.MyReviewText>{`${rating} / 5.0`}</S.MyReviewText>
          </S.ReviewTextContainer>
          <S.StarContainer>
            <StarRating
              rating={rating}
              starSize={51}
              ratingPressed={rating => {
                setRating(rating);

                if (memberProfile) {
                  const currentYear = new Date().getFullYear();
                  let tempBabyAges: number[] = [];

                  memberProfile.babyBirthYears.forEach(birthYear => {
                    tempBabyAges.push(currentYear - birthYear + 1);
                  });

                  const initialReview: ReviewType = {
                    reviewId: -1,
                    memberId: memberProfile?.id,
                    memberNickname: memberProfile?.nickname,
                    babyAges: tempBabyAges,
                    storeId: storeId,
                    storeName: storeName,
                    profile: memberProfile.profile_img,
                    reviewCount: 0,
                    rating: rating,
                    content: '',
                    createdAt: new Date().toDateString(),
                    imgUrls: [],
                    likeCount: 0,
                  };

                  navigation.navigate('WriteReviewScreen', {
                    review: initialReview,
                  });
                } else {
                  throw new Error('사용자 정보 검색에 실패했습니다.');
                }
              }}
            />
          </S.StarContainer>
        </>
      )}
    </S.MyReviewContainer>
  );
};

export default MyReview;
