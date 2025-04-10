import {Image, Pressable, Text, View} from 'react-native';

import styled from 'styled-components/native';

import scale from '../../../../../utils/scale';
import {FontStyles} from '../../../../../constants/fonts';
import {GrayColors, PrimaryColors} from '../../../../../constants/colors';

export const StoreBasicInformationContainer = styled(Pressable)`
  display: flex;
  flex-direction: column;
  gap: ${scale(16)}px;
  padding: ${scale(8)}px 0;
  width: 100%;
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
  width: 100%;
  overflow: hidden;
`;

export const StoreName = styled(Text).attrs({
  numberOfLines: 1,
  ellipsizeMode: 'tail',
})`
  max-width: 50%;
  ${FontStyles.bodyMedium}
  color: ${GrayColors[800]};
  font-weight: 700;
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
  font-weight: 700;
`;

export const ImageContainer = styled(View)`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;
export const Images = styled(Image)`
  width: ${scale(66)}px;
  height: ${scale(66)}px;
  border-radius: 10px;
`;
export const OverlayWrapper = styled(View)`
  position: relative;
  align-items: center;
  justify-items: center;
`;
export const OverlayText = styled(Text)`
  position: absolute;
  width: ${scale(66)}px;
  height: ${scale(66)}px;
  border-radius: 10px;
  ${FontStyles.bodyMedium};
  color: ${GrayColors[0]};
  text-align: center;
  text-align-vertical: center;
  background-color: rgba(0, 0, 0, 0.6);
`;
