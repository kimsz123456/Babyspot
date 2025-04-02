import React, {useEffect, useState} from 'react';
import * as S from './styles';
import LinedTextInput from '../../../../../components/atoms/Button/LinedTextInput';
import {useGlobalStore} from '../../../../../stores/globalStore';

interface MyInformationProps {
  onNicknameChange: (nickname: string) => void;
}

const MyInformation = ({onNicknameChange}: MyInformationProps) => {
  const {memberProfile} = useGlobalStore();
  const [nickname, setNickname] = useState('');
  const [placeholder, setPlaceholder] = useState('');

  useEffect(() => {
    if (memberProfile) {
      setPlaceholder(memberProfile.nickname);
      setNickname(memberProfile.nickname);
    }
  }, [memberProfile]);

  return (
    <S.InformationContainer>
      <S.NicknameContainer>
        <S.NicknameTitle>닉네임</S.NicknameTitle>
        <LinedTextInput
          placeholder={placeholder}
          textEditted={(text: string) => {
            if (text.trim() != '') {
              setNickname(text);
              onNicknameChange(text);
            } else {
              setNickname(nickname);
            }
          }}
        />
      </S.NicknameContainer>
    </S.InformationContainer>
  );
};

export default MyInformation;
