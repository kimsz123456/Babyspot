import React, {useState} from 'react';

import {ThinDivider} from '../../../../../components/atoms/Divider';
import {IC_DOWN_ARROW} from '../../../../../constants/icons';
import {menuType} from '../../types';

import {formatPrice} from '../../../../../utils/format';

import * as S from './styles';

interface MenuProps {
  label: string;
  menus: menuType[];
}

const Menu = ({label, menus}: MenuProps) => {
  const [isMenuOpened, setIsMenuOpened] = useState(false);

  const visibleMenus = isMenuOpened ? menus : menus.slice(0, 4);

  const handleMoreButtonPress = () => {
    setIsMenuOpened(prev => !prev);
  };

  return (
    <S.MenuContainer>
      <S.Title>{label}</S.Title>

      <S.MenuListContainer>
        {visibleMenus.map(menu => (
          <S.LineContainer key={menu.name}>
            <S.BasicText>{menu.name}</S.BasicText>
            <S.BasicText>
              <S.BoldText>{formatPrice(menu.price)}</S.BoldText>원
            </S.BasicText>
          </S.LineContainer>
        ))}
      </S.MenuListContainer>

      <S.MoreButtonContainer onPress={handleMoreButtonPress}>
        <ThinDivider />
        <S.MoreButton>
          <S.ButtonText>
            {isMenuOpened ? '메뉴 접기' : '메뉴 더 보기'}
          </S.ButtonText>
          <S.ArrowIcon source={IC_DOWN_ARROW} $isMenuOpened={isMenuOpened} />
        </S.MoreButton>
      </S.MoreButtonContainer>
    </S.MenuContainer>
  );
};

export default Menu;
