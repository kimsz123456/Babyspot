import {Image, View, TouchableOpacity, Text} from 'react-native';
import styled from 'styled-components';
import {GrayColors} from '../../../constants/colors';
import {FontStyles} from '../../../constants/fonts';
import scale from '../../../utils/scale';

export const FullscreenImage = styled(Image)`
  width: 100%;
  height: 100%;
`;

export const GalleryHeader = styled(View)`
  position: absolute;
  left: 0;
  right: 0;
  z-index: 10;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: ${scale(40)}px ${scale(24)}px 0px;
  background-color: linear-gradient(rgba(0, 0, 0, 0.6), transparent);
`;

export const CloseButton = styled(TouchableOpacity)`
  padding: 8px;
`;

export const CloseIconImage = styled(Image)`
  width: ${scale(24)}px;
  height: ${scale(24)}px;
`;

export const IndexText = styled(Text)`
  ${FontStyles.captionMedium};
  color: ${GrayColors[300]};
`;
