import React, {useState} from 'react';
import * as S from './styles';
import {RouteProp, useRoute} from '@react-navigation/native';
import {MapStackParamList} from '../../../navigation/MapStackNavigator';
import ReviewCard from '../StoreDetailScreen/components/Review/ReviewCard';
import {Text, TouchableOpacity, View} from 'react-native';
import {ThinDivider} from '../../../components/atoms/Divider';
import MoreButtonWithDivider from '../../../components/atoms/MoreButtonWithDivider';
import {IC_YELLOW_STAR, IC_COMMENT, IC_FILTER} from '../../../constants/icons';
import {withDivider} from '../../../utils/withDivider';
import {ModalContainer} from '../../../components/atoms/CenterModal/styles';
import CenteredModal from '../../../components/atoms/CenterModal';

type StoreDetailRouteProp = RouteProp<MapStackParamList, 'ReviewListScreen'>;

const ReviewListScreen = () => {
  const route = useRoute<StoreDetailRouteProp>();

  const [modalOpened, setModalOpened] = useState(false);

  const reviewInformation = route.params.reviewInformation;

  const visibleReviews = reviewInformation.reviews.slice(0, 3);

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
      <CenteredModal
        visible={modalOpened}
        confirmText={'검색하기'}
        onCancel={() => {
          setModalOpened(false);
        }}
        onConfirm={() => {
          setModalOpened(false);
        }}
        title="리뷰 필터"
        children={
          <View style={{width: '100%'}}>
            <Text>{`아이들 나이를 바탕으로,\n리뷰를 선별해드릴게요.`}</Text>
          </View>
        }
      />
    </>
  );
};

export default ReviewListScreen;
