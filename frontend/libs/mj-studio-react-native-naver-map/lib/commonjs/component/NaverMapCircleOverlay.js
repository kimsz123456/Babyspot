"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.NaverMapCircleOverlay = void 0;
var _RNCNaverMapCircleNativeComponent = _interopRequireDefault(require("../spec/RNCNaverMapCircleNativeComponent"));
var _reactNative = require("react-native");
var _Const = require("../internal/util/Const");
var _react = _interopRequireDefault(require("react"));
var _jsxRuntime = require("react/jsx-runtime");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
const NaverMapCircleOverlay = ({
  latitude,
  longitude,
  zIndex = 0,
  globalZIndex = _Const.Const.NULL_NUMBER,
  isHidden = false,
  minZoom = _Const.Const.MIN_ZOOM,
  maxZoom = _Const.Const.MAX_ZOOM,
  isMinZoomInclusive = true,
  isMaxZoomInclusive = true,
  radius = 0,
  color = 'black',
  outlineWidth = 0,
  outlineColor = 'black',
  onTap
}) => {
  return /*#__PURE__*/(0, _jsxRuntime.jsx)(_RNCNaverMapCircleNativeComponent.default, {
    coord: {
      latitude,
      longitude
    },
    zIndexValue: zIndex,
    globalZIndexValue: globalZIndex,
    isHidden: isHidden,
    minZoom: minZoom,
    maxZoom: maxZoom,
    isMinZoomInclusive: isMinZoomInclusive,
    isMaxZoomInclusive: isMaxZoomInclusive,
    radius: radius,
    color: (0, _reactNative.processColor)(color),
    outlineWidth: outlineWidth,
    outlineColor: (0, _reactNative.processColor)(outlineColor),
    onTapOverlay: onTap
  });
};
exports.NaverMapCircleOverlay = NaverMapCircleOverlay;
//# sourceMappingURL=NaverMapCircleOverlay.js.map