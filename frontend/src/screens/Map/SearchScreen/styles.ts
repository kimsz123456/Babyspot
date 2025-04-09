import {Text, View} from 'react-native';

import styled from 'styled-components/native';
import scale from '../../../utils/scale';
import {GrayColors} from '../../../constants/colors';
import {FontStyles} from '../../../constants/fonts';

export const SearchScreenContainer = styled(View)`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: ${scale(32)}px;
  padding: ${scale(32)}px ${scale(24)}px;
  background-color: ${GrayColors[0]};
`;

export const SearchButtonContainer = styled(View)`
  display: flex;
  flex-direction: row;
`;

export const SearchHistoryListContainer = styled(View)`
  display: flex;
  flex-direction: column;
  gap: ${scale(16)}px;
`;

export const SearchHistoryListTitle = styled(Text)`
  ${FontStyles.headingMedium}
  color: ${GrayColors[800]};
`;

export const SearchHistoryList = styled(View)`
  display: flex;
  flex-direction: column;
`;

export const Divider = styled(View)`
  height: 1px;
  background-color: ${GrayColors[200]};
`;
