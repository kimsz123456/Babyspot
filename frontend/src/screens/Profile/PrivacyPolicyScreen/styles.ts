import {ScrollView, Text, View} from 'react-native';
import styled from 'styled-components';
import {GrayColors} from '../../../constants/colors';
import scale from '../../../utils/scale';
import {FontStyles} from '../../../constants/fonts';

export const BackGround = styled(ScrollView)`
  background-color: ${GrayColors[0]};
  flex: 1;
`;

export const MainWrapper = styled(View)`
  padding: ${scale(24)}px ${scale(16)}px;
`;

export const TitleText = styled(Text)`
  ${FontStyles.headingMedium};
  color: ${GrayColors[800]};
  padding-bottom: ${scale(8)}px;
`;

export const LineText = styled(Text)`
  ${FontStyles.bodySmall};
  color: ${GrayColors[800]};
  font-weight: bold;
  padding-top: ${scale(8)}px;
  padding-bottom: ${scale(4)}px;
`;

export const ListText = styled(Text)`
  ${FontStyles.captionMedium};
  color: ${GrayColors[800]};
  font-weight: bold;
  padding-top: ${scale(4)}px;
`;

export const ContentText = styled(Text)`
  ${FontStyles.captionMedium};
  color: ${GrayColors[800]};
`;

export const DateText = styled(Text)`
  ${FontStyles.captionSmall};
  color: ${GrayColors[900]};
  padding: ${scale(4)}px 0px;
  align-self: flex-end;
`;
