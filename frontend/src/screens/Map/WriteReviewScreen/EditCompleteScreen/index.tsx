import React from 'react';
import * as S from './styles';
import MainButton from '../../../../components/atoms/Button/MainButton';
import {IC_COMPLETE} from '../../../../constants/icons';
import {useMapNavigation} from '../../../../hooks/useNavigationHooks';

const EditCompleteScreen = () => {
  const navigation = useMapNavigation();

  return (
    <S.EditCompleteScreenContainer>
      <S.CompleteContainer>
        <S.CompleteIcon source={IC_COMPLETE} />
        <S.CompleteText>{`수정이 완료되었습니다.`}</S.CompleteText>
      </S.CompleteContainer>
      <MainButton
        text={'수정 완료'}
        onPress={() => {
          navigation.pop(2);
        }}
      />
    </S.EditCompleteScreenContainer>
  );
};
export default EditCompleteScreen;
