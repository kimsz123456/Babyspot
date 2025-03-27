import React from 'react';
import * as S from './styles';
import MainButton from '../../../components/atoms/Button/MainButton';
import SubButton from '../../../components/atoms/Button/SubButton';

const DeleteAccountScreen = () => {
  return (
    <S.BackGround>
      <S.DeleteAccountContainer>
        <S.DeleteAccountTitle>탈퇴 약관</S.DeleteAccountTitle>
        <S.Contents>
          1. 본 서비스를 탈퇴하시면 더이상 ‘베이비 스팟’ 서비스를 이용하실 수
          없습니다.
        </S.Contents>
        <S.Contents>2. 삭제된 정보는 다시 복구할 수 없습니다.</S.Contents>
        <S.Contents>
          3. 탈퇴 후 기존 회원 정보로 로그인 할 수 없습니다.
        </S.Contents>
        <S.Contents>
          4. 탈퇴 처리된 계정은 재 가입 방지를 위해 90일간 보존된 후 삭제
          처리됩니다.
        </S.Contents>
        <S.Contents>
          5. 작성하신 리뷰 정보는 탈퇴 후에도 삭제되지 않습니다
        </S.Contents>
        <S.ButtonWrapper>
          <SubButton text="탈퇴하기" />
          <MainButton text="취소하기" />
        </S.ButtonWrapper>
      </S.DeleteAccountContainer>
    </S.BackGround>
  );
};

export default DeleteAccountScreen;
