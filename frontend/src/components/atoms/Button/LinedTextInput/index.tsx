import React, {useState} from 'react';
import {TextInput} from 'react-native';
import {PrimaryColors, GrayColors} from '../../../../constants/colors';
import scale from '../../../../utils/scale';

interface LinedTextInputProps {
  textEditted: (text: string) => void;
  placeholder: string;
}
const LinedTextInput = (props: LinedTextInputProps) => {
  const [isFocused, setIsFocused] = useState(false);
  const [text, setText] = useState('');

  return (
    <TextInput
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
        setText(text);
      }}
      onBlur={e => {
        props.textEditted(text);
        setIsFocused(false);
      }}
      onFocus={e => {
        setIsFocused(true);
      }}
    />
  );
};

export default LinedTextInput;
