/// <reference types="react-native/types/modules/codegen" />
import type { Double, Int32, DirectEventHandler } from 'react-native/Libraries/Types/CodegenTypes';
import type { ViewProps } from 'react-native';
interface BaseOverlay {
    zIndexValue: Int32;
    globalZIndexValue: Int32;
    isHidden: boolean;
    minZoom: Double;
    maxZoom: Double;
    isMinZoomInclusive: boolean;
    isMaxZoomInclusive: boolean;
}
type Coord = {
    latitude: Double;
    longitude: Double;
};
type NativeImageProp = undefined | Readonly<{
    symbol?: string;
    rnAssetUri?: string;
    httpUri?: string;
    assetName?: string;
    reuseIdentifier?: string;
}>;
interface Props extends BaseOverlay, ViewProps {
    onTapOverlay?: DirectEventHandler<Readonly<{}>>;
    coords: ReadonlyArray<Coord>;
    width?: Double;
    outlineWidth?: Double;
    patternInterval?: Int32;
    patternImage?: NativeImageProp;
    progress?: Double;
    color?: Int32;
    passedColor?: Int32;
    outlineColor?: Int32;
    passedOutlineColor?: Int32;
    isHideCollidedSymbols?: boolean;
    isHideCollidedMarkers?: boolean;
    isHideCollidedCaptions?: boolean;
}
declare const _default: import("react-native/Libraries/Utilities/codegenNativeComponent").NativeComponentType<Props>;
export default _default;
//# sourceMappingURL=RNCNaverMapPathNativeComponent.d.ts.map