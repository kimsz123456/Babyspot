/* eslint-disable react-hooks/exhaustive-deps */

import React, {useEffect, useRef, useState} from 'react';

import {
  View,
  NativeSyntheticEvent,
  NativeScrollEvent,
  InteractionManager,
} from 'react-native';

import {RouteProp, useRoute} from '@react-navigation/native';

import {MapStackParamList} from '../../../navigation/MapStackNavigator';
import StoreBasicInformation from '../NearStoreListScreen/components/StoreBasicInformation';
import Home from './components/Home';
import Menu from './components/Menu';
import {ThickDivider} from '../../../components/atoms/Divider';
import KidMenu from './components/KidMenu';
import KeywordSection from './components/Keyword';
import FamilyReview from './components/FamilyReview';
import MyReview from './components/MyReview';
import Review from './components/Review';

import {
  getStoreDetail,
  StoreDetailResponse,
} from '../../../services/mapService';
import {getStoreReviews, ReviewType} from '../../../services/reviewService';

import * as S from './styles';
import {useGlobalStore} from '../../../stores/globalStore';

const TAB_NAMES = ['홈', '메뉴', '키워드', '리뷰'];
const TAB_BAR_HEIGHT = 48;

type StoreDetailRouteProp = RouteProp<MapStackParamList, 'StoreDetail'>;

const StoreDetailScreen = () => {
  const [selectedTab, setSelectedTab] = useState(0);
  const [storeDetail, setStoreDetail] = useState<StoreDetailResponse>();
  const [myReview, setMyReview] = useState<ReviewType>();
  const route = useRoute<StoreDetailRouteProp>();
  const {memberProfile} = useGlobalStore();
  const {storeBasicInformation} = route.params;

  const scrollRef = useRef<any>(null);
  const sectionLayouts = useRef<Record<string, number>>({});
  const isManualScrolling = useRef(false);
  const pendingTab = useRef<{name: string; index: number} | null>(null);

  const sectionRefs = {
    홈: useRef<View>(null),
    메뉴: useRef<View>(null),
    키워드: useRef<View>(null),
    리뷰: useRef<View>(null),
  };

  const fetchStoreDetail = async () => {
    try {
      const response = await getStoreDetail(storeBasicInformation.storeId);

      setStoreDetail(response);
    } catch (error) {
      console.error('가게 상세 조회 실패:', error);
    }
  };

  const fetchMyReviewInStore = async () => {
    try {
      const response = await getStoreReviews(storeBasicInformation.storeId);

      const myReview = response.content.find(
        review => review.memberId === memberProfile?.id,
      );

      if (myReview) {
        setMyReview(myReview);
      }
    } catch (error) {
      console.error('내 리뷰 조회 실패:', error);
    }
  };

  useEffect(() => {
    fetchStoreDetail();
    fetchMyReviewInStore();
  }, []);

  const handleTabPress = (tabName: string, index: number) => {
    if (isManualScrolling.current) {
      pendingTab.current = {name: tabName, index};
      return;
    }

    setSelectedTab(index);

    const y = sectionLayouts.current[tabName];
    if (y === undefined || scrollRef.current == null) return;

    isManualScrolling.current = true;

    InteractionManager.runAfterInteractions(() => {
      requestAnimationFrame(() => {
        scrollRef.current.scrollTo({y: y - TAB_BAR_HEIGHT, animated: true});

        setTimeout(() => {
          isManualScrolling.current = false;

          if (pendingTab.current) {
            const {name, index} = pendingTab.current;
            pendingTab.current = null;
            handleTabPress(name, index);
          }
        }, 500);
      });
    });
  };

  const handleScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    if (isManualScrolling.current) return;

    const scrollY = event.nativeEvent.contentOffset.y;
    const layoutEntries = Object.entries(sectionLayouts.current);
    for (let i = layoutEntries.length - 1; i >= 0; i--) {
      const [name, y] = layoutEntries[i];
      if (scrollY + TAB_BAR_HEIGHT >= y) {
        const index = TAB_NAMES.findIndex(tab => tab === name);
        if (index !== selectedTab) {
          setSelectedTab(index);
        }
        break;
      }
    }
  };

  const handleLayout = (name: string) => (event: any) => {
    sectionLayouts.current[name] = event.nativeEvent.layout.y;
  };

  return (
    <View style={{flex: 1}}>
      <S.TabBarWrapper style={{height: TAB_BAR_HEIGHT}}>
        <S.TabBar>
          {TAB_NAMES.map((name, index) => (
            <S.TabContainer
              key={index}
              onPress={() => handleTabPress(name, index)}
              $isSelected={selectedTab === index}>
              <S.TabName $isSelected={selectedTab === index}>{name}</S.TabName>
            </S.TabContainer>
          ))}
        </S.TabBar>
      </S.TabBarWrapper>

      <S.StoreDetailScreenContainer
        ref={scrollRef}
        onScroll={handleScroll}
        scrollEventThrottle={16}
        contentContainerStyle={{paddingTop: TAB_BAR_HEIGHT}}
        showsVerticalScrollIndicator={false}>
        <S.BasicInformationContainer>
          <StoreBasicInformation store={storeBasicInformation} />
        </S.BasicInformationContainer>

        {storeDetail && (
          <>
            <View ref={sectionRefs['홈']} onLayout={handleLayout('홈')}>
              <Home basicInformation={storeBasicInformation} />
            </View>
            <ThickDivider />

            <View ref={sectionRefs['메뉴']} onLayout={handleLayout('메뉴')}>
              <KidMenu menus={storeDetail.kidsMenu} />
              <ThickDivider />
              <Menu menus={storeDetail.menus} />
            </View>
            <ThickDivider />

            <View ref={sectionRefs['키워드']} onLayout={handleLayout('키워드')}>
              <KeywordSection {...storeDetail.keywordSection} />
              <ThickDivider />
              <FamilyReview {...storeDetail.sentiment} />
            </View>
            <ThickDivider />

            <View ref={sectionRefs['리뷰']} onLayout={handleLayout('리뷰')}>
              <MyReview
                storeId={storeDetail.storeId}
                storeName={storeDetail.storeName}
                review={myReview}
              />
              <ThickDivider />
              <Review
                totalRating={storeBasicInformation.rating}
                totalReviewCount={storeBasicInformation.reviewCount}
                reviews={storeDetail.latestReviews}
                storeName={storeDetail.storeName}
                storeId={storeDetail.storeId}
              />
            </View>
          </>
        )}
      </S.StoreDetailScreenContainer>
    </View>
  );
};

export default StoreDetailScreen;
