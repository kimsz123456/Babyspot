import {TouchableOpacity} from 'react-native';
import styled from 'styled-components/native';
import scale from '../../../../../../utils/scale';
import {Image} from 'react-native';

const ProfileEditIconButton = styled(TouchableOpacity)``;

const ProfileEditIcon = styled(Image)`
  width: ${scale(32)}px;
  height: ${scale(32)}px;
`;

export {ProfileEditIconButton, ProfileEditIcon};
