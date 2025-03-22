import styled from 'styled-components/native';
import {FontStyles} from '../../../constants/fonts';
import {SystemColors} from '../../../constants/colors';
export const Title = styled.Text`
  font-family: ${FontStyles.displayMedium.fontFamily};
  font-size: ${FontStyles.displayMedium.fontSize}px;
  line-height: ${FontStyles.displayMedium.lineHeight}px;
  color: ${SystemColors.danger};
`;
