import {Image, Text, View} from 'react-native';

import styled from 'styled-components/native';

import scale from '../../../../../utils/scale';
import {FontStyles} from '../../../../../constants/fonts';
import {
  GrayColors,
  PrimaryColors,
  SecondaryColors,
} from '../../../../../constants/colors';

export const StoreBasicInformationContainer = styled(View)`
  display: flex;
  flex-direction: column;
  gap: ${scale(16)}px;
  padding: ${scale(8)}px 0;
  width: 100%;
`;

export const CarouselContainer = styled(View)`
  position: relative;
`;

export const ImageContainer = styled(View)`
  width: ${scale(312)}px;
  height: ${scale(120)}px;
`;

export const StoreImage = styled(Image)`
  height: 100%;
  object-fit: cover;
`;

export const ImageIndicatorContainer = styled(View)`
  position: absolute;
  bottom: ${scale(4)}px;
  right: ${scale(4)}px;
  padding: 0 ${scale(4)}px;
  border-radius: 100px;
  background-color: ${GrayColors['900/70']};
`;

export const ImageIndicator = styled(Text)`
  ${FontStyles.captionMedium}
  color: ${GrayColors[300]};
`;

export const ImageCurrentIndex = styled(Text)`
  ${FontStyles.captionMedium}
  color: ${GrayColors[0]};
`;

export const DetailContainer = styled(View)`
  display: flex;
  flex-direction: column;
  gap: ${scale(8)}px;
`;

export const FirstRowContainer = styled(View)`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: ${scale(4)}px;
`;

export const StoreName = styled(Text)`
  ${FontStyles.bodyMedium}
  color: ${GrayColors[800]};
`;

export const StoreCategory = styled(Text)`
  ${FontStyles.captionMedium}
  color: ${GrayColors[700]};
`;

export const AgeMarkerContainer = styled(View)`
  display: flex;
  flex-direction: row;
`;

export const AgeMarker = styled(Image)<{$ageIndex: number}>`
  margin-left: ${({$ageIndex}) => ($ageIndex > 0 ? `-${scale(8)}px` : 0)};
  width: ${scale(24)}px;
  height: ${scale(24)}px;
`;

export const SecondRowContainer = styled(View)`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: ${scale(8)}px;
`;

export const RatingContainer = styled(View)`
  display: flex;
  flex-direction: row;
`;

export const SmallIcon = styled(Image)`
  width: ${scale(16)}px;
  height: ${scale(16)}px;
`;

export const Rating = styled(Text)`
  ${FontStyles.captionMedium}
  color: ${PrimaryColors[500]};
`;

export const ReviewContainer = styled(View)`
  display: flex;
  flex-direction: row;
`;

export const ReviewCount = styled(Text)`
  ${FontStyles.captionMedium}
  color: ${GrayColors[800]};
`;

export const BusinessHourContainer = styled(View)`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: ${scale(8)}px;
`;

export const BusinessHour = styled(Text)`
  ${FontStyles.captionMedium}
  color: ${GrayColors[800]};
`;

export const Day = styled(Text)`
  ${FontStyles.captionMedium}
  color: ${GrayColors[800]};
`;
