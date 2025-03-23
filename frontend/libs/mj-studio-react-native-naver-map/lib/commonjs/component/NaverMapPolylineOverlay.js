"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.NaverMapPolylineOverlay = void 0;
var _RNCNaverMapPolylineNativeComponent = _interopRequireDefault(require("../spec/RNCNaverMapPolylineNativeComponent"));
var _reactNative = require("react-native");
var _Const = require("../internal/util/Const");
var _Assert = require("../internal/util/Assert");
var _react = _interopRequireDefault(require("react"));
var _jsxRuntime = require("react/jsx-runtime");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
const NaverMapPolylineOverlay = ({
  zIndex = 0,
  globalZIndex = _Const.Const.NULL_NUMBER,
  isHidden = false,
  minZoom = _Const.Const.MIN_ZOOM,
  maxZoom = _Const.Const.MAX_ZOOM,
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
    (0, _Assert.nAssert)(coords.length >= 2, `[NaverMapPolylineOverlay] coords length should be equal or greater than 2, is ${coords.length}.`);
  }
  return /*#__PURE__*/(0, _jsxRuntime.jsx)(_RNCNaverMapPolylineNativeComponent.default, {
    zIndexValue: zIndex,
    globalZIndexValue: globalZIndex,
    isHidden: isHidden,
    minZoom: minZoom,
    maxZoom: maxZoom,
    coords: coords,
    width: width,
    isMinZoomInclusive: isMinZoomInclusive,
    isMaxZoomInclusive: isMaxZoomInclusive,
    color: (0, _reactNative.processColor)(color),
    capType: capType,
    joinType: joinType,
    onTapOverlay: onTap
  });
};
exports.NaverMapPolylineOverlay = NaverMapPolylineOverlay;
//# sourceMappingURL=NaverMapPolylineOverlay.js.map