import React, {useEffect, useState} from 'react';
import * as S from './styles';
import {ThinDivider} from '../../../../../components/atoms/Divider';
import LinedTextInput from '../../../../../components/atoms/Button/LinedTextInput';
import {getMemberProfile} from '../../../../../services/profileService';

interface MyInformationProps {
  onNicknameChange: (nickname: string) => void;
}

const MyInformation = ({onNicknameChange}: MyInformationProps) => {
  const [nickname, setNickname] = useState('');

  useEffect(() => {
    fetchUserProfile();
  }, []);

  const fetchUserProfile = async () => {
    try {
      const data = await getMemberProfile();
      setNickname(data.nickname);
    } catch (error) {
      console.error('프로필 정보 조회 실패:', error);
    }
  };

  const handleNicknameChange = (text: string) => {
    setNickname(text);
    onNicknameChange(text);
  };

  return (
    <S.InformationContainer>
      <S.NicknameContainer>
        <S.NicknameTitle>닉네임</S.NicknameTitle>
        <LinedTextInput
          placeholder={nickname}
          textEditted={handleNicknameChange}
        />
      </S.NicknameContainer>
    </S.InformationContainer>
  );
};

export default MyInformation;
