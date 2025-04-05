import {create} from 'zustand';
import {MemberProfileType} from '../services/profileService';
import {ReviewType} from '../services/reviewService';

interface GlobalState {
  accessToken: string | null;
  isLoggedIn: boolean;
  memberProfile: MemberProfileType | null;
  myReviews: ReviewType[];
  shouldRefreshReviews: boolean;
  setAccessToken: (token: string | null) => void;
  setIsLoggedIn: (loggedIn: boolean) => void;
  setMemberProfile: (profile: MemberProfileType | null) => void;
  setMyReviews: (reviews: ReviewType[]) => void;
  setShouldRefreshReviews: (shouldRefresh: boolean) => void;
  resetGlobalState: () => void;
}

const initialState = {
  accessToken: null,
  isLoggedIn: false,
  memberProfile: null,
  myReviews: [],
  shouldRefreshReviews: true,
};

export const useGlobalStore = create<GlobalState>(set => ({
  ...initialState,
  resetGlobalState: () => set({...initialState}),
  setAccessToken: token => set({accessToken: token}),
  setIsLoggedIn: loggedIn => set({isLoggedIn: loggedIn}),
  setMemberProfile: profile => set({memberProfile: profile}),
  setMyReviews: reviews => set({myReviews: reviews}),
  setShouldRefreshReviews: shouldRefresh =>
    set({shouldRefreshReviews: shouldRefresh}),
}));
