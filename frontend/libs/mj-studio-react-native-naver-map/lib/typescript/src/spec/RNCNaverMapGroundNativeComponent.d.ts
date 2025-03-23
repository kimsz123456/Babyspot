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
export type NativeImageProp = undefined | Readonly<{
    symbol?: string;
    rnAssetUri?: string;
    httpUri?: string;
    assetName?: string;
    reuseIdentifier?: string;
}>;
type Region = {
    latitude: Double;
    longitude: Double;
    latitudeDelta: Double;
    longitudeDelta: Double;
};
interface Props extends BaseOverlay, ViewProps {
    onTapOverlay?: DirectEventHandler<Readonly<{}>>;
    image: NativeImageProp;
    region: Region;
}
declare const _default: import("react-native/Libraries/Utilities/codegenNativeComponent").NativeComponentType<Props>;
export default _default;
//# sourceMappingURL=RNCNaverMapGroundNativeComponent.d.ts.map