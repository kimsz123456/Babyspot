import {Image, Text, TouchableOpacity, View} from 'react-native';
import styled from 'styled-components';
import {GrayColors} from '../../../constants/colors';
import scale from '../../../utils/scale';
import {FontStyles} from '../../../constants/fonts';

export const WriteReviewScreenContainer = styled(View)`
  flex: 1;
  flex-direction: column;
  align-items: center;
  background-color: ${GrayColors[0]};
  padding: ${scale(24)}px;
`;

export const ReviewContainer = styled(View)`
  width: 100%;
  gap: ${scale(24)}px;
  align-items: center;
  margin-bottom: ${scale(60)}px;
`;

export const AddImageButtonContainer = styled(TouchableOpacity)`
  width: 100%;
  gap: ${scale(8)}px;
  padding: ${scale(32)}px ${scale(16)}px;
  border: 1px solid ${GrayColors[200]};
  border-radius: ${scale(10)}px;
  justify-content: center;
  align-items: center;
`;

export const AddImageText = styled(Text)`
  ${FontStyles.bodyMedium};
  color: ${GrayColors[800]};
`;

export const AddImageSecondaryPlusIcon = styled(Image)`
  width: ${scale(32)}px;
  height: ${scale(32)}px;
`;
