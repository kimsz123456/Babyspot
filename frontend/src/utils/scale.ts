import {Dimensions} from 'react-native';
import {FIGMA_DESIGN_WIDTH} from '../constants/constants';

const {width} = Dimensions.get('window');

const scale = (size: number) => (width / FIGMA_DESIGN_WIDTH) * size;

export function scaleLetterSpacing(fontSize: number, percent: number): number {
  return parseFloat((scale(fontSize) * (percent / 100)).toFixed(2));
}

export default scale;
