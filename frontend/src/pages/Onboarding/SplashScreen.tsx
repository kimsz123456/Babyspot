import React from 'react';
import {View, Text, Button} from 'react-native';
import {FontStyles} from '../../styles/fonts';

const SplashScreen = ({navigation}: any) => {
  return (
    <View>
      <Text style={FontStyles.displayMedium}>환영합니다!</Text>
      <Button title="로그인" onPress={() => navigation.navigate('SignIn')} />
    </View>
  );
};

export default SplashScreen;
