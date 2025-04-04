import React from 'react';
import * as S from './styles';
import LinedTextInput from '../../../../../components/atoms/Button/LinedTextInput';
import {NICKNAME_LENGTH} from '../../../../../constants/constants';

interface MyInformationProps {
  nickname: string;
  setNickname: (nickname: string) => void;
}

const MyInformation = ({nickname, setNickname}: MyInformationProps) => {
  return (
    <S.InformationContainer>
      <S.NicknameContainer>
        <S.NicknameTitle>닉네임</S.NicknameTitle>
        <LinedTextInput
          text={nickname}
          maxLength={NICKNAME_LENGTH}
          placeholder={'닉네임을 입력해주세요.'}
          setText={(text: string) => {
            setNickname(text);
          }}
        />
      </S.NicknameContainer>
    </S.InformationContainer>
  );
};

export default MyInformation;
