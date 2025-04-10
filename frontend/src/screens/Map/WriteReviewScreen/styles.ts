import {
  Image,
  ImageBackground,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import styled from 'styled-components';
import {GrayColors} from '../../../constants/colors';
import scale from '../../../utils/scale';
import {FontStyles} from '../../../constants/fonts';
import {WINDOW_WIDTH} from '../../../constants/constants';

export const WriteReviewScreenContainer = styled(View)`
  flex: 1;
  flex-direction: column;
  align-items: center;
  background-color: ${GrayColors[0]};
  padding: ${scale(24)}px ${scale(24)}px ${scale(16)}px ${scale(24)}px;
`;

export const ReviewContainer = styled(View)<{$isWriteScreen: boolean}>`
  width: 100%;
  gap: ${scale(24)}px;
  align-items: center;
  margin-bottom: ${({$isWriteScreen}) =>
    $isWriteScreen ? scale(75) : scale(12)}px;
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

export const ImageListContainer = styled(ScrollView)`
  width: ${WINDOW_WIDTH}px;
`;

export const AddImageSmallButtonContainer = styled(TouchableOpacity)`
  width: ${scale(80)}px;
  height: ${scale(80)}px;
  border: 1px solid ${GrayColors[200]};
  border-radius: ${scale(10)}px;
  align-items: center;
  justify-content: flex-end;
  padding: ${scale(5)}px;
  gap: ${scale(5)}px;
`;

export const AddImageSmallSecondaryPlusIcon = styled(Image)`
  width: ${scale(28)}px;
  height: ${scale(28)}px;
`;

export const AddImageSmallText = styled(Text)`
  ${FontStyles.captionMedium};
  color: ${GrayColors[300]};
`;

export const ImageContainer = styled(ImageBackground)`
  width: ${scale(80)}px;
  height: ${scale(80)}px;
  align-items: flex-end;
  justify-content: flex-start;
`;

export const DeleteIconContainer = styled(TouchableOpacity)`
  padding: ${scale(6)}px;
`;

export const DeleteImageIcon = styled(Image)`
  width: ${scale(12)}px;
  height: ${scale(12)}px;
  background-color: ${GrayColors[900]};
  border-radius: 1000px;
`;

export const ButtonContainer = styled(View)`
  gap: ${scale(8)}px;
  width: 100%;
`;
