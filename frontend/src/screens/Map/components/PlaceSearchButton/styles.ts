import {Pressable, Text} from 'react-native';

import styled from 'styled-components';

import scale from '../../../../utils/scale';
import {FontStyles} from '../../../../constants/fonts';
import {GrayColors} from '../../../../constants/colors';

interface PlaceholderProps {
  isPlaceholder: boolean;
}

export const PlaceTextContainer = styled(Pressable)`
  flex: 1;
  display: flex;
  flex-direction: row;
  align-items: center;
  border-width: 1px;
  border-style: solid;
  border-color: ${GrayColors[200]};
  border-radius: 5px;
  background-color: ${GrayColors[0]};
  padding: ${scale(8)}px;
`;

export const PlaceText = styled(Text).attrs({
  numberOfLines: 1,
  ellipsizeMode: 'tail',
})<PlaceholderProps>`
  ${FontStyles.bodyMedium};
  color: ${({isPlaceholder}) =>
    isPlaceholder ? GrayColors[300] : GrayColors[800]};
`;
