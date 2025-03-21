import React from 'react';
import {View, Text, Button} from 'react-native';

export default function MapScreen({navigation}: any) {
  return (
    <View>
      <Text>Map Screen</Text>
      <Button title="검색" onPress={() => navigation.navigate('Search')} />
      <Button
        title="가게상세"
        onPress={() => navigation.navigate('StoreDetail')}
      />
      <Button
        title="가게 추천 정보 입력"
        onPress={() => navigation.navigate('EnterRecommendationInformation')}
      />
      <Button title="추천" onPress={() => navigation.navigate('Recommend')} />
      <Button title="프로필" onPress={() => navigation.navigate('Profile')} />
    </View>
  );
}
