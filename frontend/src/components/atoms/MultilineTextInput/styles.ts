import {Text, View} from 'react-native';
import styled from 'styled-components';
import {GrayColors} from '../../../constants/colors';
import scale from '../../../utils/scale';

export const MultilineTextInputContainer = styled(View)`
  width: 100%;
  border-width: 1px;
  border-color: ${GrayColors[200]};
  border-radius: ${scale(10)}px;
  padding: ${scale(16)}px;
  margin: 0px;
  gap: ${scale(8)}px;
  justify-content: space-between;
`;

export const CountText = styled(Text)<{$isGray: boolean}>`
  text-align: right;
  color: ${({$isGray}) => ($isGray ? GrayColors[300] : GrayColors[800])};
`;
