import React, {useRef, useState} from 'react';
import {TextInput, ToastAndroid} from 'react-native';
import {PrimaryColors, GrayColors} from '../../../constants/colors';
import scale from '../../../utils/scale';
import * as S from './styles';

interface MultilineTextInputProps {
  text: string;
  setText: (text: string) => void;
  placeholder: string;
}

const MIN_HEIGHT = 180;
const MAX_LENGTH = 500;

const MultilineTextInput = ({
  text,
  setText,
  placeholder,
}: MultilineTextInputProps) => {
  const [inputHeight, setInputHeight] = useState(scale(MIN_HEIGHT));
  const lastHeightRef = useRef(scale(MIN_HEIGHT));

  return (
    <S.MultilineTextInputContainer>
      <TextInput
        value={text}
        placeholder={placeholder}
        selectionColor={PrimaryColors[500]}
        multiline
        scrollEnabled={false}
        placeholderTextColor={GrayColors[300]}
        textAlignVertical="top"
        style={{
          width: '100%',
          height: inputHeight,
          padding: 0,
          margin: 0,
          fontSize: scale(16),
          fontFamily: 'Pretendard-Regular',
          fontWeight: 400,
          includeFontPadding: false,
          textDecorationColor: GrayColors[800],
        }}
        onChangeText={text => {
          if (MAX_LENGTH && text.length > MAX_LENGTH) {
            text = text.slice(0, MAX_LENGTH);

            ToastAndroid.show(`최대 ${MAX_LENGTH}자까지 입력 가능합니다.`, 500);
          }
          setText(text);
        }}
        onContentSizeChange={e => {
          const newHeight = e.nativeEvent.contentSize.height;
          if (Math.abs(newHeight - lastHeightRef.current) > 1) {
            lastHeightRef.current = newHeight;
            setInputHeight(Math.max(scale(MIN_HEIGHT), newHeight));
          }
        }}
      />
      <S.CountText
        $isGray={
          text.length == 0
        }>{`${text.length} / ${MAX_LENGTH}`}</S.CountText>
    </S.MultilineTextInputContainer>
  );
};

export default MultilineTextInput;
