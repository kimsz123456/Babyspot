import React from 'react';
import * as S from './styles';
import MainButton from '../../../../components/atoms/Button/MainButton';

const AddChildScreen = () => {
  return (
    <S.SignUpScreenView>
      <S.SingUpInputSection>
        <S.SignUpInputSectionTitle>{`자녀 정보를 입력해주세요.`}</S.SignUpInputSectionTitle>
      </S.SingUpInputSection>
      <MainButton text={'다음'} />
    </S.SignUpScreenView>
  );
};

export default AddChildScreen;
