import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {OnboardingStackParamList} from '../navigation/OnboardingStackNavigator';
import {MapStackParamList} from '../navigation/MapStackNavigator';

type OnboardingNavigationProp =
  NativeStackNavigationProp<OnboardingStackParamList>;

type MapNavigationProp = NativeStackNavigationProp<MapStackParamList>;

export const useOnboardingNavigation = () =>
  useNavigation<OnboardingNavigationProp>();

export const useMapNavigation = () => useNavigation<MapNavigationProp>();
