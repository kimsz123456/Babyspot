import React from 'react';
import {I18nManager} from 'react-native';
import Svg, {ClipPath, Defs, G, Path, Rect} from 'react-native-svg';
import {GrayColors, PrimaryColors} from '../../../constants/colors';

export type StarIconProps = {
  size: number;
  type: StarTypes;
};

export type StarTypes = 'full' | 'half' | 'empty';

const StarEmpty = ({size}: Omit<StarIconProps, 'type'>) => (
  <Svg height={size} width={size} viewBox="0 0 24 24">
    <Path
      fill={GrayColors[300]}
      d="m12 17.27l4.15 2.51c.76.46 1.69-.22 1.49-1.08l-1.1-4.72l3.67-3.18c.67-.58.31-1.68-.57-1.75l-4.83-.41l-1.89-4.46c-.34-.81-1.5-.81-1.84 0L9.19 8.63l-4.83.41c-.88.07-1.24 1.17-.57 1.75l3.67 3.18l-1.1 4.72c-.2.86.73 1.54 1.49 1.08z"
    />
  </Svg>
);

const StarFull = ({size}: Omit<StarIconProps, 'type'>) => (
  <Svg height={size} width={size} viewBox="0 0 24 24">
    <Path
      fill={PrimaryColors[500]}
      d="m12 17.27l4.15 2.51c.76.46 1.69-.22 1.49-1.08l-1.1-4.72l3.67-3.18c.67-.58.31-1.68-.57-1.75l-4.83-.41l-1.89-4.46c-.34-.81-1.5-.81-1.84 0L9.19 8.63l-4.83.41c-.88.07-1.24 1.17-.57 1.75l3.67 3.18l-1.1 4.72c-.2.86.73 1.54 1.49 1.08z"
    />
  </Svg>
);

const StarHalf = ({size}: Omit<StarIconProps, 'type'>) => (
  <Svg
    height={size}
    width={size}
    viewBox="0 0 24 24"
    style={I18nManager.isRTL ? {transform: [{scaleX: -1}]} : undefined}>
    <Defs>
      <ClipPath id="clipHalf">
        <Rect x="0" y="0" width="12" height="24" />
      </ClipPath>
    </Defs>
    <Path
      fill={GrayColors[300]}
      d="m12 17.27l4.15 2.51c.76.46 1.69-.22 1.49-1.08l-1.1-4.72l3.67-3.18c.67-.58.31-1.68-.57-1.75l-4.83-.41l-1.89-4.46c-.34-.81-1.5-.81-1.84 0L9.19 8.63l-4.83.41c-.88.07-1.24 1.17-.57 1.75l3.67 3.18l-1.1 4.72c-.2.86.73 1.54 1.49 1.08z"
    />
    <G clipPath="url(#clipHalf)">
      <Path
        fill={PrimaryColors[500]}
        d="m12 17.27l4.15 2.51c.76.46 1.69-.22 1.49-1.08l-1.1-4.72l3.67-3.18c.67-.58.31-1.68-.57-1.75l-4.83-.41l-1.89-4.46c-.34-.81-1.5-.81-1.84 0L9.19 8.63l-4.83.41c-.88.07-1.24 1.17-.57 1.75l3.67 3.18l-1.1 4.72c-.2.86.73 1.54 1.49 1.08z"
      />
    </G>
  </Svg>
);

const StarIcon = ({type, size}: StarIconProps) => {
  const Component =
    type === 'full' ? StarFull : type === 'half' ? StarHalf : StarEmpty;

  return <Component size={size} />;
};

export default StarIcon;
