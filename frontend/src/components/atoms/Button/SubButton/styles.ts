import {Text, TouchableOpacity} from 'react-native';
import styled from 'styled-components/native';
import {GrayColors} from '../../../../constants/colors';
import {FontStyles} from '../../../../constants/fonts';
import scale from '../../../../utils/scale';

const SubButtonContainer = styled(TouchableOpacity)<{$color: string}>`
  width: 100%;
  border-radius: 10px;
  border-color: ${({$color}) => $color};
  border-width: ${scale(1)}px;
  background-color: ${GrayColors[0]};
  align-items: center;
`;
const SubButtonText = styled(Text)<{$color: string}>`
  ${FontStyles.bodyMedium};
  color: ${({$color}) => $color};
  padding: ${scale(16)}px 0;
`;

export {SubButtonContainer, SubButtonText};
