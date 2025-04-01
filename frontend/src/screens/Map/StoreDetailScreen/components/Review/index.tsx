import React, {useState} from 'react';
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
}

const Review = (props: ReviewProps) => {
  const navigation = useMapNavigation();
  const visibleReviews = props.reviews.slice(0, 2);

  const [modalOpened, setModalOpened] = useState(false);

  const handleMoreButtonPress = () => {
    navigation.navigate('ReviewListScreen', {
      reviewInformation: props,
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
          {withDivider(
            [
              ...visibleReviews.map((review, index) => {
                return <ReviewCard key={index} {...review} />;
              }),
            ],
            <ThinDivider />,
          )}
        </S.ReviewCardListContainer>

        <MoreButtonWithDivider
          onPressed={handleMoreButtonPress}
          isOpened={false}
          openedText={'리뷰 접기'}
          closedText={'리뷰 더 보기'}
        />
      </S.ReviewContainer>
      <ReviewFilterModal
        modalOpened={modalOpened}
        setModalOpened={setModalOpened}
        selectedAge={[]}
        setSelectedAge={selectedAges => {
          navigation.navigate('ReviewListScreen', {
            reviewInformation: props,
            filterAges: selectedAges,
          });
        }}
      />
    </>
  );
};

export default Review;
