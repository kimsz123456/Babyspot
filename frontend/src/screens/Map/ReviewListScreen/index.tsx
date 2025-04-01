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

type StoreDetailRouteProp = RouteProp<MapStackParamList, 'ReviewListScreen'>;

const ReviewListScreen = () => {
  const route = useRoute<StoreDetailRouteProp>();

  const [modalOpened, setModalOpened] = useState(false);
  const [selectedAges, setSelectedAges] = useState<number[]>([]);

  const reviewInformation = route.params.reviewInformation;
  const filteredAges = route.params.filterAges;

  const visibleReviews = reviewInformation.reviews.slice(0, 3);

  useEffect(() => {
    if (filteredAges) {
      setSelectedAges(filteredAges);
    }
  }, [filteredAges]);

  const handleMoreButtonPress = () => {};

  return (
    <>
      <S.ReviewListScreenScrollView>
        <S.ReviewContainer>
          <S.TitleHeaderContainer>
            <S.TitleInformationContainer>
              <S.Title>{`리뷰`}</S.Title>
              <S.InformationListContainer>
                <S.InformationContainer>
                  <S.InformationIconImage source={IC_YELLOW_STAR} />
                  <S.InformationText
                    $isStar>{`별점 ${reviewInformation.totalRating}`}</S.InformationText>
                </S.InformationContainer>
                <S.InformationContainer>
                  <S.InformationIconImage source={IC_COMMENT} />
                  <S.InformationText $isStar={false}>
                    {`리뷰 ${reviewInformation.totalReviewCount}개`}
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
