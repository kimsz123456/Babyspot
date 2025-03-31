import {TouchableOpacity, View, Text, Image} from 'react-native';
import styled from 'styled-components';
import {GrayColors} from '../../../constants/colors';
import {FontStyles} from '../../../constants/fonts';
import scale from '../../../utils/scale';

export const MoreButtonContainer = styled(TouchableOpacity)`
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: ${scale(32)}px;
`;

export const MoreButton = styled(View)`
  position: absolute;
  display: flex;
  flex-direction: row;
  gap: ${scale(8)}px;
  padding: ${scale(8)}px ${scale(16)}px;
  border-radius: 100px;
  background-color: ${GrayColors[100]};
`;

export const ButtonText = styled(Text)`
  ${FontStyles.captionMedium}
  color: ${GrayColors[700]};
`;

export const ArrowIcon = styled(Image)<{$isOpened: boolean}>`
  width: ${scale(16)}px;
  height: ${scale(16)}px;

  transform: ${({$isOpened}) =>
    $isOpened ? 'rotate(180deg)' : 'rotate(0deg)'};
`;
