import {Pressable} from 'react-native';
import styled from 'styled-components/native';
import scale from '../../../../../../utils/scale';
import {Image} from 'react-native';

const PrivacyPolicyWrapper = styled(Pressable)``;

const PrivacyPolicyButton = styled(Image)`
  width: ${scale(24)}px;
  height: ${scale(24)}px;
`;

export {PrivacyPolicyWrapper, PrivacyPolicyButton};
