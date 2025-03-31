import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {OnboardingStackParamList} from '../navigation/OnboardingStackNavigator';
import {MapStackParamList} from '../navigation/MapStackNavigator';
import {ProfileStackParamList} from '../navigation/ProfileStackNavigator';

type OnboardingNavigationProp =
  NativeStackNavigationProp<OnboardingStackParamList>;

type MapNavigationProp = NativeStackNavigationProp<MapStackParamList>;

type ProfileNavigationProp = NativeStackNavigationProp<ProfileStackParamList>;

export const useOnboardingNavigation = () =>
  useNavigation<OnboardingNavigationProp>();

export const useMapNavigation = () => useNavigation<MapNavigationProp>();

export const useProfileNavigation = () =>
  useNavigation<ProfileNavigationProp>();
