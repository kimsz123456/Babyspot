import React, {useState} from 'react';

import {RouteProp, useRoute} from '@react-navigation/native';

import StoreBasicInformation from '../NearStoreListScreen/components/StoreBasicInformation';
import Home from './components/Home';
import Menu from './components/Menu';
import {ThickDivider} from '../../../components/atoms/Divider';

import MOCK, {familyReviewMocks, keywordSectionMock} from './mock';

import * as S from './styles';
import KidMenu from './components/KidMenu';
import {withDivider} from '../../../utils/withDivider';
import KeywordSection from './components/Keyword';
import FamilyReview from './components/FamilyReview';
import {MapStackParamList} from '../../../navigation/MapStackNavigator';
import ReviewStar from './components/ReviewStar';

const TAB_NAMES = ['홈', '메뉴', '키워드', '리뷰'];

type StoreDetailRouteProp = RouteProp<MapStackParamList, 'StoreDetail'>;

const StoreDetailScreen = () => {
  const [selectedTab, setSelectedTab] = useState(0);

  const route = useRoute<StoreDetailRouteProp>();

  const {storeBasicInformation} = route.params;

  const handleTabPress = (idx: number) => {
    setSelectedTab(idx);
  };

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

      {withDivider(
        [
          <Home
            basicInformation={storeBasicInformation}
            detailInformation={MOCK}
          />,
          <KidMenu menus={MOCK.menus} />,
          <Menu menus={MOCK.menus} />,
          <KeywordSection
            keywords={keywordSectionMock.keywords}
            totalCount={keywordSectionMock.totalCount}
          />,
          <FamilyReview
            positiveSummary={familyReviewMocks.positiveSummary}
            positiveReviews={familyReviewMocks.positiveReviews}
            negativeSummary={familyReviewMocks.negativeSummary}
            negativeReviews={familyReviewMocks.negativeReviews}
          />,
          <ReviewStar />,
        ],
        <ThickDivider />,
      )}
    </S.StoreDetailScreenContainer>
  );
};

export default StoreDetailScreen;
