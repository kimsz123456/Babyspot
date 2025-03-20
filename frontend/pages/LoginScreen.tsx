import React from 'react';
import {View, Text, Button} from 'react-native';

export default function LoginScreen({navigation}: any) {
  return (
    <View>
      <Text>Login Screen</Text>
      <Button title="메인" onPress={() => navigation.navigate('Main')} />
    </View>
  );
}
