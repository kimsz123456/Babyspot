import React, {useState} from 'react';
import {TextInput, ToastAndroid} from 'react-native';
import {PrimaryColors, GrayColors} from '../../../../constants/colors';
import scale from '../../../../utils/scale';

interface LinedTextInputProps {
  text: string;
  setText: (text: string) => void;
  placeholder: string;
  maxLength?: number;
}
const LinedTextInput = (props: LinedTextInputProps) => {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <TextInput
      value={props.text}
      placeholder={props.placeholder}
      selectionColor={PrimaryColors[500]}
      placeholderTextColor={GrayColors[300]}
      style={{
        borderBottomWidth: 1,
        borderBottomColor: isFocused ? PrimaryColors[500] : GrayColors[200],
        paddingVertical: scale(12),
        paddingHorizontal: 0,
        margin: 0,
        fontSize: scale(16),
        fontFamily: 'Pretendard-Regular',
        fontWeight: 400,
        includeFontPadding: false,
        textDecorationColor: GrayColors[800],
      }}
      onChangeText={text => {
        if (props.maxLength && text.length > props.maxLength) {
          text = text.slice(0, props.maxLength);

          ToastAndroid.show(
            `최대 ${props.maxLength}자까지 입력 가능합니다.`,
            500,
          );
        }
        props.setText(text);
      }}
      onBlur={e => {
        setIsFocused(false);
      }}
      onFocus={e => {
        setIsFocused(true);
      }}
    />
  );
};

export default LinedTextInput;
