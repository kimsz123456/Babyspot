import {Image, Pressable, Text} from 'react-native';

import styled from 'styled-components/native';

import scale from '../../../../utils/scale';
import {FontStyles} from '../../../../constants/fonts';
import {GrayColors} from '../../../../constants/colors';

export const PlaceSearchButton = styled(Pressable)`
  flex: 1;
  display: flex;
  flex-direction: row;
  gap: ${scale(4)}px;
  align-items: center;
  padding: ${scale(8)}px;
  border-width: 1px;
  border-style: solid;
  border-color: ${GrayColors[200]};
  border-radius: 5px;
  background-color: ${GrayColors[0]};
  elevation: 1;
`;

export const LeftArrowIcon = styled(Image)`
  width: ${scale(24)}px;
  height: ${scale(24)}px;
`;

export const Placeholder = styled(Text)`
  ${FontStyles.bodyMedium}
  color: ${GrayColors[300]};
`;
