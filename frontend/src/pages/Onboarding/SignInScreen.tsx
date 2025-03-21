import React from 'react';
import {View, Text, Button} from 'react-native';

export default function SignInScreen({navigation}: any) {
  return (
    <View>
      <Text>Sign In Screen</Text>
      <Button title="회원가입" onPress={() => navigation.navigate('SignUp')} />
    </View>
  );
}
