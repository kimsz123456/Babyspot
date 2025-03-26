import styled from 'styled-components/native';
import {View} from 'react-native';
import scale from '../../../utils/scale';
import {GrayColors} from '../../../constants/colors';

const ThickDividerContainer = styled(View)`
  width: 100%;
  height: ${scale(10)}px;
  background-color: ${GrayColors[200]};
`;

const ThinDividerContainer = styled(View)`
  width: 100%;
  height: ${scale(1)}px;
  background-color: ${GrayColors[200]};
`;

export {ThickDividerContainer, ThinDividerContainer};
