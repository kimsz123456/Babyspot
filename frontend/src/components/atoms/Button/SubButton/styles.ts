import {Text, TouchableOpacity} from 'react-native';
import styled from 'styled-components/native';
import {GrayColors} from '../../../../constants/colors';
import {FontStyles} from '../../../../constants/fonts';
import scale from '../../../../utils/scale';

interface SubButtonProps {
  $disabled?: boolean;
  $color?: string;
}

const SubButtonContainer = styled(TouchableOpacity)<SubButtonProps>`
  width: 100%;
  border-radius: 10px;
  border-color: ${({$color, $disabled}) =>
    $disabled ? GrayColors[500] : $color};
  border-width: ${scale(1)}px;
  background-color: ${GrayColors[0]};
  align-items: center;
`;
const SubButtonText = styled(Text)<SubButtonProps>`
  ${FontStyles.bodyMedium};
  color: ${({$color, $disabled}) => ($disabled ? GrayColors[500] : $color)};
  padding: ${scale(16)}px 0;
`;

export {SubButtonContainer, SubButtonText};
