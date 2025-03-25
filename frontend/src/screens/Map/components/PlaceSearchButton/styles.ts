import {Text, View} from 'react-native';

import styled from 'styled-components/native';

import {FontStyles} from '../../../../constants/fonts';
import {GrayColors} from '../../../../constants/colors';

export const PlaceSearchButton = styled(View)`
  flex: 1;
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 8px;
  border-width: 1px;
  border-style: solid;
  border-color: ${GrayColors[200]};
  border-radius: 5px;
  background-color: ${GrayColors[0]};
`;

export const Placeholder = styled(Text)`
  ${FontStyles.bodyMedium}
  color: ${GrayColors[300]};
`;
