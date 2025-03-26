import {Image, Text, View} from 'react-native';
import styled from 'styled-components/native';
import {FontStyles} from '../../../../../constants/fonts';
import {GrayColors} from '../../../../../constants/colors';
import scale from '../../../../../utils/scale';

const AddButtonWrapper = styled(View)`
  padding-top: ${scale(16)}px;
  flex: 1;
  align-items: center;
`;
const AddButtonContainer = styled(View)`
  width: ${scale(123)}px;
  padding: ${scale(8)}px ${scale(16)}px;
  flex-direction: row;
  align-items: center;
  gap: ${scale(8)}px;
  border-width: ${scale(1)}px;
  border-radius: 50px;
  border-color: ${GrayColors[200]};
`;
const AddButtonTitle = styled(Text)`
  ${FontStyles.bodyMedium};
  color: ${GrayColors[800]};
`;
const AddButton = styled(Image)`
  width: ${scale(24)}px;
  height: ${scale(24)}px;
`;

export {AddButtonWrapper, AddButtonContainer, AddButtonTitle, AddButton};
