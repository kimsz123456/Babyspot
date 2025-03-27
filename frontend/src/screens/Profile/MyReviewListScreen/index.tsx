import React, {useRef} from 'react';

import {ScrollView} from 'react-native-gesture-handler';

import MOCK from '../MyReviewListScreen/components/MyReviewInformation/mocks';

import * as S from './styles';
import MyReviewInformation from './components/MyReviewInformation';

const MyReviewListScreen = () => {
  const imageCarouselRef = useRef<ScrollView>(null);

  return (
    <S.MyReviewListScreenContainer>
      {MOCK.map((store, idx) => (
        <MyReviewInformation
          key={idx}
          store={store}
          imageCarouselRef={imageCarouselRef}
        />
      ))}
    </S.MyReviewListScreenContainer>
  );
};

export default MyReviewListScreen;
