import {css} from 'styled-components/native';
import scale from '../utils/scale';

export const FontStyles = {
  displayXlarge: css`
    font-family: 'Pretendard-SemiBold';
    font-size: ${scale(72)}px;
    line-height: ${scale(74)}px;
  `,
  displayLarge: css`
    font-family: 'Pretendard-SemiBold';
    font-size: ${scale(64)}px;
    line-height: ${scale(70)}px;
  `,
  displayMedium: css`
    font-family: 'Pretendard-SemiBold';
    font-size: ${scale(48)}px;
    line-height: ${scale(54)}px;
  `,
  displaySmall: css`
    font-family: 'Pretendard-SemiBold';
    font-size: ${scale(40)}px;
    line-height: ${scale(44)}px;
  `,
  headingXlarge: css`
    font-family: 'Pretendard-SemiBold';
    font-size: ${scale(32)}px;
    line-height: ${scale(36)}px;
  `,
  headingLarge: css`
    font-family: 'Pretendard-SemiBold';
    font-size: ${scale(26)}px;
    line-height: ${scale(30)}px;
  `,
  headingMedium: css`
    font-family: 'Pretendard-SemiBold';
    font-size: ${scale(22)}px;
    line-height: ${scale(26)}px;
  `,
  headingSmall: css`
    font-family: 'Pretendard-SemiBold';
    font-size: ${scale(18)}px;
    line-height: ${scale(24)}px;
  `,
  bodyMedium: css`
    font-family: 'Pretendard-Regular';
    font-size: ${scale(16)}px;
    line-height: ${scale(24)}px;
  `,
  bodySmall: css`
    font-family: 'Pretendard-Regular';
    font-size: ${scale(14)}px;
    line-height: ${scale(20)}px;
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
