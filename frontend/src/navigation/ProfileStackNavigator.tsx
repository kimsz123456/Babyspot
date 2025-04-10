import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import ProfileScreen from '../screens/Profile/ProfileScreen';
import ProfileEditScreen from '../screens/Profile/ProfileEditScreen';
import DeleteAccountScreen from '../screens/Profile/DeleteAccountScreen';
import MyReviewListScreen from '../screens/Profile/MyReviewListScreen';
import PrivacyPolicyScreen from '../screens/Profile/PrivacyPolicyScreen';
import WriteReviewScreen from '../screens/Map/WriteReviewScreen';
import CompleteScreen, {
  CompleteTypes,
} from '../screens/Map/WriteReviewScreen/CompleteScreen';
import {ReviewType} from '../services/reviewService';
import CustomHeader from './CustomHeader';

export type ProfileStackParamList = {
  ProfileMain: undefined;
  ProfileEdit: undefined;
  MyReviewList: undefined;
  PrivacyPolicy: undefined;
  DeleteAccount: undefined;
  WriteReviewScreen: {review: ReviewType};
  CompleteScreen: {completeType: CompleteTypes};
};

const ProfileStackNavigator = () => {
  const Stack = createNativeStackNavigator<ProfileStackParamList>();

  return (
    <Stack.Navigator>
      <Stack.Screen
        name="ProfileMain"
        component={ProfileScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="ProfileEdit"
        component={ProfileEditScreen}
        options={() => ({
          header(props) {
            return <CustomHeader props={props} title={'프로필 수정'} />;
          },
        })}
      />
      <Stack.Screen
        name="MyReviewList"
        component={MyReviewListScreen}
        options={() => ({
          header(props) {
            return <CustomHeader props={props} title={'내 리뷰'} />;
          },
        })}
      />
      <Stack.Screen
        name="PrivacyPolicy"
        component={PrivacyPolicyScreen}
        options={{title: '개인정보 이용약관'}}
      />
      <Stack.Screen
        name="DeleteAccount"
        component={DeleteAccountScreen}
        options={{title: '회원탈퇴'}}
      />
      <Stack.Screen
        name="WriteReviewScreen"
        component={WriteReviewScreen}
        options={({route}) => ({
          header(props) {
            return (
              <CustomHeader
                props={props}
                title={route.params.review.storeName}
              />
            );
          },
        })}
      />
      <Stack.Screen
        name="CompleteScreen"
        component={CompleteScreen}
        options={() => ({
          headerShown: false,
        })}
      />
    </Stack.Navigator>
  );
};

export default ProfileStackNavigator;
