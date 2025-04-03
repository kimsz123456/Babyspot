import React from 'react';
import {View, TouchableOpacity, Image, Text} from 'react-native';
import {GrayColors} from '../../constants/colors';
import {IC_LEFT_ARROW} from '../../constants/icons';
import scale from '../../utils/scale';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {NativeStackHeaderProps} from '@react-navigation/native-stack';
interface CustomHeaderProps {
  props: NativeStackHeaderProps;
  title: string;
}
const CustomHeader = (props: CustomHeaderProps) => {
  const insets = useSafeAreaInsets();

  return (
    <View
      style={{
        height: insets.top + 56,
        width: '100%',
        backgroundColor: 'white',
        flexDirection: 'row',
        borderBottomWidth: 1,
        borderBottomColor: GrayColors[200],
        alignItems: 'flex-end',
        paddingHorizontal: 24,
        paddingVertical: 16,
      }}>
      <View style={{alignItems: 'center', flexDirection: 'row'}}>
        <TouchableOpacity
          onPress={() => {
            props.props.navigation.goBack();
          }}>
          <Image source={IC_LEFT_ARROW} style={{width: 24, height: 24}} />
        </TouchableOpacity>
        <Text
          style={{
            fontFamily: 'Pretendard-SemiBold',
            fontSize: scale(18),
            marginLeft: scale(8),
            lineHeight: scale(24),
          }}>
          {props.title}
        </Text>
      </View>
    </View>
  );
};

export default CustomHeader;
