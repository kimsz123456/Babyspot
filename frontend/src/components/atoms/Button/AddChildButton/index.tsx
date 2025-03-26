import React from 'react';
import * as S from './styles';
import {IC_PLUS} from '../../../../constants/icons';

const AddButton = () => {
  return (
    <S.AddButtonWrapper>
      <S.AddButtonContainer>
        <S.AddButtonTitle>자녀 추가</S.AddButtonTitle>
        <S.AddButton source={IC_PLUS} />
      </S.AddButtonContainer>
    </S.AddButtonWrapper>
  );
};

export default AddButton;
