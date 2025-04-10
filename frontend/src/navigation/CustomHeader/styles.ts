import {Image, Pressable, Text, View} from 'react-native';
import styled from 'styled-components';
import {FontStyles} from '../../constants/fonts';
import scale from '../../utils/scale';
import {GrayColors} from '../../constants/colors';

export const CustomHeaderContainer = styled(View)<{$insetsTop: number}>`
  height: ${({$insetsTop}) => $insetsTop + scale(56)}px;
  width: 100%;
  background-color: white;
  flex-direction: row;
  border-bottom-width: 1px;
  border-bottom-color: ${GrayColors[200]};
  align-items: flex-end;
  padding: ${scale(16)}px ${scale(24)}px;
`;

export const HeaderContainer = styled(View)`
  align-items: center;
  flex-direction: row;
  gap: ${scale(8)}px;
`;

export const IconContainer = styled(Pressable)``;

export const IconImage = styled(Image)`
  width: scale(24);
  height: scale(24);
`;

export const Title = styled(Text)`
  ${FontStyles.headingSmall};
  color: ${GrayColors[800]};
`;
