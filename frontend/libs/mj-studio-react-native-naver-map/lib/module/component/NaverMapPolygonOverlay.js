import { default as NativeNaverMapPolygon } from '../spec/RNCNaverMapPolygonNativeComponent';
import { processColor } from 'react-native';
import { Const } from '../internal/util/Const';
import { nAssert } from '../internal/util/Assert';
import React from 'react';
import { jsx as _jsx } from "react/jsx-runtime";
export const NaverMapPolygonOverlay = ({
  zIndex = 0,
  globalZIndex = Const.NULL_NUMBER,
  isHidden = false,
  minZoom = Const.MIN_ZOOM,
  maxZoom = Const.MAX_ZOOM,
  isMinZoomInclusive = true,
  isMaxZoomInclusive = true,
  coords = [],
  holes = [],
  color = 'black',
  outlineWidth = 0,
  outlineColor = 'black',
  onTap
}) => {
  if (coords) {
    nAssert(coords.length >= 3, `[NaverMapPolygonOverlay] coords length should be equal or greater than 3, is ${coords.length}.`);
  }
  if (holes) {
    for (const hole of holes) {
      nAssert(hole.length >= 3, `[NaverMapPolygonOverlay] hole length should be equal or greater than 3, is ${hole.length}.`);
    }
  }
  return /*#__PURE__*/_jsx(NativeNaverMapPolygon, {
    zIndexValue: zIndex,
    globalZIndexValue: globalZIndex,
    isHidden: isHidden,
    minZoom: minZoom,
    maxZoom: maxZoom,
    geometries: {
      coords,
      holes
    },
    isMinZoomInclusive: isMinZoomInclusive,
    isMaxZoomInclusive: isMaxZoomInclusive,
    color: processColor(color),
    outlineWidth: outlineWidth,
    outlineColor: processColor(outlineColor),
    onTapOverlay: onTap
  });
};
//# sourceMappingURL=NaverMapPolygonOverlay.js.map