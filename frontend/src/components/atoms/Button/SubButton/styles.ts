import {Text, TouchableOpacity} from 'react-native';
import styled from 'styled-components/native';
import {GrayColors, PrimaryColors} from '../../../../constants/colors';
import {FontStyles} from '../../../../constants/fonts';
import scale from '../../../../utils/scale';

const SubButtonContainer = styled(TouchableOpacity)`
  width: 100%;
  border-radius: 10px;
  border-color: ${PrimaryColors[500]};
  border-width: ${scale(1)}px;
  background-color: ${GrayColors[0]};
  align-items: center;
`;
const SubButtonText = styled(Text)`
  ${FontStyles.bodyMedium};
  color: ${PrimaryColors[500]};
  padding: ${scale(16)}px 0;
`;

export {SubButtonContainer, SubButtonText};
