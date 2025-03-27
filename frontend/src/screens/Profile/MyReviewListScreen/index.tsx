import React, {useRef} from 'react';

import {ScrollView} from 'react-native-gesture-handler';

import MOCK from '../MyReviewListScreen/components/MyReviewInformation/mocks';

import * as S from './styles';
import MyReviewInformation from './components/MyReviewInformation';
import {ThinDivider} from '../../../components/atoms/Divider';

const MyReviewListScreen = () => {
  const imageCarouselRef = useRef<ScrollView>(null);

  return (
    <ScrollView>
      <S.MyReviewListScreenContainer>
        {MOCK.map((store, idx) => (
          <React.Fragment key={idx}>
            <MyReviewInformation
              key={idx}
              store={store}
              imageCarouselRef={imageCarouselRef}
            />
            {idx !== MOCK.length - 1 && (
              <S.Divider>
                <ThinDivider />
              </S.Divider>
            )}
          </React.Fragment>
        ))}
      </S.MyReviewListScreenContainer>
    </ScrollView>
  );
};

export default MyReviewListScreen;
