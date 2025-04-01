import {FlatList, Text, View} from 'react-native';
import styled from 'styled-components';
import scale from '../../../../utils/scale';
import {FontStyles} from '../../../../constants/fonts';
import {GrayColors} from '../../../../constants/colors';
import {AgeProps} from '.';

export const ReviewFilterModalChildrenContainer = styled(View)`
  gap: ${scale(24)}px;
`;

export const BodyTitle = styled(Text)`
  ${FontStyles.headingSmall};
  color: ${GrayColors[800]};
`;

export const IconListContainer = styled(FlatList<AgeProps>)`
  flex-grow: 0;
`;
