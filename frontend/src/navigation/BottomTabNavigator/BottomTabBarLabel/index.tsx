import React from 'react';
import {RouteProp, ParamListBase} from '@react-navigation/native';
import BOTTOM_TABS from '../../../constants/bottomTabs';
import * as S from './styles';

const BottomTabBarLabel = ({
  focused,
  route,
}: {
  focused: boolean;
  route: RouteProp<ParamListBase, string>;
}) => {
  return (
    <S.BottomTabBarLabel $focused={focused}>
      {BOTTOM_TABS[route.name].label}
    </S.BottomTabBarLabel>
  );
};

export default BottomTabBarLabel;
