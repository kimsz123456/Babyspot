import {Image, Text, View} from 'react-native';
import styled from 'styled-components/native';
import {GrayColors} from '../../../../../constants/colors';
import scale from '../../../../../utils/scale';
import {FontStyles} from '../../../../../constants/fonts';

const ChildAgeWrapper = styled(View)`
  flex: 1;
`;
const ChildTitle = styled(Text)`
  ${FontStyles.captionMedium};
  color: ${GrayColors[800]};
  padding-top: ${scale(16)}px;
  padding-bottom: ${scale(8)}px;
`;
const ChildAgesContainer = styled(View)`
  border-width: ${scale(1)}px;
  border-radius: 10px;
  border-color: ${GrayColors[200]};
  padding: ${scale(16)}px;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;
const ChildAge = styled(Text)`
  ${FontStyles.bodyMedium};
  color: ${GrayColors[800]};
`;

const AgeCountContainer = styled(View)`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  width: ${scale(88)}px;
`;
const AgeCountButton = styled(Image)`
  width: ${scale(24)}px;
  height: ${scale(24)}px;
`;
const AgeCount = styled(Text)`
  ${FontStyles.bodyMedium};
  color: ${GrayColors[800]};
`;

export {
  ChildAgeWrapper,
  ChildTitle,
  ChildAgesContainer,
  ChildAge,
  AgeCountContainer,
  AgeCountButton,
  AgeCount,
};
