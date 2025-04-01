import React from 'react';
import * as S from './styles';
import {IC_NO_CONTENT} from '../../../../../constants/icons';

const NoContent = () => {
  return (
    <S.NoContentContainer>
      <S.NoContentIconImage source={IC_NO_CONTENT} />
      <S.NoContentText>{`주변 결과가 없습니다.\n지도를 이동한 뒤 재탐색 해주세요.`}</S.NoContentText>
    </S.NoContentContainer>
  );
};

export default NoContent;
