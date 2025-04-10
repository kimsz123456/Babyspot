import React from 'react';
import BOTTOM_TABS from '../../../constants/bottomTabs';
import * as S from './styles';
import {ParamListBase, RouteProp} from '@react-navigation/native';

const BottomTabBarIcon = ({
  focused,
  route,
}: {
  focused: boolean;
  route: RouteProp<ParamListBase, string>;
}) => {
  return (
    <S.BottomTabBarIcon
      source={
        focused
          ? BOTTOM_TABS[route.name].iconSource_active
          : BOTTOM_TABS[route.name].iconSource_inactive
      }
    />
  );
};

export default BottomTabBarIcon;
