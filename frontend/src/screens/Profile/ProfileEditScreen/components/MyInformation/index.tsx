import React, {useEffect, useState} from 'react';
import * as S from './styles';
import LinedTextInput from '../../../../../components/atoms/Button/LinedTextInput';
import {getMemberProfile} from '../../../../../services/profileService';

interface MyInformationProps {
  onNicknameChange: (nickname: string) => void;
}

const MyInformation = ({onNicknameChange}: MyInformationProps) => {
  const [nickname, setNickname] = useState('');
  const [placeholder, setPlaceholder] = useState('');

  useEffect(() => {
    fetchUserProfile();
  }, []);

  const fetchUserProfile = async () => {
    try {
      const data = await getMemberProfile();
      setPlaceholder(data.nickname);
      setNickname(data.nickname);
    } catch (error) {
      console.error('프로필 정보 조회 실패:', error);
    }
  };

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
