import React from 'react';
import {View, Text, Button} from 'react-native';

export default function DeleteAccountScreen({navigation}: any) {
  return (
    <View>
      <Text>Delete Account Screen</Text>
      <Button title="지도" onPress={() => navigation.navigate('Map')} />
      <Button title="추천" onPress={() => navigation.navigate('Recommend')} />
    </View>
  );
}
