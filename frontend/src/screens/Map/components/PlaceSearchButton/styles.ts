import {Text} from 'react-native';

import {BlurView} from '@react-native-community/blur';
import styled from 'styled-components/native';

import {FontStyles} from '../../../../constants/fonts';
import {GrayColors} from '../../../../constants/colors';

export const PlaceSearchButtonContainer = styled(BlurView).attrs({
  blurType: 'light',
  blurAmount: 12,
})`
  z-index: 10;
  position: absolute;
  top: 32px;
  left: 24px;
  padding: 8px;
  border: 1px solid ${GrayColors[200]};
  border-radius: 5px;
  width: 100%;
  background-color: ${GrayColors['0/30']};
`;

export const Placeholder = styled(Text)`
  ${FontStyles.bodyMedium}
  color: ${GrayColors[300]};
`;
