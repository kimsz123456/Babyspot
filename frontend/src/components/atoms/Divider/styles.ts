import styled from 'styled-components/native';
import {View} from 'react-native';
import scale from '../../../utils/scale';
import {GrayColors} from '../../../constants/colors';

export const DividerContainer = styled(View)`
  width: full;
  height: ${scale(10)}px;
  background-color: ${GrayColors[200]};
`;
