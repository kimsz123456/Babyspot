import React, {useState} from 'react';

import MoreButtonWithDivider from '../../../../../components/atoms/MoreButtonWithDivider';
import NoDataContainer from '../../../../../components/atoms/NoDataContainer';

import {MenuType} from '../../../../../services/mapService';
import {formatPrice} from '../../../../../utils/format';

import * as S from './styles';

interface MenuProps {
  menus: MenuType[];
}

const MAX_CONTENT_LENGTH = 4;

const Menu = ({menus}: MenuProps) => {
  const [isMenuOpened, setIsMenuOpened] = useState(false);

  const visibleMenus = isMenuOpened
    ? menus
    : menus.slice(0, MAX_CONTENT_LENGTH);

  const handleMoreButtonPress = () => {
    setIsMenuOpened(prev => !prev);
  };

  return (
    <S.MenuContainer>
      <S.Title>{'메뉴'}</S.Title>

      <S.MenuListContainer>
        {menus.length === 0 ? (
          <NoDataContainer text="등록된 메뉴가 없습니다." />
        ) : (
          visibleMenus.map(menu => (
            <S.LineContainer key={menu.name}>
              <S.StoreName>{menu.name}</S.StoreName>
              <S.BasicText>
                <S.BoldText>{formatPrice(menu.price)}</S.BoldText>원
              </S.BasicText>
            </S.LineContainer>
          ))
        )}
      </S.MenuListContainer>

      {menus.length > MAX_CONTENT_LENGTH && (
        <MoreButtonWithDivider
          onPressed={handleMoreButtonPress}
          isOpened={isMenuOpened}
          openedText={'메뉴 접기'}
          closedText={'메뉴 더 보기'}
        />
      )}
    </S.MenuContainer>
  );
};

export default Menu;
