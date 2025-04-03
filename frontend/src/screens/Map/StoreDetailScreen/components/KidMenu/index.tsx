import React, {useState} from 'react';
import {formatPrice} from '../../../../../utils/format';
import * as S from './styles';
import OKzoneMarker from '../../../../../components/atoms/OKZoneMarker';
import MoreButtonWithDivider from '../../../../../components/atoms/MoreButtonWithDivider';
import {KidsMenu} from '../../../../../services/mapService';
import NoDataContainer from '../../../../../components/atoms/NoDataContainer';

interface KidMenuProps {
  menus: KidsMenu[];
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
        {menus.length == 0 ? (
          <NoDataContainer text={'등록된 어린이 메뉴가 없습니다.'} />
        ) : (
          visibleMenus.map((menu, index) => (
            <S.LineContainer key={index}>
              <S.BasicText>{menu.babyMenuName}</S.BasicText>
              <S.BasicText>
                <S.BoldText>
                  {menu.babyMenuPrice ? formatPrice(menu.babyMenuPrice) : `-`}
                </S.BoldText>
                {`원`}
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

export default KidMenu;
