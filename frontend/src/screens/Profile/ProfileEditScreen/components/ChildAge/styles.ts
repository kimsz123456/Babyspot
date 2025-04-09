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
  flex-direction: column;
  gap: ${scale(16)}px;
  align-content: center;
`;
const ChildAge = styled(Text)`
  ${FontStyles.bodyMedium};
  color: ${GrayColors[800]};
`;

const AgeCountContainer = styled(View)`
  align-self: center;
  flex-direction: row;
  border-radius: 100px;
  padding: ${scale(16)}px ${scale(16)}px;
  gap: ${scale(8)}px;
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
