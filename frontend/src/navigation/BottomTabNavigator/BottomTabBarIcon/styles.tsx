import {Image, ImageSourcePropType} from 'react-native';
import styled from 'styled-components/native';
import scale from '../../../utils/scale';

interface BottomTabBarIconProps {
  source: ImageSourcePropType;
}

export const BottomTabBarIcon = styled(Image).attrs<BottomTabBarIconProps>(
  ({source}) => ({
    source,
  }),
)`
  width: ${scale(24)}px;
  height: ${scale(24)}px;
`;
