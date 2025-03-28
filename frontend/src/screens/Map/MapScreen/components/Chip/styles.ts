import {Pressable, Text, TouchableOpacity} from 'react-native';
import styled from 'styled-components/native';
import scale from '../../../../../utils/scale';
import {GrayColors, PrimaryColors} from '../../../../../constants/colors';
import {FontStyles} from '../../../../../constants/fonts';

export const Chip = styled(Pressable)<{$isSelected?: boolean}>`
  padding: ${scale(8)}px;
  border-radius: 8px;
  border-width: 1px;
  border-color: ${({$isSelected}) =>
    $isSelected ? PrimaryColors[600] : GrayColors[200]};
  background-color: ${({$isSelected}) =>
    $isSelected ? PrimaryColors[500] : GrayColors[0]};
  elevation: 1;
`;

export const ChipText = styled(Text)<{$isSelected?: boolean}>`
  ${FontStyles.captionMedium}
  color: ${({$isSelected}) => ($isSelected ? GrayColors[0] : GrayColors[800])};
`;
