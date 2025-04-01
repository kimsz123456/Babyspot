import {Image, Text, View} from 'react-native';
import styled from 'styled-components';
import scale from '../../../../utils/scale';
import {FontStyles} from '../../../../constants/fonts';
import {GrayColors} from '../../../../constants/colors';

export const WriteCompleteScreenContainer = styled(View)`
  flex: 1;
  background-color: ${GrayColors[0]};
  padding: ${scale(16)}px ${scale(24)}px;
  justify-content: space-between;
`;

export const CompleteContainer = styled(View)`
  flex: 1;
  align-items: center;
  justify-content: center;
  gap: ${scale(36)}px;
`;

export const CompleteIcon = styled(Image)`
  width: ${scale(50)}px;
  height: ${scale(50)}px;
`;

export const CompleteText = styled(Text)`
  ${FontStyles.headingMedium};
  color: ${GrayColors[800]};
`;
