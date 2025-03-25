import {Image, Pressable, Text} from 'react-native';

import styled from 'styled-components/native';

import scale from '../../../../../utils/scale';
import {GrayColors, PrimaryColors} from '../../../../../constants/colors';
import {FontStyles} from '../../../../../constants/fonts';

export const ResearchButton = styled(Pressable)`
  position: absolute;
  bottom: ${scale(40)}px;
  align-self: center;

  display: flex;
  flex-direction: row;
  align-items: center;
  gap: ${scale(4)}px;

  padding: ${scale(8)}px;
  border-radius: 999px;
  border-width: 1px;
  border-color: ${GrayColors[200]};
  background-color: ${GrayColors[0]};
  elevation: 1;
`;

export const RetryIcon = styled(Image)`
  width: ${scale(16)}px;
  height: ${scale(16)}px;
`;

export const ResearchText = styled(Text)`
  ${FontStyles.captionMedium}
  color: ${PrimaryColors[500]};
`;
