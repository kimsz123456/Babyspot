import {ImageSourcePropType} from 'react-native';
import {
  IC_MAP_NAV,
  IC_MAP_NAV_ACTIVE,
  IC_PROFILE_NAV,
  IC_PROFILE_NAV_ACTIVE,
} from './icons';

const BOTTOM_TABS: {
  [key: string]: {
    label: string;
    iconSource_inactive: ImageSourcePropType;
    iconSource_active: ImageSourcePropType;
  };
} = {
  Map: {
    label: '지도',
    iconSource_inactive: IC_MAP_NAV,
    iconSource_active: IC_MAP_NAV_ACTIVE,
  },
  Profile: {
    label: '프로필',
    iconSource_inactive: IC_PROFILE_NAV,
    iconSource_active: IC_PROFILE_NAV_ACTIVE,
  },
};

export default BOTTOM_TABS;
