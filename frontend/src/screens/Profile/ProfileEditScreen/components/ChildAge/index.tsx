import React from 'react';
import * as S from './styles';
import {IC_MINUS, IC_PLUS} from '../../../../../constants/icons';
import AddButton from '../../../../../components/atoms/Button/AddChildButton';

const ChildAge = () => {
  const age = '1999년생';
  const ageCount = 1;
  return (
    <S.ChildAgeWrapper>
      <S.ChildTitle>자녀 정보</S.ChildTitle>
      <S.ChildAgesContainer>
        <S.ChildAge>{age}</S.ChildAge>
        <S.AgeCountContainer>
          <S.AgeCountButton source={IC_MINUS} />
          <S.AgeCount>{ageCount}</S.AgeCount>
          <S.AgeCountButton source={IC_PLUS} />
        </S.AgeCountContainer>
      </S.ChildAgesContainer>
      <AddButton />
    </S.ChildAgeWrapper>
  );
};

export default ChildAge;
