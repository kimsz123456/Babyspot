"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.NaverMapMarkerOverlay = void 0;
var _RNCNaverMapMarkerNativeComponent = _interopRequireDefault(require("../spec/RNCNaverMapMarkerNativeComponent"));
var _react = _interopRequireWildcard(require("react"));
var _reactNative = require("react-native");
var _Const = require("../internal/util/Const");
var _Util = require("../internal/Util");
var _Assert = require("../internal/util/Assert");
var _objectHash = _interopRequireDefault(require("object-hash"));
var _jsxRuntime = require("react/jsx-runtime");
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function (e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
const defaultCaptionProps = {
  text: '',
  textSize: 12,
  minZoom: _Const.Const.MIN_ZOOM,
  maxZoom: _Const.Const.MAX_ZOOM,
  color: 'black',
  haloColor: 'transparent',
  requestedWidth: 0
};
const defaultSubCaptionProps = {
  text: '',
  textSize: 10,
  minZoom: _Const.Const.MIN_ZOOM,
  maxZoom: _Const.Const.MAX_ZOOM,
  color: 'black',
  haloColor: 'transparent',
  requestedWidth: 0
};
const NaverMapMarkerOverlay = ({
  latitude,
  longitude,
  zIndex = 0,
  globalZIndex = _Const.Const.NULL_NUMBER,
  isHidden = false,
  minZoom = _Const.Const.MIN_ZOOM,
  maxZoom = _Const.Const.MAX_ZOOM,
  isMinZoomInclusive = true,
  isMaxZoomInclusive = true,
  width = _Const.Const.NULL_NUMBER,
  height = _Const.Const.NULL_NUMBER,
  alpha = 1,
  anchor = {
    x: 0.5,
    y: 1
  },
  angle = 0,
  isFlatEnabled = false,
  isForceShowIcon = false,
  isHideCollidedCaptions = false,
  isHideCollidedMarkers = false,
  isHideCollidedSymbols = false,
  isIconPerspectiveEnabled = false,
  tintColor,
  image = {
    symbol: 'green'
  },
  onTap,
  caption,
  subCaption,
  children
}) => {
  (0, _Assert.nAssert)(_react.Children.count(children) <= 1, `[NaverMapMarkerOverlay] children count should be equal or less than 1, is ${_react.Children.count(children)}`);
  const _caption = (() => {
    const inner = {
      ...defaultCaptionProps,
      ...caption,
      align: (0, _Util.getAlignIntValue)(caption?.align),
      color: (0, _reactNative.processColor)(caption?.color ?? defaultCaptionProps.color),
      haloColor: (0, _reactNative.processColor)(caption?.haloColor ?? defaultCaptionProps.haloColor)
    };
    return {
      ...inner,
      key: (0, _objectHash.default)(inner)
    };
  })();
  const _subCaption = (() => {
    const inner = {
      ...defaultSubCaptionProps,
      ...subCaption,
      color: (0, _reactNative.processColor)(subCaption?.color ?? defaultSubCaptionProps.color),
      haloColor: (0, _reactNative.processColor)(subCaption?.haloColor ?? defaultSubCaptionProps.haloColor)
    };
    return {
      ...inner,
      key: (0, _objectHash.default)(inner)
    };
  })();
  return /*#__PURE__*/(0, _jsxRuntime.jsx)(_RNCNaverMapMarkerNativeComponent.default, {
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
    width: width,
    height: height,
    alpha: alpha,
    anchor: anchor,
    angle: angle,
    isFlatEnabled: isFlatEnabled,
    isForceShowIcon: isForceShowIcon,
    isHideCollidedCaptions: isHideCollidedCaptions,
    isHideCollidedMarkers: isHideCollidedMarkers,
    isHideCollidedSymbols: isHideCollidedSymbols,
    isIconPerspectiveEnabled: isIconPerspectiveEnabled,
    tintColor: (0, _reactNative.processColor)(tintColor),
    image: (0, _Util.convertJsImagePropToNativeProp)(image),
    onTapOverlay: onTap,
    caption: _caption,
    subCaption: _subCaption,
    children: children
  });
};
exports.NaverMapMarkerOverlay = NaverMapMarkerOverlay;
//# sourceMappingURL=NaverMapMarkerOverlay.js.map