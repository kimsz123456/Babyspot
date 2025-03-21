import React from 'react';
import {View, Text, Button} from 'react-native';

export default function KeywordReviewScreen({navigation}: any) {
  return (
    <View>
      <Text>Keyword Review Screen</Text>
      <Button title="추천" onPress={() => navigation.navigate('Recommend')} />
      <Button title="프로필" onPress={() => navigation.navigate('Profile')} />
    </View>
  );
}
