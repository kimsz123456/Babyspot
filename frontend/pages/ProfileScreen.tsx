import React from 'react';
import {View, Text, Button} from 'react-native';

export default function ProfileScreen({navigation}: any) {
  return (
    <View>
      <Text>Profile Screen</Text>
      <Button title="메인" onPress={() => navigation.navigate('Main')} />
      <Button title="추천" onPress={() => navigation.navigate('Recommend')} />
    </View>
  );
}
