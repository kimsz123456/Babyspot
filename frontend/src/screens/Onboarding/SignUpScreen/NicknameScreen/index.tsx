import React, {useState} from 'react';
import * as S from './styles';
import MainButton from '../../../../components/atoms/Button/MainButton';
import {useOnboardingNavigation} from '../../../../hooks/useNavigationHooks';
import {useOnboardingStore} from '../../../../stores/onboardingStore';
import {Keyboard, ToastAndroid, TouchableNativeFeedback} from 'react-native';
import LinedTextInput from '../../../../components/atoms/Button/LinedTextInput';
import {NICKNAME_LENGTH} from '../../../../constants/constants';
import SubButton from '../../../../components/atoms/Button/SubButton';
import {getCheckNickname} from '../../../../services/onboardingService';

const NicknameScreen = () => {
  const navigation = useOnboardingNavigation();
  const setNickname = useOnboardingStore(state => state.setNickname);
  const [text, setText] = useState('');
  const [isValid, setIsValid] = useState(false);
  const {tempToken} = useOnboardingStore();

  const handleCheckNickname = async () => {
    const response = await getCheckNickname({
      nickname: text,
      tempToken: tempToken ?? '',
    });

    if (response) {
      setIsValid(true);
      ToastAndroid.show('사용 가능한 닉네임입니다.', 500);
    } else {
      ToastAndroid.show('중복된 닉네임입니다.', 500);
    }
  };

  return (
    <>
      <TouchableNativeFeedback
        onPress={Keyboard.dismiss}
        background={TouchableNativeFeedback.Ripple('#ffffff', false)}>
        <S.SignUpScreenView>
          <S.SingUpInputSection>
            <S.SignUpInputSectionTitle>{`닉네임을 입력해주세요.`}</S.SignUpInputSectionTitle>

            <S.NicknameInputContainer>
              <S.TextInputTitle>닉네임</S.TextInputTitle>
              <LinedTextInput
                text={text}
                maxLength={NICKNAME_LENGTH}
                placeholder="감귤농장 주인"
                setText={(text: string) => {
                  setText(text.trim());
                  if (isValid) {
                    setIsValid(false);
                  }
                }}
              />
              <S.SubButtonContainer>
                <SubButton
                  disabled={text.trim().length == 0}
                  text={'중복확인'}
                  onPress={handleCheckNickname}
                />
              </S.SubButtonContainer>
            </S.NicknameInputContainer>
          </S.SingUpInputSection>
          <MainButton
            text={'다음'}
            onPress={() => {
              setNickname(text.trim());
              navigation.navigate('ProfileImage');
            }}
            disabled={!isValid}
          />
        </S.SignUpScreenView>
      </TouchableNativeFeedback>
    </>
  );
};

export default NicknameScreen;
