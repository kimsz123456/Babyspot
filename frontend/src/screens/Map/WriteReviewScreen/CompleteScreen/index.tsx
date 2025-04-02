import React, {useMemo} from 'react';
import * as S from './styles';
import MainButton from '../../../../components/atoms/Button/MainButton';
import {IC_COMPLETE} from '../../../../constants/icons';
import {useMapNavigation} from '../../../../hooks/useNavigationHooks';
import {RouteProp, useRoute} from '@react-navigation/native';
import {MapStackParamList} from '../../../../navigation/MapStackNavigator';

export type CompleteTypes = 'create' | 'update' | 'delete';

type CompleteScreenRouteProp = RouteProp<MapStackParamList, 'CompleteScreen'>;

const CompleteScreen = () => {
  const navigation = useMapNavigation();
  const route = useRoute<CompleteScreenRouteProp>();

  const {completeType} = route.params;

  const {completeText, completeButtonText} = useMemo(() => {
    switch (completeType) {
      case 'create':
        return {
          completeText: '작성이 완료되었습니다.',
          completeButtonText: '작성 완료',
        };

      case 'update':
        return {
          completeText: '수정이 완료되었습니다.',
          completeButtonText: '수정 완료',
        };

      case 'delete':
        return {
          completeText: '삭제가 완료되었습니다.',
          completeButtonText: '삭제 완료',
        };
    }
  }, []);

  return (
    <S.CompleteScreenContainer>
      <S.CompleteContainer>
        <S.CompleteIcon source={IC_COMPLETE} />
        <S.CompleteText>{completeText}</S.CompleteText>
      </S.CompleteContainer>
      <MainButton
        text={completeButtonText}
        onPress={() => {
          navigation.pop(2);
        }}
      />
    </S.CompleteScreenContainer>
  );
};

export default CompleteScreen;
