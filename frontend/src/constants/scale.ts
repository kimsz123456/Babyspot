import {Dimensions} from 'react-native';

const {width} = Dimensions.get('window');
const guidelineBaseWidth = 360;

const scale = (size: number) => (width / guidelineBaseWidth) * size;

export default scale;
