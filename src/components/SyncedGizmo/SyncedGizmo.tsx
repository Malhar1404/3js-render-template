import { Canvas } from '@react-three/fiber';
import React from 'react';

import { GizmoScene } from './GizmoScene';
import type { GizmoPosition, SyncedGizmoProps } from './types';

const CAMERA_FOV = 40;

function getPositionStyle(
  position: GizmoPosition,
  margin: [number, number],
): React.CSSProperties {
  const [mx, my] = margin;
  switch (position) {
    case 'top-left':    return { top: my,    left: mx };
    case 'top-right':   return { top: my,    right: mx };
    case 'bottom-left': return { bottom: my, left: mx };
    case 'bottom-right':
    default:            return { bottom: my, right: mx };
  }
}

/**
 * SyncedGizmo — positioned overlay canvas mirroring the main scene's camera.
 * Must be used inside a <SyncedGizmoProvider>.
 */
export const SyncedGizmo: React.FC<SyncedGizmoProps> = ({
  glbUrl,
  size = 120,
  position = 'bottom-right',
  margin = [16, 16],
  background = 'transparent',
  style,
  ambientIntensity = 5,
  modelColor,
  modelOpacity = 0.8,
}) => (
  <div
    style={{
      position: 'fixed',
      width: size,
      height: size,
      pointerEvents: 'none',
      zIndex: 1000,
      background,
      ...getPositionStyle(position, margin),
      ...style,
    }}
  >
    <Canvas
      gl={{ alpha: true, antialias: true }}
      camera={{ position: [0, 0, 3], fov: CAMERA_FOV }}
      style={{ background: 'transparent' }}
    >
      <GizmoScene
        glbUrl={glbUrl}
        ambientIntensity={ambientIntensity}
        modelColor={modelColor}
        modelOpacity={modelOpacity}
      />
    </Canvas>
  </div>
);
