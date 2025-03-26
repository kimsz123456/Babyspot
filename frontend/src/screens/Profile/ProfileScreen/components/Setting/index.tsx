import React from 'react';
import * as S from './styles';
import {IC_QUESTION, IC_RIGHT_ARROW} from '../../../../../constants/icons';
import {ThinDivider} from '../../../../../components/atoms/Divider';

const Setting = () => {
  return (
    <S.SettingContainer>
      <S.SettingTitle>설정</S.SettingTitle>
      <S.SettingItams>
        <S.GPSContainer>
          <S.GPSTitle>GPS 설정</S.GPSTitle>
          <S.GPSStateContainer>
            <S.GPSState>되어있음</S.GPSState>
            <S.GPSQuestion source={IC_QUESTION} />
          </S.GPSStateContainer>
        </S.GPSContainer>
        <ThinDivider />
        <S.PrivacyTermsContainer>
          <S.PrivacyTermsTitle>개인정보 이용약관</S.PrivacyTermsTitle>
          <S.PrivacyTermsButton source={IC_RIGHT_ARROW} />
        </S.PrivacyTermsContainer>
        <ThinDivider />
        <S.AppVersionContainer>
          <S.AppVersionTitle>앱 버전</S.AppVersionTitle>
          <S.AppVersionNumber>1.0.0</S.AppVersionNumber>
        </S.AppVersionContainer>
        <ThinDivider />
        <S.LogoutContainer>
          <S.LogoutTitle>로그아웃</S.LogoutTitle>
          <S.LogoutButton source={IC_RIGHT_ARROW} />
        </S.LogoutContainer>
        <ThinDivider />
        <S.DeleteAccountContainer>
          <S.DeleteAccount>회원탈퇴</S.DeleteAccount>
        </S.DeleteAccountContainer>
      </S.SettingItams>
    </S.SettingContainer>
  );
};

export default Setting;
