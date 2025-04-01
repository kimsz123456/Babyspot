import React, {useState} from 'react';
import * as S from './styles';
import {RouteProp, useRoute} from '@react-navigation/native';
import {MapStackParamList} from '../../../navigation/MapStackNavigator';
import StarRating from '../../../components/atoms/StarRating';
import {IC_SECONDARY_PLUS} from '../../../constants/icons';
import MultilineTextInput from '../../../components/atoms/MultilineTextInput';
import {
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  TouchableNativeFeedback,
} from 'react-native';
import MainButton from '../../../components/atoms/Button/MainButton';
import {useMapNavigation} from '../../../hooks/useNavigationHooks';

type StoreDetailRouteProp = RouteProp<MapStackParamList, 'WriteReviewScreen'>;

const WriteReviewScreen = () => {
  const route = useRoute<StoreDetailRouteProp>();
  const navigation = useMapNavigation();

  const [content, setContent] = useState('');

  const {rating} = route.params;

  return (
    <KeyboardAvoidingView
      style={{flex: 1}}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 40 : 0}>
      <TouchableNativeFeedback
        onPress={Keyboard.dismiss}
        background={TouchableNativeFeedback.Ripple('#ffffff', false)}>
        <ScrollView
          contentContainerStyle={{flexGrow: 1}}
          keyboardShouldPersistTaps="handled">
          <S.WriteReviewScreenContainer>
            <S.ReviewContainer>
              <StarRating rating={rating} starSize={51} />
              <S.AddImageButtonContainer>
                <S.AddImageText>{`사진을 추가해 주세요`}</S.AddImageText>
                <S.AddImageSecondaryPlusIcon source={IC_SECONDARY_PLUS} />
              </S.AddImageButtonContainer>
              <MultilineTextInput
                textEdited={text => {
                  setContent(text);
                  console.log(text);
                }}
                placeholder={
                  '아이와 함께하기에 어떠셨는지 알려주세요!\n작성 내용은 마이페이지와 해당 매장의 리뷰에 노출 됩니다.'
                }
              />
            </S.ReviewContainer>
            <MainButton
              disabled={content.length == 0}
              text={'작성 완료'}
              onPress={() => {
                Keyboard.dismiss();
                navigation.navigate('WriteCompleteScreen');
              }}
            />
          </S.WriteReviewScreenContainer>
        </ScrollView>
      </TouchableNativeFeedback>
    </KeyboardAvoidingView>
  );
};

export default WriteReviewScreen;
