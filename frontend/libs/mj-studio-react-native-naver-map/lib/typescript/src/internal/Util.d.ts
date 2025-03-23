import type { CameraAnimationEasing, CameraChangeReason, Align, Camera, MarkerImageProp } from '@mj-studio/react-native-naver-map';
export declare function cameraEasingToNumber(value?: CameraAnimationEasing): number;
export declare function cameraChangeReasonFromNumber(value: number): CameraChangeReason;
export declare function getAlignIntValue(value?: Align): 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8;
export declare function createCameraInstance({ bearing, latitude, longitude, tilt, zoom, }: Camera): Camera;
export declare const convertJsImagePropToNativeProp: (image: MarkerImageProp) => {
    rnAssetUri: string;
    assetName?: undefined;
    reuseIdentifier?: undefined;
    httpUri?: undefined;
    symbol?: undefined;
} | {
    assetName: string;
    reuseIdentifier: string | undefined;
    rnAssetUri?: undefined;
    httpUri?: undefined;
    symbol?: undefined;
} | {
    httpUri: string;
    reuseIdentifier: string | undefined;
    rnAssetUri?: undefined;
    assetName?: undefined;
    symbol?: undefined;
} | {
    symbol: import("@mj-studio/react-native-naver-map").MarkerSymbol;
    reuseIdentifier: string | undefined;
    rnAssetUri?: undefined;
    assetName?: undefined;
    httpUri?: undefined;
} | undefined;
//# sourceMappingURL=Util.d.ts.map