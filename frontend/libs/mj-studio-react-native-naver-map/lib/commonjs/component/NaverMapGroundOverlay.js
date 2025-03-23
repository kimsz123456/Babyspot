"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.NaverMapGroundOverlay = void 0;
var _RNCNaverMapGroundNativeComponent = _interopRequireDefault(require("../spec/RNCNaverMapGroundNativeComponent"));
var _Const = require("../internal/util/Const");
var _Util = require("../internal/Util");
var _react = _interopRequireDefault(require("react"));
var _jsxRuntime = require("react/jsx-runtime");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
const NaverMapGroundOverlay = ({
  zIndex = 0,
  globalZIndex = _Const.Const.NULL_NUMBER,
  isHidden = false,
  minZoom = _Const.Const.MIN_ZOOM,
  maxZoom = _Const.Const.MAX_ZOOM,
  isMinZoomInclusive = true,
  isMaxZoomInclusive = true,
  image,
  region,
  onTap
}) => {
  return /*#__PURE__*/(0, _jsxRuntime.jsx)(_RNCNaverMapGroundNativeComponent.default, {
    zIndexValue: zIndex,
    globalZIndexValue: globalZIndex,
    isHidden: isHidden,
    minZoom: minZoom,
    maxZoom: maxZoom,
    isMinZoomInclusive: isMinZoomInclusive,
    isMaxZoomInclusive: isMaxZoomInclusive,
    region: region,
    image: (0, _Util.convertJsImagePropToNativeProp)(image),
    onTapOverlay: onTap
  });
};
exports.NaverMapGroundOverlay = NaverMapGroundOverlay;
//# sourceMappingURL=NaverMapGroundOverlay.js.map