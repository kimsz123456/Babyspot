"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var _exportNames = {
  NaverMapUtil: true,
  NaverMapView: true,
  NaverMapMarkerOverlay: true,
  NaverMapCircleOverlay: true,
  NaverMapPolygonOverlay: true,
  NaverMapPolylineOverlay: true,
  NaverMapPathOverlay: true,
  NaverMapArrowheadPathOverlay: true,
  NaverMapGroundOverlay: true
};
Object.defineProperty(exports, "NaverMapArrowheadPathOverlay", {
  enumerable: true,
  get: function () {
    return _NaverMapArrowheadPathOverlay.NaverMapArrowheadPathOverlay;
  }
});
Object.defineProperty(exports, "NaverMapCircleOverlay", {
  enumerable: true,
  get: function () {
    return _NaverMapCircleOverlay.NaverMapCircleOverlay;
  }
});
Object.defineProperty(exports, "NaverMapGroundOverlay", {
  enumerable: true,
  get: function () {
    return _NaverMapGroundOverlay.NaverMapGroundOverlay;
  }
});
Object.defineProperty(exports, "NaverMapMarkerOverlay", {
  enumerable: true,
  get: function () {
    return _NaverMapMarkerOverlay.NaverMapMarkerOverlay;
  }
});
Object.defineProperty(exports, "NaverMapPathOverlay", {
  enumerable: true,
  get: function () {
    return _NaverMapPathOverlay.NaverMapPathOverlay;
  }
});
Object.defineProperty(exports, "NaverMapPolygonOverlay", {
  enumerable: true,
  get: function () {
    return _NaverMapPolygonOverlay.NaverMapPolygonOverlay;
  }
});
Object.defineProperty(exports, "NaverMapPolylineOverlay", {
  enumerable: true,
  get: function () {
    return _NaverMapPolylineOverlay.NaverMapPolylineOverlay;
  }
});
Object.defineProperty(exports, "NaverMapUtil", {
  enumerable: true,
  get: function () {
    return _NaverMapUtil.NaverMapUtil;
  }
});
Object.defineProperty(exports, "NaverMapView", {
  enumerable: true,
  get: function () {
    return _NaverMapView.NaverMapView;
  }
});
var _NaverMapUtil = require("./util/NaverMapUtil");
var _NaverMapView = require("./component/NaverMapView");
var _NaverMapMarkerOverlay = require("./component/NaverMapMarkerOverlay");
var _NaverMapCircleOverlay = require("./component/NaverMapCircleOverlay");
var _NaverMapPolygonOverlay = require("./component/NaverMapPolygonOverlay");
var _NaverMapPolylineOverlay = require("./component/NaverMapPolylineOverlay");
var _NaverMapPathOverlay = require("./component/NaverMapPathOverlay");
var _NaverMapArrowheadPathOverlay = require("./component/NaverMapArrowheadPathOverlay");
var _NaverMapGroundOverlay = require("./component/NaverMapGroundOverlay");
var _RNCNaverMapViewNativeComponent = require("./spec/RNCNaverMapViewNativeComponent");
Object.keys(_RNCNaverMapViewNativeComponent).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  if (key in exports && exports[key] === _RNCNaverMapViewNativeComponent[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _RNCNaverMapViewNativeComponent[key];
    }
  });
});
var _BaseOverlayProps = require("./types/BaseOverlayProps");
Object.keys(_BaseOverlayProps).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  if (key in exports && exports[key] === _BaseOverlayProps[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _BaseOverlayProps[key];
    }
  });
});
var _Coord = require("./types/Coord");
Object.keys(_Coord).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  if (key in exports && exports[key] === _Coord[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _Coord[key];
    }
  });
});
var _Rect = require("./types/Rect");
Object.keys(_Rect).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  if (key in exports && exports[key] === _Rect[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _Rect[key];
    }
  });
});
var _Region = require("./types/Region");
Object.keys(_Region).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  if (key in exports && exports[key] === _Region[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _Region[key];
    }
  });
});
var _MapType = require("./types/MapType");
Object.keys(_MapType).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  if (key in exports && exports[key] === _MapType[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _MapType[key];
    }
  });
});
var _Align = require("./types/Align");
Object.keys(_Align).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  if (key in exports && exports[key] === _Align[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _Align[key];
    }
  });
});
var _LogoAlign = require("./types/LogoAlign");
Object.keys(_LogoAlign).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  if (key in exports && exports[key] === _LogoAlign[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _LogoAlign[key];
    }
  });
});
var _Camera = require("./types/Camera");
Object.keys(_Camera).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  if (key in exports && exports[key] === _Camera[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _Camera[key];
    }
  });
});
var _CameraAnimationEasing = require("./types/CameraAnimationEasing");
Object.keys(_CameraAnimationEasing).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  if (key in exports && exports[key] === _CameraAnimationEasing[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _CameraAnimationEasing[key];
    }
  });
});
var _CameraChangeReason = require("./types/CameraChangeReason");
Object.keys(_CameraChangeReason).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  if (key in exports && exports[key] === _CameraChangeReason[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _CameraChangeReason[key];
    }
  });
});
var _MarkerSymbol = require("./types/MarkerSymbol");
Object.keys(_MarkerSymbol).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  if (key in exports && exports[key] === _MarkerSymbol[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _MarkerSymbol[key];
    }
  });
});
var _MarkerImageProp = require("./types/MarkerImageProp");
Object.keys(_MarkerImageProp).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  if (key in exports && exports[key] === _MarkerImageProp[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _MarkerImageProp[key];
    }
  });
});
var _CapType = require("./types/CapType");
Object.keys(_CapType).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  if (key in exports && exports[key] === _CapType[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _CapType[key];
    }
  });
});
var _JoinType = require("./types/JoinType");
Object.keys(_JoinType).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  if (key in exports && exports[key] === _JoinType[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _JoinType[key];
    }
  });
});
var _LocationTrackingMode = require("./types/LocationTrackingMode");
Object.keys(_LocationTrackingMode).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  if (key in exports && exports[key] === _LocationTrackingMode[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _LocationTrackingMode[key];
    }
  });
});
var _CameraMoveBaseParams = require("./types/CameraMoveBaseParams");
Object.keys(_CameraMoveBaseParams).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  if (key in exports && exports[key] === _CameraMoveBaseParams[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _CameraMoveBaseParams[key];
    }
  });
});
var _Point = require("./types/Point");
Object.keys(_Point).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  if (key in exports && exports[key] === _Point[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _Point[key];
    }
  });
});
var _ClusterMarkerProp = require("./types/ClusterMarkerProp");
Object.keys(_ClusterMarkerProp).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  if (key in exports && exports[key] === _ClusterMarkerProp[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _ClusterMarkerProp[key];
    }
  });
});
//# sourceMappingURL=index.js.map