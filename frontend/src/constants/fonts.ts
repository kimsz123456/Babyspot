import {css} from 'styled-components/native';
import scale, {scaleLetterSpacing} from '../utils/scale';

export const FontStyles = {
  displayXlarge: css`
    font-family: 'Pretendard-SemiBold';
    font-size: ${scale(72)}px;
    line-height: ${scale(74)}px;
    letter-spacing: ${scaleLetterSpacing(72, -2)}px;
  `,
  displayLarge: css`
    font-family: 'Pretendard-SemiBold';
    font-size: ${scale(64)}px;
    line-height: ${scale(70)}px;
    letter-spacing: ${scaleLetterSpacing(64, -2)}px;
  `,
  displayMedium: css`
    font-family: 'Pretendard-SemiBold';
    font-size: ${scale(48)}px;
    line-height: ${scale(54)}px;
    letter-spacing: ${scaleLetterSpacing(48, -2)}px;
  `,
  displaySmall: css`
    font-family: 'Pretendard-SemiBold';
    font-size: ${scale(40)}px;
    line-height: ${scale(44)}px;
    letter-spacing: ${scaleLetterSpacing(40, -2)}px;
  `,
  headingXlarge: css`
    font-family: 'Pretendard-SemiBold';
    font-size: ${scale(32)}px;
    line-height: ${scale(36)}px;
    letter-spacing: ${scaleLetterSpacing(32, -2)}px;
  `,
  headingLarge: css`
    font-family: 'Pretendard-SemiBold';
    font-size: ${scale(26)}px;
    line-height: ${scale(30)}px;
    letter-spacing: ${scaleLetterSpacing(26, -2)}px;
  `,
  headingMedium: css`
    font-family: 'Pretendard-SemiBold';
    font-size: ${scale(22)}px;
    line-height: ${scale(26)}px;
    letter-spacing: ${scaleLetterSpacing(22, -2)}px;
  `,
  headingSmall: css`
    font-family: 'Pretendard-SemiBold';
    font-size: ${scale(18)}px;
    line-height: ${scale(24)}px;
    letter-spacing: ${scaleLetterSpacing(18, -2)}px;
  `,
  bodyMedium: css`
    font-family: 'Pretendard-Regular';
    font-size: ${scale(16)}px;
    line-height: ${scale(24)}px;
    letter-spacing: ${scaleLetterSpacing(16, -2)}px;
  `,
  bodySmall: css`
    font-family: 'Pretendard-Regular';
    font-size: ${scale(14)}px;
    line-height: ${scale(20)}px;
    letter-spacing: ${scaleLetterSpacing(14, -2)}px;
  `,
  captionMedium: css`
    font-family: 'Pretendard-Regular';
    font-size: ${scale(12)}px;
    line-height: ${scale(16)}px;
  `,
  captionSmall: css`
    font-family: 'Pretendard-Regular';
    font-size: ${scale(10)}px;
    line-height: ${scale(12)}px;
  `,
};
