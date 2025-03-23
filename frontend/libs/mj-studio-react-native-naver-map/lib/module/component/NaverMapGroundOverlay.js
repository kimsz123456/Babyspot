import { default as NativeNaverMapGround } from '../spec/RNCNaverMapGroundNativeComponent';
import { Const } from '../internal/util/Const';
import { convertJsImagePropToNativeProp } from '../internal/Util';
import React from 'react';
import { jsx as _jsx } from "react/jsx-runtime";
export const NaverMapGroundOverlay = ({
  zIndex = 0,
  globalZIndex = Const.NULL_NUMBER,
  isHidden = false,
  minZoom = Const.MIN_ZOOM,
  maxZoom = Const.MAX_ZOOM,
  isMinZoomInclusive = true,
  isMaxZoomInclusive = true,
  image,
  region,
  onTap
}) => {
  return /*#__PURE__*/_jsx(NativeNaverMapGround, {
    zIndexValue: zIndex,
    globalZIndexValue: globalZIndex,
    isHidden: isHidden,
    minZoom: minZoom,
    maxZoom: maxZoom,
    isMinZoomInclusive: isMinZoomInclusive,
    isMaxZoomInclusive: isMaxZoomInclusive,
    region: region,
    image: convertJsImagePropToNativeProp(image),
    onTapOverlay: onTap
  });
};
//# sourceMappingURL=NaverMapGroundOverlay.js.map