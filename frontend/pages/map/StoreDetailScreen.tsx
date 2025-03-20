import React from 'react';
import {View, Text, Button} from 'react-native';

export default function StoreDetailScreen({navigation}: any) {
  return (
    <View>
      <Text>Store Detail Screen</Text>
      <Button
        title="키워드 리뷰"
        onPress={() => navigation.navigate('KeywordReview')}
      />
      <Button
        title="리뷰 작성"
        onPress={() => navigation.navigate('WriteReview')}
      />
      <Button
        title="리뷰 수정"
        onPress={() => navigation.navigate('ReviewDetail')}
      />
      <Button title="추천" onPress={() => navigation.navigate('Recommend')} />
      <Button title="프로필" onPress={() => navigation.navigate('Profile')} />
    </View>
  );
}
