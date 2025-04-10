import {Image, Text, View} from 'react-native';
import styled from 'styled-components';
import {GrayColors} from '../../../../../constants/colors';
import scale from '../../../../../utils/scale';
import {FontStyles} from '../../../../../constants/fonts';

export const ChildrenInformationButtonContainer = styled(View)`
  flex-direction: row;
  width: 100%;
  border: 1px solid ${GrayColors[200]};
  padding: ${scale(16)}px;
  justify-content: space-between;
  border-radius: 10px;
`;

export const ChildrenInformationButtonText = styled(Text)`
  ${FontStyles.bodyMedium};
  color: ${GrayColors[800]};
`;

export const IconContainer = styled(View)`
  flex-direction: row;
  align-content: center;
  justify-content: center;
  gap: ${scale(16)}px;
`;

export const IconImage = styled(Image)`
  width: ${scale(24)}px;
  height: ${scale(24)}px;
`;
