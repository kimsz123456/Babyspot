import React from 'react';
import {View, Text, Button} from 'react-native';

export default function ReviewDetailScreen({navigation}: any) {
  return (
    <View>
      <Text>Review Detail Screen</Text>
      <Button title="추천" onPress={() => navigation.navigate('Recommend')} />
      <Button title="프로필" onPress={() => navigation.navigate('Profile')} />
    </View>
  );
}
