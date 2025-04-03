import React, {useState} from 'react';
import {formatPrice} from '../../../../../utils/format';
import * as S from './styles';
import MoreButtonWithDivider from '../../../../../components/atoms/MoreButtonWithDivider';
import {MenuType} from '../../../../../services/mapService';
import NoDataContainer from '../../../../../components/atoms/NoDataContainer';

interface MenuProps {
  menus: MenuType[];
}

const Menu = ({menus}: MenuProps) => {
  const [isMenuOpened, setIsMenuOpened] = useState(false);

  const visibleMenus = isMenuOpened ? menus : menus.slice(0, 4);

  const handleMoreButtonPress = () => {
    setIsMenuOpened(prev => !prev);
  };

  return (
    <S.MenuContainer>
      <S.Title>{`메뉴`}</S.Title>

      <S.MenuListContainer>
        {menus.length == 0 ? (
          <NoDataContainer text="등록된 메뉴가 없습니다." />
        ) : (
          visibleMenus.map(menu => (
            <S.LineContainer key={menu.name}>
              <S.BasicText>{menu.name}</S.BasicText>
              <S.BasicText>
                <S.BoldText>{formatPrice(menu.price)}</S.BoldText>원
              </S.BasicText>
            </S.LineContainer>
          ))
        )}
      </S.MenuListContainer>

      {menus.length > 0 && (
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
