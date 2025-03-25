import {Dimensions} from 'react-native';
import {FIGMA_DESIGN_WIDTH} from '../constants/constants';

const {width} = Dimensions.get('window');

const scale = (size: number) => (width / FIGMA_DESIGN_WIDTH) * size;

export default scale;
