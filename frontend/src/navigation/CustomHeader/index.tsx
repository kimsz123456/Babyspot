import React from 'react';
import {IC_LEFT_ARROW} from '../../constants/icons';
import scale from '../../utils/scale';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {NativeStackHeaderProps} from '@react-navigation/native-stack';
import * as S from './styles';

interface CustomHeaderProps {
  props: NativeStackHeaderProps;
  title: string;
}
const CustomHeader = (props: CustomHeaderProps) => {
  const insets = useSafeAreaInsets();

  return (
    <S.CustomHeaderContainer $insetsTop={insets.top}>
      <S.HeaderContainer>
        <S.IconContainer
          onPress={() => {
            props.props.navigation.goBack();
          }}>
          <S.IconImage
            source={IC_LEFT_ARROW}
            style={{width: scale(24), height: scale(24)}}
          />
        </S.IconContainer>
        <S.Title>{props.title}</S.Title>
      </S.HeaderContainer>
    </S.CustomHeaderContainer>
  );
};

export default CustomHeader;
