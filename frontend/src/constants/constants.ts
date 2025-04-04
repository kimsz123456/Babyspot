import {Dimensions} from 'react-native';
import {
  IC_AGE1,
  IC_AGE2,
  IC_AGE3,
  IC_AGE4,
  IC_AGE5,
  IC_AGE6,
  IC_AGE7,
  IC_BABY_BOTTLE,
  IC_CHAIR,
  IC_CUTLERY,
  IC_DIAPER,
  IC_PLAYGROUND,
  IC_TABLE,
} from './icons';
import {Coordinate} from '../screens/Map/MapScreen/types';

export const FIGMA_DESIGN_WIDTH = 360 as const;
export const WINDOW_WIDTH = Dimensions.get('window').width;

export const AGE_MARKERS = [
  IC_AGE1,
  IC_AGE1,
  IC_AGE2,
  IC_AGE3,
  IC_AGE4,
  IC_AGE5,
  IC_AGE6,
  IC_AGE7,
] as const;

export const DAY = [
  '일요일',
  '월요일',
  '화요일',
  '수요일',
  '목요일',
  '금요일',
  '토요일',
] as const;

export const CONVENIENCE_NAME = {
  babyChair: '유아 의자',
  babyTableware: '유아 식기',
  diaperChangingStation: '기저귀 교환대',
  nursingRoom: '수유실',
  groupTable: '6인 이상 테이블',
  playZone: '놀이방',
} as const;

export const CONVENIENCE_ICON = {
  babyChair: IC_CHAIR,
  babyTableware: IC_CUTLERY,
  diaperChangingStation: IC_DIAPER,
  nursingRoom: IC_BABY_BOTTLE,
  groupTable: IC_TABLE,
  playZone: IC_PLAYGROUND,
} as const;

// 초기 위치 강남역
export const INITIAL_MAP_CENTER_COORDINATE: Coordinate = {
  latitude: 37.498040483,
  longitude: 127.02758183,
} as const;
