import styled from 'styled-components/native';
import {Text} from 'react-native';
import {PrimaryColors, GrayColors} from '../../../constants/colors';
import {FontStyles} from '../../../constants/fonts';

export const BottomTabBarLabel = styled(Text)<{$focused: boolean}>`
  color: ${({$focused}) => ($focused ? PrimaryColors[500] : GrayColors[800])};
  ${FontStyles.captionMedium}
`;
