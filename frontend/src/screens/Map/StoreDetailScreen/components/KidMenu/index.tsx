import React, {useState} from 'react';
import {menuType} from '../../types';
import {formatPrice} from '../../../../../utils/format';
import * as S from './styles';
import OKzoneMarker from '../../../../../components/atoms/OKZoneMarker';
import MoreButtonWithDivider from '../../../../../components/atoms/MoreButtonWithDivider';

interface KidMenuProps {
  menus: menuType[];
}

const KidMenu = ({menus}: KidMenuProps) => {
  const [isMenuOpened, setIsMenuOpened] = useState(false);

  const visibleMenus = isMenuOpened ? menus : menus.slice(0, 4);

  const handleMoreButtonPress = () => {
    setIsMenuOpened(prev => !prev);
  };

  return (
    <S.MenuContainer>
      <S.TitleContainer>
        <S.Title>{`어린이 메뉴`}</S.Title>
        <OKzoneMarker />
      </S.TitleContainer>
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

      <MoreButtonWithDivider
        onPressed={handleMoreButtonPress}
        isOpened={isMenuOpened}
        openedText={'메뉴 접기'}
        closedText={'메뉴 더 보기'}
      />
    </S.MenuContainer>
  );
};

export default KidMenu;
