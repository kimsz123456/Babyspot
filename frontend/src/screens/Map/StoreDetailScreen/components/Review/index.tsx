import React, {useEffect, useState} from 'react';
import * as S from './styles';
import {
  IC_COMMENT,
  IC_FILTER,
  IC_YELLOW_STAR,
} from '../../../../../constants/icons';
import {Text, TouchableOpacity, View} from 'react-native';
import ReviewCard, {ReviewCardProps} from './ReviewCard';
import {withDivider} from '../../../../../utils/withDivider';
import {ThinDivider} from '../../../../../components/atoms/Divider';
import MoreButtonWithDivider from '../../../../../components/atoms/MoreButtonWithDivider';
import {useMapNavigation} from '../../../../../hooks/useNavigationHooks';
import ReviewFilterModal from '../../../ReviewListScreen/ReviewFilterModal';
import NoDataContainer from '../../../../../components/atoms/NoDataContainer';
import {useMapStore} from '../../../../../stores/mapStore';

export interface ReviewProps {
  reviews: ReviewCardProps[];
  storeName: string;
  storeId: number;
  myReview: ReviewCardProps | undefined;
}

const MAX_CONTENT_LENGTH = 2;

export const sortReviewsByDate = (reviews: ReviewCardProps[]) => {
  return [...reviews].sort((a, b) => {
    const dateA = new Date(a.reviewId).getTime();
    const dateB = new Date(b.reviewId).getTime();
    return dateB - dateA;
  });
};

const Review = (props: ReviewProps) => {
  const [modalOpened, setModalOpened] = useState(false);
  const [sortedReview, setSortedReview] = useState<ReviewCardProps[]>([]);

  const navigation = useMapNavigation();
  const {storeBasicInformation, selectedStoreIndex} = useMapStore();

  const store = storeBasicInformation[selectedStoreIndex];

  if (!store) {
    return;
  }

  const handleMoreButtonPress = () => {
    navigation.navigate('ReviewListScreen', {
      reviewInformation: props,
      storeId: props.storeId,
      filterAges: [],
    });
  };

  useEffect(() => {
    const sortedReviews = sortReviewsByDate(
      props.reviews.filter(review => {
        return review.memberId != props.myReview?.memberId;
      }),
    );

    if (props.myReview) {
      setSortedReview([props.myReview, ...sortedReviews]);
    } else {
      setSortedReview(sortedReviews);
    }
  }, [props]);

  return (
    <>
      <S.ReviewContainer>
        <S.TitleCaptionContainer>
          <S.TitleHeaderContainer>
            <S.TitleInformationContainer>
              <S.Title>{'리뷰'}</S.Title>
              <S.InformationListContainer>
                <S.InformationContainer>
                  <S.InformationIconImage source={IC_YELLOW_STAR} />
                  <S.InformationText
                    $isStar>{`별점 ${store.rating}`}</S.InformationText>
                </S.InformationContainer>
                <S.InformationContainer>
                  <S.InformationIconImage source={IC_COMMENT} />
                  <S.InformationText $isStar={false}>
                    {`리뷰 ${store.reviewCount}개`}
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
          <S.CaptionText>{`내 리뷰가 상위에 노출됩니다.`}</S.CaptionText>
        </S.TitleCaptionContainer>
        <S.ReviewCardListContainer>
          {sortedReview.length > 0 ? (
            withDivider(
              sortedReview
                .slice(
                  0,
                  props.myReview ? MAX_CONTENT_LENGTH + 1 : MAX_CONTENT_LENGTH,
                )
                .map((review, index) => <ReviewCard key={index} {...review} />),
              <ThinDivider />,
            )
          ) : (
            <NoDataContainer text={'등록된 리뷰가 없습니다.'} />
          )}
        </S.ReviewCardListContainer>

        {sortedReview.length > 0 && (
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
