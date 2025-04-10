import React from 'react';
import * as S from './styles';
import {IC_PLUS} from '../../../../../constants/icons';

const AddChildrenButton = ({onPressed}: {onPressed: () => void}) => {
  return (
    <S.AddChildrenContainer onPress={onPressed}>
      <S.AddChildrenText>자녀 추가</S.AddChildrenText>
      <S.IconImage source={IC_PLUS} />
    </S.AddChildrenContainer>
  );
};

export default AddChildrenButton;
