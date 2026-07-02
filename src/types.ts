import { RefObject } from 'react';
import * as THREE from 'three';

import { CornerLight } from './state/CornerLight';

export const enum Role {
  ADMIN = 'admin',
  USER = 'user',
  GUEST = 'guest',
  Developer = 'developer',
}

export type MeshInfoJson = {
  glbUrl: string;
  availableColors: string[];
};

export type MeshHighlightOptions = {
  highlight: {
    color: string;
    opacity: number;
  };
  selected: {
    color: string;
    opacity: number;
  };
  blinkSelection: {
    color: string;
    opacity: number;
    halfBlinkDuration: number; // in seconds
    delay: number; // in seconds
    blinks: number; // number of blinks
  };
};

export type MeshHighlights = keyof MeshHighlightOptions;

export type MeshHighlightSettings = {
  [k in MeshHighlights]: boolean;
};

export type ModelBounds = {
  helperSize: number;
  max: { x: number; y: number; z: number };
  min: { x: number; y: number; z: number };
};

export type CornerLightPatch = Partial<
  Pick<
    CornerLight,
    'enabled' | 'intensity' | 'offsetX' | 'offsetY' | 'offsetZ' | 'helper'
  >
>;

export type CornerPointLightProps = {
  basePosition: THREE.Vector3;
  center: THREE.Vector3;
  helperSize: number;
  light: CornerLight;
};

export type CornerLightsProps = {
  groupRef: RefObject<THREE.Group | null>;
};

export type CornerLayout = {
  bounds: ModelBounds;
  positions: Array<{ id: number; position: THREE.Vector3 }>;
};

export type CornerLightHelperProps = {
  helperSize: number;
  light: THREE.DirectionalLight;
};

export interface MeshPanelRowProps {
  id: string;
  depth: number;
}
