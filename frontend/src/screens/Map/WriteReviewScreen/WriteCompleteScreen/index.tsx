import React from 'react';
import * as S from './styles';
import MainButton from '../../../../components/atoms/Button/MainButton';
import {IC_COMPLETE} from '../../../../constants/icons';
import {useMapNavigation} from '../../../../hooks/useNavigationHooks';

const WriteCompleteScreen = () => {
  const navigation = useMapNavigation();

  return (
    <S.WriteCompleteScreenContainer>
      <S.CompleteContainer>
        <S.CompleteIcon source={IC_COMPLETE} />
        <S.CompleteText>{`작성이 완료되었습니다.`}</S.CompleteText>
      </S.CompleteContainer>
      <MainButton
        text={'작성 완료'}
        onPress={() => {
          navigation.pop(2);
        }}
      />
    </S.WriteCompleteScreenContainer>
  );
};
export default WriteCompleteScreen;
