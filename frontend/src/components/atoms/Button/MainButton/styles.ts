import {Text, TouchableOpacity} from 'react-native';
import {GrayColors, PrimaryColors} from '../../../../constants/colors';
import {FontStyles} from '../../../../constants/fonts';
import scale from '../../../../utils/scale';
import styled from 'styled-components';

interface MainButtonProps {
  disabled?: boolean;
}

const MainButtonContainer = styled(TouchableOpacity)<MainButtonProps>`
  width: 100%;
  border-radius: 10px;
  align-items: center;
  background-color: ${({disabled}) =>
    disabled ? GrayColors[100] : PrimaryColors[500]};
  border: 1px solid
    ${({disabled}) => (disabled ? GrayColors[200] : 'transparent')};
`;

const MainButtonText = styled(Text)<MainButtonProps>`
  ${FontStyles.bodyMedium};
  color: ${({disabled}) => (disabled ? GrayColors[500] : GrayColors[0])};
  padding: ${scale(16)}px 0;
`;

export {MainButtonContainer, MainButtonText};
