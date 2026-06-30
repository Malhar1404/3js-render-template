import React from 'react';
import { useFrame, useThree } from '@react-three/fiber';

import { useSyncedGizmoContext } from './SyncedGizmoContext';

/**
 * Place this component INSIDE your main <Canvas>.
 * It reads the main camera's world quaternion every frame and writes it
 * to the shared ref so SyncedGizmo can mirror it.
 *
 * This is a render-less component — it returns null and has zero visual output.
 */
export const GizmoSyncer: React.FC = () => {
  const { quaternionRef } = useSyncedGizmoContext();
  const { camera } = useThree();

  useFrame(() => {
    camera.getWorldQuaternion(quaternionRef.current);
  });

  return null;
};
