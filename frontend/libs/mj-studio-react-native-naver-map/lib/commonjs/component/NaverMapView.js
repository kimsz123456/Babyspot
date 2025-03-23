"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.NaverMapView = void 0;
var _RNCNaverMapViewNativeComponent = _interopRequireWildcard(require("../spec/RNCNaverMapViewNativeComponent"));
var _react = _interopRequireWildcard(require("react"));
var _useStableCallback = require("../internal/util/useStableCallback");
var _Const = require("../internal/util/Const");
var _Util = require("../internal/Util");
var _objectHash = _interopRequireDefault(require("object-hash"));
var _jsxRuntime = require("react/jsx-runtime");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function (e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
/**
 * @category Hell
 */

function clamp(v, min, max) {
  return Math.min(max, Math.max(min, v));
}
const southKoreaExtent = {
  latitude: 31.43,
  longitude: 122.37,
  latitudeDelta: 44.35 - 31.43,
  longitudeDelta: 132 - 122.37
};
const nullRegion = {
  latitude: _Const.Const.NULL_NUMBER,
  longitude: _Const.Const.NULL_NUMBER,
  latitudeDelta: _Const.Const.NULL_NUMBER,
  longitudeDelta: _Const.Const.NULL_NUMBER
};
const nullCamera = {
  latitude: _Const.Const.NULL_NUMBER,
  longitude: _Const.Const.NULL_NUMBER,
  zoom: _Const.Const.NULL_NUMBER,
  tilt: _Const.Const.NULL_NUMBER,
  bearing: _Const.Const.NULL_NUMBER
};
const NaverMapView = exports.NaverMapView = /*#__PURE__*/(0, _react.forwardRef)(({
  camera,
  initialCamera,
  region,
  initialRegion,
  animationDuration = 0,
  animationEasing = _Const.Const.DEFAULT_EASING,
  mapType = 'Basic',
  layerGroups = {
    BUILDING: true,
    BICYCLE: false,
    CADASTRAL: false,
    MOUNTAIN: false,
    TRAFFIC: false,
    TRANSIT: false
  },
  isIndoorEnabled = false,
  isNightModeEnabled = false,
  isLiteModeEnabled = false,
  lightness = 0,
  buildingHeight = 1,
  symbolScale = 1,
  symbolPerspectiveRatio = 1,
  mapPadding,
  isShowCompass = true,
  isShowIndoorLevelPicker = true,
  isShowLocationButton = true,
  isShowScaleBar = true,
  isShowZoomControls = true,
  minZoom,
  maxZoom,
  extent,
  isExtentBoundedInKorea,
  logoAlign,
  logoMargin,
  onCameraChanged: onCameraChangedProp,
  onCameraIdle: onCameraIdleProp,
  onTapMap: onTapMapProp,
  onInitialized,
  onOptionChanged,
  isScrollGesturesEnabled = true,
  isZoomGesturesEnabled = true,
  isTiltGesturesEnabled = true,
  isRotateGesturesEnabled = true,
  isStopGesturesEnabled = true,
  isUseTextureViewAndroid = false,
  locale,
  clusters,
  fpsLimit = 0,
  // locationOverlay,
  onTapClusterLeaf,
  ...rest
}, ref) => {
  const innerRef = (0, _react.useRef)(null);
  const isLeafTapCallbackExist = !!onTapClusterLeaf;
  const _clusters = (0, _react.useMemo)(() => {
    if (!clusters || clusters.length === 0) {
      return {
        key: '',
        clusters: [],
        isLeafTapCallbackExist
      };
    }
    let propKey = '';
    const ret = [];
    for (const {
      animate = true,
      markers,
      // eslint-disable-next-line @typescript-eslint/no-shadow
      minZoom = _Const.Const.MIN_ZOOM,
      // eslint-disable-next-line @typescript-eslint/no-shadow
      maxZoom = _Const.Const.MAX_ZOOM,
      screenDistance = _Const.Const.DEFAULT_SCREEN_DISTANCE,
      width,
      height
    } of clusters) {
      const key = (0, _objectHash.default)([animate, maxZoom, minZoom, screenDistance, markers, width, height]);
      ret.push({
        key,
        animate,
        markers: markers.map(m => ({
          ...m,
          image: (0, _Util.convertJsImagePropToNativeProp)(m.image ?? {
            symbol: 'green'
          })
        })),
        maxZoom,
        minZoom,
        screenDistance,
        width,
        height
      });
      propKey += `${key}---`;
    }
    return {
      key: (0, _objectHash.default)(propKey),
      clusters: ret,
      isLeafTapCallbackExist
    };
  }, [clusters, isLeafTapCallbackExist]);

  // const _locationOverlay: NativeLocationOverlayProp | undefined =
  //   useMemo(() => {
  //     if (!locationOverlay)
  //       return Platform.OS === 'ios'
  //         ? { circleOutlineWidth: Const.NULL_NUMBER }
  //         : undefined;
  //     return {
  //       isVisible: locationOverlay.isVisible,
  //       position: locationOverlay.position,
  //       bearing: locationOverlay.bearing,
  //       image: locationOverlay.image
  //         ? convertJsImagePropToNativeProp(locationOverlay.image)
  //         : undefined,
  //       imageWidth: locationOverlay.imageWidth,
  //       imageHeight: locationOverlay.imageHeight,
  //       anchor: locationOverlay.anchor,
  //       subImage: locationOverlay.subImage
  //         ? convertJsImagePropToNativeProp(locationOverlay.subImage)
  //         : undefined,
  //       subImageWidth: locationOverlay.subImageWidth,
  //       subImageHeight: locationOverlay.subImageHeight,
  //       subAnchor: locationOverlay.subAnchor,
  //       circleRadius: locationOverlay.circleRadius,
  //       circleColor: locationOverlay.circleColor
  //         ? (processColor(locationOverlay.circleColor) as number)
  //         : undefined,
  //       circleOutlineWidth: locationOverlay.circleOutlineWidth,
  //       circleOutlineColor: locationOverlay.circleOutlineColor
  //         ? (processColor(locationOverlay.circleOutlineColor) as number)
  //         : undefined,
  //     } satisfies NativeLocationOverlayProp;
  //   }, [locationOverlay]);

  const onCameraChanged = (0, _useStableCallback.useStableCallback)(({
    nativeEvent: {
      bearing,
      latitude,
      longitude,
      reason,
      tilt,
      zoom,
      regionLatitude,
      regionLatitudeDelta,
      regionLongitude,
      regionLongitudeDelta
    }
  }) => {
    onCameraChangedProp?.({
      zoom,
      tilt,
      reason: (0, _Util.cameraChangeReasonFromNumber)(reason),
      latitude,
      longitude,
      bearing,
      region: {
        latitude: regionLatitude,
        longitude: regionLongitude,
        latitudeDelta: regionLatitudeDelta,
        longitudeDelta: regionLongitudeDelta
      }
    });
  });
  const onCameraIdle = (0, _useStableCallback.useStableCallback)(({
    nativeEvent: {
      bearing,
      latitude,
      longitude,
      tilt,
      zoom,
      regionLatitude,
      regionLatitudeDelta,
      regionLongitude,
      regionLongitudeDelta
    }
  }) => {
    onCameraIdleProp?.({
      zoom,
      tilt,
      latitude,
      longitude,
      bearing,
      region: {
        latitude: regionLatitude,
        longitude: regionLongitude,
        latitudeDelta: regionLatitudeDelta,
        longitudeDelta: regionLongitudeDelta
      }
    });
  });
  const onTapMap = (0, _useStableCallback.useStableCallback)(({
    nativeEvent: {
      longitude,
      latitude,
      x,
      y
    }
  }) => {
    onTapMapProp?.({
      longitude,
      latitude,
      x,
      y
    });
  });
  const screenToCoordinatePromise = (0, _react.useRef)();
  const coordinateToScreenPromise = (0, _react.useRef)();
  (0, _react.useEffect)(() => {
    return () => {
      screenToCoordinatePromise.current?.resolve({
        isValid: false,
        latitude: 0,
        longitude: 0
      });
      screenToCoordinatePromise.current = undefined;
      coordinateToScreenPromise.current?.resolve({
        isValid: false,
        screenX: 0,
        screenY: 0
      });
      coordinateToScreenPromise.current = undefined;
    };
  }, []);
  const onScreenToCoordinate = (0, _useStableCallback.useStableCallback)(({
    nativeEvent
  }) => {
    screenToCoordinatePromise.current?.resolve(nativeEvent);
    screenToCoordinatePromise.current = undefined;
  });
  const onCoordinateToScreen = (0, _useStableCallback.useStableCallback)(({
    nativeEvent
  }) => {
    coordinateToScreenPromise.current?.resolve(nativeEvent);
    coordinateToScreenPromise.current = undefined;
  });
  (0, _react.useImperativeHandle)(ref, () => ({
    animateCameraTo: ({
      duration,
      easing,
      latitude,
      longitude,
      pivot,
      zoom = _Const.Const.NULL_NUMBER
    }) => {
      if (innerRef.current) {
        _RNCNaverMapViewNativeComponent.Commands.animateCameraTo(innerRef.current, latitude, longitude, duration ?? _Const.Const.DEFAULT_ANIM_DURATION, (0, _Util.cameraEasingToNumber)(easing ?? _Const.Const.DEFAULT_EASING), pivot?.x ?? 0.5, pivot?.y ?? 0.5, zoom);
      }
    },
    animateCameraBy: ({
      duration,
      easing,
      x,
      y,
      pivot
    }) => {
      if (innerRef.current) {
        _RNCNaverMapViewNativeComponent.Commands.animateCameraBy(innerRef.current, x, y, duration ?? _Const.Const.DEFAULT_ANIM_DURATION, (0, _Util.cameraEasingToNumber)(easing ?? _Const.Const.DEFAULT_EASING), pivot?.x ?? 0.5, pivot?.y ?? 0.5);
      }
    },
    animateRegionTo: ({
      easing,
      longitude,
      latitude,
      duration,
      latitudeDelta,
      longitudeDelta,
      pivot
    }) => {
      if (innerRef.current) {
        _RNCNaverMapViewNativeComponent.Commands.animateRegionTo(innerRef.current, latitude, longitude, latitudeDelta, longitudeDelta, duration ?? _Const.Const.DEFAULT_ANIM_DURATION, (0, _Util.cameraEasingToNumber)(easing ?? _Const.Const.DEFAULT_EASING), pivot?.x ?? 0.5, pivot?.y ?? 0.5);
      }
    },
    animateCameraWithTwoCoords: ({
      duration,
      easing,
      coord1,
      coord2,
      pivot
    }) => {
      if (innerRef.current) {
        const latitude = Math.min(coord1.latitude, coord2.latitude);
        const longitude = Math.min(coord1.longitude, coord2.longitude);
        const latitudeDelta = Math.abs(coord1.latitude - coord2.latitude);
        const longitudeDelta = Math.abs(coord1.longitude - coord2.longitude);
        _RNCNaverMapViewNativeComponent.Commands.animateRegionTo(innerRef.current, latitude, longitude, latitudeDelta, longitudeDelta, duration ?? _Const.Const.DEFAULT_ANIM_DURATION, (0, _Util.cameraEasingToNumber)(easing ?? _Const.Const.DEFAULT_EASING), pivot?.x ?? 0.5, pivot?.y ?? 0.5);
      }
    },
    cancelAnimation: () => {
      if (innerRef.current) {
        _RNCNaverMapViewNativeComponent.Commands.cancelAnimation(innerRef.current);
      }
    },
    setLocationTrackingMode: mode => {
      if (innerRef.current) {
        _RNCNaverMapViewNativeComponent.Commands.setLocationTrackingMode(innerRef.current, mode);
      }
    },
    screenToCoordinate: ({
      screenX,
      screenY
    }) => {
      screenToCoordinatePromise.current?.resolve({
        isValid: false,
        latitude: 0,
        longitude: 0
      });
      screenToCoordinatePromise.current = undefined;
      if (innerRef.current) {
        const newPromise = new Promise((resolve, reject) => {
          screenToCoordinatePromise.current = {
            resolve,
            reject
          };
        });
        _RNCNaverMapViewNativeComponent.Commands.screenToCoordinate(innerRef.current, screenX, screenY);
        return newPromise;
      } else {
        return new Promise((_, reject) => reject(new Error('ref not set yet')));
      }
    },
    coordinateToScreen: ({
      latitude,
      longitude
    }) => {
      coordinateToScreenPromise.current?.resolve({
        isValid: false,
        screenX: 0,
        screenY: 0
      });
      coordinateToScreenPromise.current = undefined;
      if (innerRef.current) {
        const newPromise = new Promise((resolve, reject) => {
          coordinateToScreenPromise.current = {
            resolve,
            reject
          };
        });
        _RNCNaverMapViewNativeComponent.Commands.coordinateToScreen(innerRef.current, latitude, longitude);
        return newPromise;
      } else {
        return new Promise((_, reject) => reject(new Error('ref not set yet')));
      }
    }
  }), []);
  return /*#__PURE__*/(0, _jsxRuntime.jsx)(_RNCNaverMapViewNativeComponent.default, {
    ref: innerRef,
    mapType: mapType,
    layerGroups: (layerGroups?.BUILDING ? 1 : 0) + (layerGroups?.TRAFFIC ? 2 : 0) + (layerGroups?.TRANSIT ? 4 : 0) + (layerGroups?.BICYCLE ? 8 : 0) + (layerGroups?.MOUNTAIN ? 16 : 0) + (layerGroups?.CADASTRAL ? 32 : 0),
    camera: camera ? (0, _Util.createCameraInstance)(camera) : undefined,
    initialCamera: !camera && initialCamera ? (0, _Util.createCameraInstance)(initialCamera) : nullCamera,
    region: !camera && !initialCamera ? region : undefined,
    initialRegion: !region && !camera && !initialCamera && initialRegion ? initialRegion : nullRegion,
    animationDuration: animationDuration,
    animationEasing: (0, _Util.cameraEasingToNumber)(animationEasing),
    isIndoorEnabled: isIndoorEnabled,
    isNightModeEnabled: isNightModeEnabled,
    isLiteModeEnabled: isLiteModeEnabled,
    lightness: clamp(lightness, -1, 1),
    buildingHeight: clamp(buildingHeight, 0, 1),
    symbolScale: clamp(symbolScale, 0, 2),
    symbolPerspectiveRatio: clamp(symbolPerspectiveRatio, 0, 1),
    onInitialized: onInitialized,
    onCameraChanged: onCameraChangedProp ? onCameraChanged : undefined,
    onCameraIdle: onCameraIdleProp ? onCameraIdle : undefined,
    onTapMap: onTapMapProp ? onTapMap : undefined,
    onOptionChanged: onOptionChanged,
    mapPadding: mapPadding,
    isShowCompass: isShowCompass,
    isShowIndoorLevelPicker: isShowIndoorLevelPicker,
    isShowLocationButton: isShowLocationButton,
    isShowScaleBar: isShowScaleBar,
    isShowZoomControls: isShowZoomControls,
    minZoom: minZoom,
    maxZoom: maxZoom,
    extent: extent ? extent : isExtentBoundedInKorea ? southKoreaExtent : undefined,
    logoAlign: logoAlign,
    logoMargin: logoMargin,
    isScrollGesturesEnabled: isScrollGesturesEnabled,
    isZoomGesturesEnabled: isZoomGesturesEnabled,
    isTiltGesturesEnabled: isTiltGesturesEnabled,
    isRotateGesturesEnabled: isRotateGesturesEnabled,
    isStopGesturesEnabled: isStopGesturesEnabled,
    isUseTextureViewAndroid: isUseTextureViewAndroid,
    locale: locale,
    clusters: _clusters,
    onScreenToCoordinate: onScreenToCoordinate,
    onCoordinateToScreen: onCoordinateToScreen,
    fpsLimit: fpsLimit
    // locationOverlay={_locationOverlay}
    ,
    onTapClusterLeaf: onTapClusterLeaf ? ({
      nativeEvent: {
        markerIdentifier
      }
    }) => onTapClusterLeaf({
      markerIdentifier
    }) : undefined,
    ...rest
  });
});
//# sourceMappingURL=NaverMapView.js.map