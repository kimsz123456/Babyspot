import React, {useEffect, useState} from 'react';
import * as S from './styles';
import {
  IC_COMMENT,
  IC_FILTER,
  IC_YELLOW_STAR,
} from '../../../../../constants/icons';
import {TouchableOpacity} from 'react-native';
import ReviewCard, {ReviewCardProps} from './ReviewCard';
import {withDivider} from '../../../../../utils/withDivider';
import {ThinDivider} from '../../../../../components/atoms/Divider';
import MoreButtonWithDivider from '../../../../../components/atoms/MoreButtonWithDivider';
import {useMapNavigation} from '../../../../../hooks/useNavigationHooks';
import ReviewFilterModal from '../../../ReviewListScreen/ReviewFilterModal';

export interface ReviewProps {
  totalRating: number;
  totalReviewCount: number;
  reviews: ReviewCardProps[];
  storeName: string;
  storeId: number;
}

const Review = (props: ReviewProps) => {
  const navigation = useMapNavigation();
  const [modalOpened, setModalOpened] = useState(false);
  const [selectedAges, setSelectedAges] = useState<number[]>([]);

  const handleMoreButtonPress = () => {
    navigation.navigate('ReviewListScreen', {
      reviewInformation: props,
      storeId: props.storeId,
      filterAges: selectedAges,
    });
  };

  return (
    <>
      <S.ReviewContainer>
        <S.TitleHeaderContainer>
          <S.TitleInformationContainer>
            <S.Title>{`리뷰`}</S.Title>
            <S.InformationListContainer>
              <S.InformationContainer>
                <S.InformationIconImage source={IC_YELLOW_STAR} />
                <S.InformationText
                  $isStar>{`별점 ${props.totalRating}`}</S.InformationText>
              </S.InformationContainer>
              <S.InformationContainer>
                <S.InformationIconImage source={IC_COMMENT} />
                <S.InformationText $isStar={false}>
                  {`리뷰 ${props.totalReviewCount}개`}
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
          {props.reviews.length > 0 ? (
            withDivider(
              props.reviews.slice(0, 2).map((review, index) => (
                <ReviewCard
                  key={review.reviewId + index}
                  reviewId={review.reviewId}
                  memberId={review.memberId}
                  memberNickname={review.memberNickname}
                  profileImagePath={''} // API 응답에 없는 필드
                  reviewCount={1} // API 응답에 없는 필드
                  imgUrls={review.imgUrls}
                  babyAge={review.babyAge}
                  rating={review.rating}
                  content={review.content}
                  likeCount={review.likeCount}
                  createdAt={review.createdAt}
                />
              )),
              <ThinDivider />,
            )
          ) : (
            <S.NoReviewText> 리뷰가 없습니다. </S.NoReviewText>
          )}
        </S.ReviewCardListContainer>

        {props.reviews.length > 0 && (
          <MoreButtonWithDivider
            onPressed={handleMoreButtonPress}
            isOpened={false}
            openedText={'리뷰 접기'}
            closedText={'리뷰 더 보기'}
          />
        )}
      </S.ReviewContainer>
      <ReviewFilterModal
        modalOpened={modalOpened}
        setModalOpened={setModalOpened}
        selectedAge={[]}
        setSelectedAge={selectedAges => {
          navigation.navigate('ReviewListScreen', {
            reviewInformation: props,
            filterAges: selectedAges,
            storeId: props.storeId,
          });
        }}
      />
    </>
  );
};

export default Review;
