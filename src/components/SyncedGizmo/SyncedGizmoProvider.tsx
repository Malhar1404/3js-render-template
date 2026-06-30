import React, { useRef } from 'react';
import * as THREE from 'three';

import { SyncedGizmoContext } from './SyncedGizmoContext';

/**
 * Wrap your viewer (or entire app) with this provider.
 * It creates a single shared THREE.Quaternion ref that is written
 * to by GizmoSyncer (inside the main canvas) and read by SyncedGizmo
 * (its own overlay canvas). No MobX, no tight coupling.
 */
export const SyncedGizmoProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const quaternionRef = useRef(new THREE.Quaternion());

  return (
    <SyncedGizmoContext.Provider value={{ quaternionRef }}>
      {children}
    </SyncedGizmoContext.Provider>
  );
};
