import React, {useRef, useState} from 'react';
import {TextInput} from 'react-native';
import {PrimaryColors, GrayColors} from '../../../constants/colors';
import scale from '../../../utils/scale';
import * as S from './styles';

interface MultilineTextInputProps {
  initialText?: string;
  textEdited: (text: string) => void;
  placeholder: string;
}

const MIN_HEIGHT = 180;
const MAX_LENGTH = 500;

const MultilineTextInput = (props: MultilineTextInputProps) => {
  const [text, setText] = useState(props.initialText ?? '');
  const [inputHeight, setInputHeight] = useState(scale(MIN_HEIGHT));
  const lastHeightRef = useRef(scale(MIN_HEIGHT));

  return (
    <S.MultilineTextInputContainer>
      <TextInput
        value={text}
        placeholder={props.placeholder}
        selectionColor={PrimaryColors[500]}
        multiline
        maxLength={MAX_LENGTH}
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
          setText(text);
        }}
        onContentSizeChange={e => {
          const newHeight = e.nativeEvent.contentSize.height;
          if (Math.abs(newHeight - lastHeightRef.current) > 1) {
            lastHeightRef.current = newHeight;
            setInputHeight(Math.max(scale(MIN_HEIGHT), newHeight));
          }
        }}
        onBlur={e => {
          props.textEdited(text);
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
