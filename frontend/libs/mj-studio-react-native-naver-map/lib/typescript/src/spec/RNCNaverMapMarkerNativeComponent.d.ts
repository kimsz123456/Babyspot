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
export type NativeCaptionProp = {
    key: string;
    text: string;
    requestedWidth?: Double;
    align?: Int32;
    offset?: Double;
    color?: Int32;
    haloColor?: Int32;
    textSize?: Double;
    minZoom?: Double;
    maxZoom?: Double;
};
export type NativeSubCaptionProp = {
    key: string;
    text: string;
    color?: Int32;
    haloColor?: Int32;
    textSize?: Double;
    requestedWidth?: Double;
    minZoom?: Double;
    maxZoom?: Double;
};
export type NativeImageProp = Readonly<{
    symbol?: string;
    rnAssetUri?: string;
    httpUri?: string;
    assetName?: string;
    reuseIdentifier?: string;
}>;
interface Props extends BaseOverlay, ViewProps {
    coord: Readonly<{
        latitude: Double;
        longitude: Double;
    }>;
    onTapOverlay?: DirectEventHandler<Readonly<{}>>;
    width?: Double;
    height?: Double;
    anchor?: Readonly<{
        x: Double;
        y: Double;
    }>;
    angle?: Double;
    isFlatEnabled?: boolean;
    isIconPerspectiveEnabled?: boolean;
    alpha?: Double;
    isHideCollidedSymbols?: boolean;
    isHideCollidedMarkers?: boolean;
    isHideCollidedCaptions?: boolean;
    isForceShowIcon?: boolean;
    tintColor?: Int32;
    image?: Readonly<NativeImageProp>;
    caption?: Readonly<NativeCaptionProp>;
    subCaption?: Readonly<NativeSubCaptionProp>;
}
declare const _default: import("react-native/Libraries/Utilities/codegenNativeComponent").NativeComponentType<Props>;
export default _default;
//# sourceMappingURL=RNCNaverMapMarkerNativeComponent.d.ts.map