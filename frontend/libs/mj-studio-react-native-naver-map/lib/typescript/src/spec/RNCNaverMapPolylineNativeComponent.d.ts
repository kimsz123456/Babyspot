/// <reference types="react-native/types/modules/codegen" />
import type { Double, Int32, DirectEventHandler, WithDefault } from 'react-native/Libraries/Types/CodegenTypes';
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
    coords: ReadonlyArray<Coord>;
    width?: Double;
    color?: Int32;
    pattern?: ReadonlyArray<Int32>;
    capType?: WithDefault<'Round' | 'Butt' | 'Square', 'Round'>;
    joinType?: WithDefault<'Bevel' | 'Miter' | 'Round', 'Round'>;
}
declare const _default: import("react-native/Libraries/Utilities/codegenNativeComponent").NativeComponentType<Props>;
export default _default;
//# sourceMappingURL=RNCNaverMapPolylineNativeComponent.d.ts.map