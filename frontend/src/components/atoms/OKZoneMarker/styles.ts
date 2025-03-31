import {View, Text} from 'react-native';
import styled from 'styled-components';
import {SecondaryColors, GrayColors} from '../../../constants/colors';
import {FontStyles} from '../../../constants/fonts';
import scale from '../../../utils/scale';

export const OKZoneMarkerContainer = styled(View)`
  padding: ${scale(4)}px;
  border-radius: 15px;
  border-width: 1px;
  border-color: ${SecondaryColors[500]};
  background-color: ${GrayColors[0]};
`;

export const OKZoneText = styled(Text)`
  ${FontStyles.captionSmall}
  color: ${SecondaryColors[500]};
`;
