import React from 'react';
import * as S from './styles';
import MainButton from '../../../../components/atoms/Button/MainButton';
import {useOnboardingNavigation} from '../../../../hooks/useNavigationHooks';
import {useOnboardingStore} from '../../../../stores/onboardingStore';
import {Keyboard, TouchableNativeFeedback, View} from 'react-native';
import LinedTextInput from '../../../../components/atoms/Button/LinedTextInput';

const NicknameScreen = () => {
  const navigation = useOnboardingNavigation();
  const nickname = useOnboardingStore(state => state.nickname);
  const setNickname = useOnboardingStore(state => state.setNickname);

  return (
    <TouchableNativeFeedback
      onPress={Keyboard.dismiss}
      background={TouchableNativeFeedback.Ripple('#ffffff', false)}>
      <S.SignUpScreenView>
        <S.SingUpInputSection>
          <S.SignUpInputSectionTitle>{`닉네임을 입력해주세요.`}</S.SignUpInputSectionTitle>

          <View>
            <S.TextInputTitle>닉네임</S.TextInputTitle>
            <LinedTextInput
              placeholder="감귤농장 주인"
              textEditted={(text: string) => {
                if (text.trim() != '') {
                  setNickname(text);
                } else {
                  setNickname(null);
                }
              }}
            />
          </View>
        </S.SingUpInputSection>
        <MainButton
          text={'다음'}
          onPress={() => {
            navigation.navigate('ProfileImage');
          }}
          disabled={!nickname}
        />
      </S.SignUpScreenView>
    </TouchableNativeFeedback>
  );
};

export default NicknameScreen;
