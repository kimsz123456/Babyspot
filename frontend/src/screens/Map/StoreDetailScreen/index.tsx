import React, {useEffect, useState} from 'react';

import {RouteProp, useRoute} from '@react-navigation/native';

import StoreBasicInformation from '../NearStoreListScreen/components/StoreBasicInformation';
import Home from './components/Home';
import Menu from './components/Menu';
import {ThickDivider} from '../../../components/atoms/Divider';
import * as S from './styles';
import KidMenu from './components/KidMenu';
import {withDivider} from '../../../utils/withDivider';
import KeywordSection from './components/Keyword';
import FamilyReview from './components/FamilyReview';
import {MapStackParamList} from '../../../navigation/MapStackNavigator';
import MyReview from './components/MyReview';
import Review from './components/Review';
import {
  getStoreDetail,
  StoreDetailResponse,
} from '../../../services/mapService';
import {getStoreReviews, ReviewType} from '../../../services/reviewService';

const TAB_NAMES = ['홈', '메뉴', '키워드', '리뷰'];

type StoreDetailRouteProp = RouteProp<MapStackParamList, 'StoreDetail'>;

const StoreDetailScreen = () => {
  const [selectedTab, setSelectedTab] = useState(0);
  const [storeDetail, setStoreDetail] = useState<StoreDetailResponse>();
  const [myReview, setMyReview] = useState<ReviewType>();
  const route = useRoute<StoreDetailRouteProp>();
  const {storeBasicInformation} = route.params;

  const handleTabPress = (idx: number) => {
    setSelectedTab(idx);
  };

  const fetchStoreDetail = async () => {
    try {
      // TODO: 가게 돌리기, 콘솔 삭제, 데이터 없을 때 처리
      const response = await getStoreDetail(3);
      // const response = await getStoreDetail(storeBasicInformation.storeId);
      console.log(response);

      setStoreDetail(response);
    } catch (error) {
      console.error('리뷰 목록 조회 실패:', error);
    }
  };

  const fetchMyReviewInStore = async () => {
    try {
      const response = await getStoreReviews(3);

      if (!response.empty) {
        setMyReview(response.content[0]);
      }
    } catch (error) {
      console.error('내 리뷰 조회 실패:', error);
    }
  };

  useEffect(() => {
    fetchStoreDetail();
    fetchMyReviewInStore();
  }, []);

  return (
    <S.StoreDetailScreenContainer>
      <S.BasicInformationContainer>
        <StoreBasicInformation store={storeBasicInformation} />
      </S.BasicInformationContainer>

      <S.TabBar>
        {TAB_NAMES.map((name, idx) => (
          <S.TabContainer
            key={idx}
            onPress={() => handleTabPress(idx)}
            $isSelected={selectedTab === idx ? true : false}>
            <S.TabName $isSelected={selectedTab === idx ? true : false}>
              {name}
            </S.TabName>
          </S.TabContainer>
        ))}
      </S.TabBar>

      {storeDetail &&
        withDivider(
          [
            <Home basicInformation={storeBasicInformation} />,
            <KidMenu menus={storeDetail.kidsMenu} />,
            <Menu menus={storeDetail.menus} />,
            <KeywordSection {...storeDetail.keywordSection} />,
            <FamilyReview
              positiveSummary={storeDetail.sentiment.positive[0]}
              positiveReviews={storeDetail.sentiment.positive}
              negativeSummary={storeDetail.sentiment.negative[0]}
              negativeReviews={storeDetail.sentiment.negative}
            />,
            <MyReview
              storeName={storeBasicInformation.title}
              review={myReview}
            />,
            <Review
              totalRating={storeBasicInformation.rating}
              totalReviewCount={storeBasicInformation.reviewCount}
              reviews={storeDetail.latestReviews}
              storeName={storeBasicInformation.title}
              storeId={storeBasicInformation.storeId}
            />,
          ],
          <ThickDivider />,
        )}
    </S.StoreDetailScreenContainer>
  );
};

export default StoreDetailScreen;
