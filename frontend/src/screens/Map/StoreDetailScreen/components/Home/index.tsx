import React, {useState} from 'react';

import {ConvenienceType} from '../../../NearStoreListScreen/components/StoreBasicInformation/types';

import {
  IC_CATEGORY,
  IC_CLOCK,
  IC_DOWN_ARROW,
  IC_LOCATION,
  IC_PARKING,
  IC_PHONE,
  IC_SUBWAY,
} from '../../../../../constants/icons';
import {
  CONVENIENCE_ICON,
  CONVENIENCE_NAME,
  DAY,
} from '../../../../../constants/constants';

import * as S from './styles';
import {useMapStore} from '../../../../../stores/mapStore';

const CURRENT_DAY = new Date().getDay();

const Home = () => {
  const [isBusinessHourOpened, setIsBusinessHourOpened] = useState(false);

  const {filteredStoreBasicInformation, selectedStoreIndex} = useMapStore();

  const store = filteredStoreBasicInformation[selectedStoreIndex];

  if (!store) {
    return;
  }

  const getParkingInformation = () => {
    switch (store.parking) {
      case true:
        return '주차 가능';
      case false:
        return '주차 불가능';
      default:
        return '정보 없음';
    }
  };

  const getSortedBusinessHours = () => {
    const daysOfWeek = [
      '일요일',
      '월요일',
      '화요일',
      '수요일',
      '목요일',
      '금요일',
      '토요일',
    ];
    const sortedDays = [
      ...daysOfWeek.slice(CURRENT_DAY + 1),
      ...daysOfWeek.slice(0, CURRENT_DAY),
    ];
    return sortedDays.map(day => ({
      day,
      hours: store.businessHour[day.slice(0, 1)] || '정보 없음',
    }));
  };

  const filteredAmenities = (
    Object.keys(
      store.convenience[0].convenienceDetails,
    ) as (keyof ConvenienceType['convenienceDetails'])[]
  ).filter(key => store.convenience[0].convenienceDetails[key]);

  const handleBusinessHourPress = () => {
    setIsBusinessHourOpened(prev => !prev);
  };

  return (
    <S.HomeContainer>
      <S.LineContainer>
        <S.Icon source={IC_LOCATION} />
        <S.BasicText>{store.address}</S.BasicText>
      </S.LineContainer>
      <S.LineContainer>
        <S.Icon source={IC_SUBWAY} />
        <S.BasicText>{store.transportationConvenience}</S.BasicText>
      </S.LineContainer>

      <S.BusinessHourContainer onPress={handleBusinessHourPress}>
        <S.LineContainer>
          <S.Icon source={IC_CLOCK} />
          <S.TextContainer>
            <S.BoldText>{DAY[CURRENT_DAY]}</S.BoldText>
            <S.TimeText>
              {store.businessHour[DAY[CURRENT_DAY].slice(0, 1)]}
            </S.TimeText>
          </S.TextContainer>
        </S.LineContainer>
        <S.Icon source={IC_DOWN_ARROW} />
      </S.BusinessHourContainer>
      {isBusinessHourOpened && (
        <S.BusinessHourDetailContainer>
          {getSortedBusinessHours().map(({day, hours}) => (
            <S.LineContainer key={day}>
              <S.BasicText>{day}</S.BasicText>
              <S.BasicText>{hours}</S.BasicText>
            </S.LineContainer>
          ))}
        </S.BusinessHourDetailContainer>
      )}

      <S.LineContainer>
        <S.Icon source={IC_PHONE} />
        <S.BasicText>{store.contactNumber}</S.BasicText>
      </S.LineContainer>
      <S.LineContainer>
        <S.Icon source={IC_PARKING} />
        <S.BasicText>{getParkingInformation()}</S.BasicText>
      </S.LineContainer>

      <S.CategoryContainer>
        <S.LineContainer>
          <S.Icon source={IC_CATEGORY} />
          <S.BasicText>유아용품 및 시설</S.BasicText>
        </S.LineContainer>
        <S.CategoryCardList>
          {filteredAmenities.map(convenience => (
            <S.CategoryCardContainer key={convenience}>
              <S.CategoryCard>
                <S.CategoryIcon source={CONVENIENCE_ICON[convenience]} />
                <S.CategoryName>{CONVENIENCE_NAME[convenience]}</S.CategoryName>
              </S.CategoryCard>
            </S.CategoryCardContainer>
          ))}
        </S.CategoryCardList>
      </S.CategoryContainer>
    </S.HomeContainer>
  );
};

export default Home;
