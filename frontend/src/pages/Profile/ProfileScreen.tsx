import React from 'react';
import {View, Text, Button} from 'react-native';

export default function ProfileScreen({navigation}: any) {
  return (
    <View>
      <Text>Profile Screen</Text>
      <Button
        title="프로필 수정"
        onPress={() => navigation.navigate('EditProfile')}
      />
      <Button
        title="내 리뷰 리스트"
        onPress={() => navigation.navigate('MyReview')}
      />
      <Button
        title="계정 삭제"
        onPress={() => navigation.navigate('DeleteAccount')}
      />
      <Button title="지도" onPress={() => navigation.navigate('Map')} />
      <Button title="추천" onPress={() => navigation.navigate('Recommend')} />
    </View>
  );
}
