import React from 'react';
import {View, Text, Button} from 'react-native';

export default function SplashScreen({navigation}: any) {
  return (
    <View>
      <Text>Splash Screen</Text>
      <Button title="로그인" onPress={() => navigation.navigate('SignIn')} />
    </View>
  );
}
