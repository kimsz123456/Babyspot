import React, {useState} from 'react';
import * as S from './styles';
import MainButton from '../../../../components/atoms/Button/MainButton';
import {useOnboardingNavigation} from '../../../../hooks/useNavigationHooks';
import {useOnboardingStore} from '../../../../stores/onboardingStore';
import {Keyboard, TouchableNativeFeedback, View} from 'react-native';
import LinedTextInput from '../../../../components/atoms/Button/LinedTextInput';
import {NICKNAME_LENGTH} from '../../../../constants/constants';

const NicknameScreen = () => {
  const navigation = useOnboardingNavigation();
  const setNickname = useOnboardingStore(state => state.setNickname);
  const [text, setText] = useState('');

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
              text={text}
              maxLength={NICKNAME_LENGTH}
              placeholder="감귤농장 주인"
              setText={(text: string) => {
                setText(text.trim());
              }}
            />
          </View>
        </S.SingUpInputSection>
        <MainButton
          text={'다음'}
          onPress={() => {
            setNickname(text.trim());
            navigation.navigate('ProfileImage');
          }}
          disabled={text.trim() === ''}
        />
      </S.SignUpScreenView>
    </TouchableNativeFeedback>
  );
};

export default NicknameScreen;
