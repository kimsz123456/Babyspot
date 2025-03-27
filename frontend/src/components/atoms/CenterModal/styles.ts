import {View, Text, TouchableOpacity} from 'react-native';
import styled from 'styled-components';
import scale from '../../../utils/scale';
import {FontStyles} from '../../../constants/fonts';
import {GrayColors, PrimaryColors} from '../../../constants/colors';

export const Backdrop = styled(View)`
  flex: 1;
  background-color: rgba(0, 0, 0, 0.6);
  justify-content: center;
  align-items: center;
  padding: ${scale(24)}px;
`;

export const ModalContainer = styled(View)`
  width: 100%;
  background-color: white;
  border-radius: ${scale(16)}px;
  padding: ${scale(24)}px;
  gap: ${scale(24)}px;
  align-items: stretch;
`;

export const Title = styled(Text)`
  ${FontStyles.headingMedium};
  text-align: left;
`;

export const Body = styled(View)``;

export const ButtonRow = styled(View)`
  flex-direction: row;
  gap: ${scale(16)}px;
  justify-content: space-between;
`;

export const CancelButton = styled(TouchableOpacity)`
  flex: 1;
  padding: ${scale(16)}px 0;
  border-radius: ${scale(10)}px;
  border: 1px solid ${PrimaryColors[500]};
  align-items: center;
`;
export const SubmitButton = styled(TouchableOpacity)`
  flex: 1;
  padding: ${scale(16)}px 0;
  background-color: ${PrimaryColors[500]};
  border: 1px solid ${PrimaryColors[500]};
  border-radius: ${scale(10)}px;
  align-items: center;
`;

export const CancelText = styled(Text)`
  color: ${PrimaryColors[500]};
  ${FontStyles.bodyMedium};
`;

export const SubmitText = styled(Text)`
  color: ${GrayColors[0]};
  ${FontStyles.bodyMedium};
`;
