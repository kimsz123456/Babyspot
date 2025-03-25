import {StyleSheet} from 'react-native';
import SCALE from './scale';

export const FontStyles = StyleSheet.create({
  displayXlarge: {
    fontFamily: 'Pretendard-SemiBold',
    fontSize: SCALE(72),
    lineHeight: SCALE(74),
    includeFontPadding: false,
  },
  displayLarge: {
    fontFamily: 'Pretendard-SemiBold',
    fontSize: SCALE(64),
    lineHeight: SCALE(70),
    includeFontPadding: false,
  },
  displayMedium: {
    fontFamily: 'Pretendard-SemiBold',
    fontSize: SCALE(48),
    lineHeight: SCALE(54),
    includeFontPadding: false,
  },
  displaySmall: {
    fontFamily: 'Pretendard-SemiBold',
    fontSize: SCALE(40),
    lineHeight: SCALE(44),
    includeFontPadding: false,
  },
  HeadingXlarge: {
    fontFamily: 'Pretendard-SemiBold',
    fontSize: SCALE(32),
    lineHeight: SCALE(36),
    includeFontPadding: false,
  },
  HeadingLarge: {
    fontFamily: 'Pretendard-SemiBold',
    fontSize: SCALE(26),
    lineHeight: SCALE(30),
    includeFontPadding: false,
  },
  HeadingMedium: {
    fontFamily: 'Pretendard-SemiBold',
    fontSize: SCALE(22),
    lineHeight: SCALE(26),
    includeFontPadding: false,
  },
  HeadingSmall: {
    fontFamily: 'Pretendard-SemiBold',
    fontSize: SCALE(18),
    lineHeight: SCALE(24),
    includeFontPadding: false,
  },
  BodyMedium: {
    fontFamily: 'Pretendard-Regular',
    fontSize: SCALE(16),
    lineHeight: SCALE(24),
    includeFontPadding: false,
  },
  BodySmall: {
    fontFamily: 'Pretendard-Regular',
    fontSize: SCALE(14),
    lineHeight: SCALE(20),
    includeFontPadding: false,
  },
  CaptionMedium: {
    fontFamily: 'Pretendard-Regular',
    fontSize: SCALE(12),
    lineHeight: SCALE(16),
    includeFontPadding: false,
  },
  CaptionSmall: {
    fontFamily: 'Pretendard-Regular',
    fontSize: SCALE(10),
    lineHeight: SCALE(12),
    includeFontPadding: false,
  },
});
