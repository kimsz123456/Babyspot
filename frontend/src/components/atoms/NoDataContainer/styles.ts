import {Text} from 'react-native';
import styled from 'styled-components';
import {GrayColors} from '../../../constants/colors';
import scale from '../../../utils/scale';

export const NoReviewText = styled(Text)`
  text-align: center;
  padding: ${scale(20)}px;
  color: ${GrayColors[500]};
`;
