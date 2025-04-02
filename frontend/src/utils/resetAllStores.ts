import {useGlobalStore} from '../stores/globalStore';
import {useMapStore} from '../stores/mapStore';
import {useOnboardingStore} from '../stores/onboardingStore';
import {useProfileStore} from '../stores/profileStore';
import {useRecommendStore} from '../stores/recommendStore';

const resetAllStores = () => {
  useGlobalStore.getState().resetGlobalState();
  useMapStore.getState().resetMapState();
  useOnboardingStore.getState().resetOnboardingStore();
  useProfileStore.getState().resetProfileState();
  useRecommendStore.getState().resetRecommendState();
};

export default resetAllStores;
