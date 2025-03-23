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
interface Props extends BaseOverlay, ViewProps {
    onTapOverlay?: DirectEventHandler<Readonly<{}>>;
    geometries: Readonly<{
        coords: ReadonlyArray<Coord>;
        holes: ReadonlyArray<ReadonlyArray<Coord>>;
    }>;
    color?: Int32;
    outlineColor?: Int32;
    outlineWidth?: Double;
}
declare const _default: import("react-native/Libraries/Utilities/codegenNativeComponent").NativeComponentType<Props>;
export default _default;
//# sourceMappingURL=RNCNaverMapPolygonNativeComponent.d.ts.map