import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import ProfileScreen from '../screens/Profile/ProfileScreen';
import ProfileEditScreen from '../screens/Profile/ProfileEditScreen';
import DeleteAccountScreen from '../screens/Profile/DeleteAccountScreen';
import MyReviewListScreen from '../screens/Profile/MyReviewListScreen';
import PrivacyPolicyScreen from '../screens/Profile/PrivacyPolicyScreen';

export type ProfileStackParamList = {
  ProfileMain: undefined;
  ProfileEdit: undefined;
  MyReviewList: undefined;
  PrivacyPolicy: undefined;
  DeleteAccount: undefined;
};

const ProfileStackNavigator = () => {
  const Stack = createNativeStackNavigator();

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
        options={{title: '프로필 수정'}}
      />
      <Stack.Screen
        name="MyReviewList"
        component={MyReviewListScreen}
        options={{title: '내 리뷰'}}
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
    </Stack.Navigator>
  );
};

export default ProfileStackNavigator;
