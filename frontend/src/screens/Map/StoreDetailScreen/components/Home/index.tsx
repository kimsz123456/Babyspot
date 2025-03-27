import React, {useState} from 'react';

import {
  AmenitiesType,
  StoreBasicInformationType,
} from '../../../NearStoreListScreen/components/StoreBasicInformation/types';
import {StoreDetailInformationType} from '../../types';

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
  AMENITY_ICON,
  AMENITY_NAME,
  DAY,
} from '../../../../../constants/constants';

import * as S from './styles';

const CURRENT_DAY = new Date().getDay();

interface HomeProps {
  basicInformation: StoreBasicInformationType;
  detailInformation: StoreDetailInformationType;
}

const Home = ({basicInformation, detailInformation}: HomeProps) => {
  const [isBusinessHourOpened, setIsBusinessHourOpened] = useState(false);

  const getParkingInformation = () => {
    switch (basicInformation.parking) {
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
      hours: basicInformation.businessHour[day] || '정보 없음',
    }));
  };

  const filteredAmenities = (
    Object.keys(basicInformation.amenities) as (keyof AmenitiesType)[]
  ).filter(key => basicInformation.amenities[key]);

  const handleBusinessHourPress = () => {
    setIsBusinessHourOpened(prev => !prev);
  };

  return (
    <S.HomeContainer>
      <S.LineContainer>
        <S.Icon source={IC_LOCATION} />
        <S.BasicText>{basicInformation.address}</S.BasicText>
      </S.LineContainer>
      <S.LineContainer>
        <S.Icon source={IC_SUBWAY} />
        <S.BasicText>{basicInformation.transportationConvenience}</S.BasicText>
      </S.LineContainer>

      <S.BusinessHourContainer onPress={handleBusinessHourPress}>
        <S.LineContainer>
          <S.Icon source={IC_CLOCK} />
          <S.TextContainer>
            <S.BoldText>{DAY[CURRENT_DAY]}</S.BoldText>
            <S.BasicText>
              {basicInformation.businessHour[DAY[CURRENT_DAY]]}
            </S.BasicText>
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
        <S.BasicText>{basicInformation.contactNumber}</S.BasicText>
      </S.LineContainer>
      <S.LineContainer>
        <S.Icon source={IC_PARKING} />
        <S.BasicText>{getParkingInformation()}</S.BasicText>
      </S.LineContainer>

      <S.CategoryContainer>
        <S.LineContainer>
          <S.Icon source={IC_CATEGORY} />
          <S.BasicText>카테고리</S.BasicText>
        </S.LineContainer>
        <S.CategoryCardList>
          {filteredAmenities.map(amenity => (
            <S.CategoryCardContainer>
              <S.CategoryCard>
                <S.CategoryIcon source={AMENITY_ICON[amenity]} />
                <S.CategoryName>{AMENITY_NAME[amenity]}</S.CategoryName>
              </S.CategoryCard>
            </S.CategoryCardContainer>
          ))}
        </S.CategoryCardList>
      </S.CategoryContainer>
    </S.HomeContainer>
  );
};

export default Home;
