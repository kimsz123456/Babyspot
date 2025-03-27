import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {OnboardingStackParamList} from '../navigation/OnboardingStackNavigator';

type OnboardingNavigationProp =
  NativeStackNavigationProp<OnboardingStackParamList>;

export const useOnboardingNavigation = () =>
  useNavigation<OnboardingNavigationProp>();
