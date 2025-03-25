import styled from 'styled-components/native';
import {View} from 'react-native';
import scale from '../../../../../utils/scale';

const ReviewListContainer = styled(View)`
  padding-top: ${scale(24)}px;
  padding-bottom: ${scale(24)}px;
  gap: ${scale(16)}px;
`;

export {ReviewListContainer};
