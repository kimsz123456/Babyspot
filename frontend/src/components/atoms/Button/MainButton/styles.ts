import {Text, View} from 'react-native';
import styled from 'styled-components/native';
import {GrayColors, PrimaryColors} from '../../../../constants/colors';
import {FontStyles} from '../../../../constants/fonts';
import scale from '../../../../utils/scale';

const MainButtonContainer = styled(View)`
  width: 100%;
  border-radius: 10px;
  background-color: ${PrimaryColors[500]};
  flex: 1;
  align-items: center;
`;

const MainButtonText = styled(Text)`
  ${FontStyles.bodyMedium};
  color: ${GrayColors[0]};
  padding: ${scale(16)}px 0;
`;

export {MainButtonContainer, MainButtonText};
