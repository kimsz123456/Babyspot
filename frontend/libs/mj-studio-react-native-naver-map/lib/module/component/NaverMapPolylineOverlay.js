import { default as NativeNaverMapPolyline } from '../spec/RNCNaverMapPolylineNativeComponent';
import { processColor } from 'react-native';
import { Const } from '../internal/util/Const';
import { nAssert } from '../internal/util/Assert';
import React from 'react';
import { jsx as _jsx } from "react/jsx-runtime";
export const NaverMapPolylineOverlay = ({
  zIndex = 0,
  globalZIndex = Const.NULL_NUMBER,
  isHidden = false,
  minZoom = Const.MIN_ZOOM,
  maxZoom = Const.MAX_ZOOM,
  isMinZoomInclusive = true,
  isMaxZoomInclusive = true,
  coords = [],
  width = 1,
  capType = 'Round',
  joinType = 'Round',
  color = 'black',
  onTap
}) => {
  if (coords) {
    nAssert(coords.length >= 2, `[NaverMapPolylineOverlay] coords length should be equal or greater than 2, is ${coords.length}.`);
  }
  return /*#__PURE__*/_jsx(NativeNaverMapPolyline, {
    zIndexValue: zIndex,
    globalZIndexValue: globalZIndex,
    isHidden: isHidden,
    minZoom: minZoom,
    maxZoom: maxZoom,
    coords: coords,
    width: width,
    isMinZoomInclusive: isMinZoomInclusive,
    isMaxZoomInclusive: isMaxZoomInclusive,
    color: processColor(color),
    capType: capType,
    joinType: joinType,
    onTapOverlay: onTap
  });
};
//# sourceMappingURL=NaverMapPolylineOverlay.js.map