import React from 'react';
import {View, Text, Button} from 'react-native';

export default function RecommendScreen({navigation}: any) {
  return (
    <View>
      <Text>Recommend Screen</Text>
      <Button title="지도" onPress={() => navigation.navigate('Map')} />
      <Button title="프로필" onPress={() => navigation.navigate('Profile')} />
    </View>
  );
}
