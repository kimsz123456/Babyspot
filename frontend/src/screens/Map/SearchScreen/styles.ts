import {Image, Pressable, Text, TouchableOpacity, View} from 'react-native';
import styled from 'styled-components/native';
import scale from '../../../utils/scale';
import {GrayColors, PrimaryColors} from '../../../constants/colors';
import {FontStyles} from '../../../constants/fonts';

export const SearchScreenContainer = styled(View)`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: ${scale(24)}px;
  padding: ${scale(32)}px ${scale(24)}px;
  background-color: ${GrayColors[0]};
`;

export const PlaceSearchButton = styled(View)`
  flex-direction: row;
  align-items: center;
  border-width: 1px;
  border-style: solid;
  border-color: ${GrayColors[200]};
  border-radius: 5px;
  background-color: ${GrayColors[0]};
`;

export const LeftArrowIconContainer = styled(Pressable)`
  padding: ${scale(8)}px;
`;

export const LeftArrowIcon = styled(Image)`
  width: ${scale(24)}px;
  height: ${scale(24)}px;
`;

export const SearchHistoryListContainer = styled(View)`
  display: flex;
  flex-direction: column;
  gap: ${scale(16)}px;
`;

export const SearchHistoryListTitle = styled(Text)`
  ${FontStyles.headingMedium}
  color: ${GrayColors[800]};
`;

export const SearchHistoryList = styled(View)`
  display: flex;
  flex-direction: column;
`;

export const PlaceButtonTile = styled(TouchableOpacity)<{$showLine: boolean}>`
  padding: ${scale(16)}px 0px;
  border-bottom-width: ${({$showLine}) => ($showLine ? '1px' : '0px')};
  border-bottom-color: ${GrayColors[300]};
`;

export const PlaceNameText = styled(View)`
  flex-direction: row;
  flex-wrap: wrap;
`;

export const PlaceNameRawText = styled(Text)`
  ${FontStyles.bodyMedium};
  color: ${GrayColors[800]};
`;

export const HighlightedText = styled(Text)`
  ${FontStyles.bodyMedium};
  color: ${PrimaryColors[500]};
`;

export const PlaceAddressText = styled(Text)`
  ${FontStyles.captionMedium};
  color: ${GrayColors[700]};
`;
