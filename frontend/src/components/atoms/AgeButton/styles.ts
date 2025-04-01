import {Image, Text, TouchableOpacity} from 'react-native';
import styled from 'styled-components';
import {GrayColors, PrimaryColors} from '../../../constants/colors';
import {FontStyles} from '../../../constants/fonts';
import scale from '../../../utils/scale';

export const IconButtonContainer = styled(TouchableOpacity)<{
  $isSelected: boolean;
}>`
  padding: ${scale(8)}px ${scale(16)}px;
  border: 1px solid
    ${({$isSelected}) => ($isSelected ? PrimaryColors[500] : GrayColors[200])};
  border-radius: ${scale(16)}px;
  gap: ${scale(4)}px;
  align-items: center;
  align-self: center;
  background-color: ${({$isSelected}) =>
    $isSelected ? PrimaryColors[50] : GrayColors[0]};
`;

export const IconImage = styled(Image)`
  width: ${scale(40)}px;
  height: ${scale(40)}px;
`;

export const IconText = styled(Text)<{$isSelected: boolean}>`
  ${FontStyles.bodyMedium};
  color: ${({$isSelected}) =>
    $isSelected ? PrimaryColors[500] : GrayColors[800]};
`;
