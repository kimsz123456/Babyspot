import {Image, Text, View} from 'react-native';

import styled from 'styled-components/native';

import scale from '../../../../../utils/scale';
import {FontStyles} from '../../../../../constants/fonts';
import {GrayColors, SecondaryColors} from '../../../../../constants/colors';

export const MyReviewInformationContainer = styled(View)`
  display: flex;
  flex-direction: column;
  gap: ${scale(8)}px;
  padding-top: ${scale(8)}px;
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
`;
export const StoreName = styled(Text)`
  ${FontStyles.bodyMedium}
  font-weight: bold;
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
export const OKZoneMarker = styled(View)`
  padding: ${scale(4)}px;
  border-radius: 15px;
  border-width: 1px;
  border-color: ${SecondaryColors[500]};
  background-color: ${GrayColors[0]};
`;
export const OKZoneText = styled(Text)`
  ${FontStyles.captionSmall}
  color: ${SecondaryColors[500]};
`;

export const SecondRowContainer = styled(View)`
  flex-direction: row;
  align-items: center;
`;
export const RatingText = styled(Text)`
  ${FontStyles.captionSmall};
  color: ${GrayColors[700]};
  font-weight: bold;
  padding-top: ${scale(2)}px;
`;
export const Rating = styled(Text)`
  ${FontStyles.captionSmall};
  color: ${GrayColors[800]};
  padding-left: ${scale(4)}px;
  padding-right: ${scale(4)}px;
  padding-top: ${scale(2)}px;
`;
export const RatingContainer = styled(View)`
  display: flex;
  flex-direction: row;
`;
export const SmallIcon = styled(Image)`
  width: ${scale(16)}px;
  height: ${scale(16)}px;
`;

export const ReviewText = styled(Text).attrs({
  numberOfLines: 2,
  ellipsizeMode: 'tail',
})`
  ${FontStyles.captionMedium};
  color: ${GrayColors[800]};
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

export const LastRowContainer = styled(View)`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;
export const LikesContainer = styled(View)`
  flex-direction: row;
  align-items: center;
  gap: ${scale(4)}px;
  padding: ${scale(6)}px ${scale(8)}px;
  border-radius: 24px;
  border-width: 1px;
  border-color: ${GrayColors[200]};
`;
export const LikeIcon = styled(Image)`
  width: ${scale(12)}px;
  height: ${scale(12)}px;
`;
export const Likes = styled(Text)`
  ${FontStyles.captionSmall}
  color: ${GrayColors[800]};
`;
export const Date = styled(Text)`
  ${FontStyles.captionSmall};
  color: ${GrayColors[300]};
`;
