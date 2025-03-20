import React from 'react';
import {View, Text, Button} from 'react-native';

export default function SignUpScreen({navigation}: any) {
  return (
    <View>
      <Text>Sign Up Screen</Text>
      <Button title="지도" onPress={() => navigation.navigate('Map')} />
    </View>
  );
}
