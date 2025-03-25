import {Pressable, Text} from 'react-native';

import styled from 'styled-components/native';

import {GrayColors} from '../../../../../constants/colors';
import {FontStyles} from '../../../../../constants/fonts';

export const Chip = styled(Pressable)`
  padding: 8px;
  border-radius: 8px;
  border-width: 1px;
  border-color: ${GrayColors[200]};
  background-color: ${GrayColors[0]};
  elevation: 1;
`;

export const ChipText = styled(Text)`
  ${FontStyles.captionMedium}
  color: ${GrayColors[800]};
`;
