import {Text, TouchableOpacity, View} from 'react-native';
import styled from 'styled-components/native';
import scale from '../../../../utils/scale';
import {GrayColors, PrimaryColors} from '../../../../constants/colors';
import {FontStyles} from '../../../../constants/fonts';

export const PlaceSearchContainer = styled(View)`
  flex: 1;
  padding: ${scale(16)}px ${scale(24)}px 0px;
  background-color: ${GrayColors[0]};
  gap: ${scale(16)}px;
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
