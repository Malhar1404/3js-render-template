import React, { useEffect } from 'react';
import * as THREE from 'three';

import { applyMaterialOverrides } from './materialUtils';

interface GizmoModelSceneProps {
  model: THREE.Group;
  ambientIntensity: number;
  modelColor?: string;
  modelOpacity: number;
}

/**
 * Renders the loaded GLB model with 6-direction lighting.
 * Re-applies material overrides whenever color or opacity props change.
 */
export const GizmoModelScene: React.FC<GizmoModelSceneProps> = ({
  model,
  ambientIntensity,
  modelColor,
  modelOpacity,
}) => {
  useEffect(() => {
    applyMaterialOverrides(model, modelColor, modelOpacity);
  }, [model, modelColor, modelOpacity]);

  return (
    <>
      <ambientLight intensity={ambientIntensity} />
      <primitive object={model} />
    </>
  );
};
