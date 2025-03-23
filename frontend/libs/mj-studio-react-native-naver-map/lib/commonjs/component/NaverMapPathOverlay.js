"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.NaverMapPathOverlay = void 0;
var _RNCNaverMapPathNativeComponent = _interopRequireDefault(require("../spec/RNCNaverMapPathNativeComponent"));
var _reactNative = require("react-native");
var _Const = require("../internal/util/Const");
var _Assert = require("../internal/util/Assert");
var _Util = require("../internal/Util");
var _react = _interopRequireDefault(require("react"));
var _jsxRuntime = require("react/jsx-runtime");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
const NaverMapPathOverlay = ({
  zIndex = 0,
  globalZIndex = _Const.Const.NULL_NUMBER,
  isHidden = false,
  minZoom = _Const.Const.MIN_ZOOM,
  maxZoom = _Const.Const.MAX_ZOOM,
  isMinZoomInclusive = true,
  isMaxZoomInclusive = true,
  coords = [],
  width = 1,
  color = 'black',
  isHideCollidedCaptions = false,
  isHideCollidedMarkers = false,
  isHideCollidedSymbols = false,
  outlineColor = 'black',
  outlineWidth = 0,
  passedColor = 'black',
  passedOutlineColor = 'black',
  patternImage,
  patternInterval = 0,
  progress = 0,
  onTap
}) => {
  if (coords) {
    (0, _Assert.nAssert)(coords.length >= 2, `[NaverMapPolylineOverlay] coords length should be equal or greater than 2, is ${coords.length}.`);
    if (coords.length < 2) return null;
  }
  (0, _Assert.nAssert)(progress >= -1 && progress <= 1, '[NaverMapPolylineOverlay] progress should be -1 ~ 1');
  return /*#__PURE__*/(0, _jsxRuntime.jsx)(_RNCNaverMapPathNativeComponent.default, {
    zIndexValue: zIndex,
    globalZIndexValue: globalZIndex,
    isHidden: isHidden,
    minZoom: minZoom,
    maxZoom: maxZoom,
    coords: coords,
    width: width,
    isMinZoomInclusive: isMinZoomInclusive,
    isMaxZoomInclusive: isMaxZoomInclusive,
    isHideCollidedCaptions: isHideCollidedCaptions,
    isHideCollidedMarkers: isHideCollidedMarkers,
    isHideCollidedSymbols: isHideCollidedSymbols,
    color: (0, _reactNative.processColor)(color),
    passedColor: (0, _reactNative.processColor)(passedColor),
    passedOutlineColor: (0, _reactNative.processColor)(passedOutlineColor),
    outlineColor: (0, _reactNative.processColor)(outlineColor),
    patternImage: patternImage ? (0, _Util.convertJsImagePropToNativeProp)(patternImage) : undefined,
    patternInterval: patternInterval,
    outlineWidth: outlineWidth,
    progress: progress,
    onTapOverlay: onTap
  });
};
exports.NaverMapPathOverlay = NaverMapPathOverlay;
//# sourceMappingURL=NaverMapPathOverlay.js.map