"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.Commands = void 0;
var _codegenNativeComponent = _interopRequireDefault(require("react-native/Libraries/Utilities/codegenNativeComponent"));
var _codegenNativeCommands = _interopRequireDefault(require("react-native/Libraries/Utilities/codegenNativeCommands"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
/* Type should be redeclared because of codegen ts parser doesn't allow imported type
 * [comments](https://github.com/reactwg/react-native-new-architecture/discussions/91#discussioncomment-4282452)
 */
////////////////////
var _default = exports.default = (0, _codegenNativeComponent.default)('RNCNaverMapView');
const Commands = exports.Commands = (0, _codegenNativeCommands.default)({
  supportedCommands: ['screenToCoordinate', 'coordinateToScreen', 'animateCameraTo', 'animateCameraBy', 'cancelAnimation', 'animateRegionTo', 'setLocationTrackingMode']
});
//# sourceMappingURL=RNCNaverMapViewNativeComponent.js.map