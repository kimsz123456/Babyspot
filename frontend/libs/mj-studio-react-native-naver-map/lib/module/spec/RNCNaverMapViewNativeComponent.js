import codegenNativeComponent from 'react-native/Libraries/Utilities/codegenNativeComponent';
import codegenNativeCommands from 'react-native/Libraries/Utilities/codegenNativeCommands';

/* Type should be redeclared because of codegen ts parser doesn't allow imported type
 * [comments](https://github.com/reactwg/react-native-new-architecture/discussions/91#discussioncomment-4282452)
 */

////////////////////

export default codegenNativeComponent('RNCNaverMapView');
export const Commands = codegenNativeCommands({
  supportedCommands: ['screenToCoordinate', 'coordinateToScreen', 'animateCameraTo', 'animateCameraBy', 'cancelAnimation', 'animateRegionTo', 'setLocationTrackingMode']
});
//# sourceMappingURL=RNCNaverMapViewNativeComponent.js.map