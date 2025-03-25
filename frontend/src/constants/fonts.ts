import {css} from 'styled-components/native';
import scale from '../utils/scale';

export const FontStyles = {
  displayXlarge: css`
    font-family: 'Pretendard-SemiBold';
    font-size: ${scale(72)};
    line-height: ${scale(74)};
  `,
  displayLarge: css`
    font-family: 'Pretendard-SemiBold';
    font-size: ${scale(64)};
    line-height: ${scale(70)};
  `,
  displayMedium: css`
    font-family: 'Pretendard-SemiBold';
    font-size: ${scale(48)};
    line-height: ${scale(54)};
  `,
  displaySmall: css`
    font-family: 'Pretendard-SemiBold';
    font-size: ${scale(40)};
    line-height: ${scale(44)};
  `,
  headingXlarge: css`
    font-family: 'Pretendard-SemiBold';
    font-size: ${scale(32)};
    line-height: ${scale(36)};
  `,
  headingLarge: css`
    font-family: 'Pretendard-SemiBold';
    font-size: ${scale(26)};
    line-height: ${scale(30)};
  `,
  headingMedium: css`
    font-family: 'Pretendard-SemiBold';
    font-size: ${scale(22)};
    line-height: ${scale(26)};
  `,
  headingSmall: css`
    font-family: 'Pretendard-SemiBold';
    font-size: ${scale(18)};
    line-height: ${scale(24)};
  `,
  bodyMedium: css`
    font-family: 'Pretendard-Regular';
    font-size: ${scale(16)};
    line-height: ${scale(24)};
  `,
  bodySmall: css`
    font-family: 'Pretendard-Regular';
    font-size: ${scale(14)};
    line-height: ${scale(20)};
  `,
  captionMedium: css`
    font-family: 'Pretendard-Regular';
    font-size: ${scale(12)};
    line-height: ${scale(16)};
  `,
  captionSmall: css`
    font-family: 'Pretendard-Regular';
    font-size: ${scale(10)};
    line-height: ${scale(12)};
  `,
};
