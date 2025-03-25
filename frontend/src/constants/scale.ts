import {Dimensions} from 'react-native';

const {width} = Dimensions.get('window');
const guidelineBaseWidth = 360;

const SCALE = width / guidelineBaseWidth;

export default SCALE;
