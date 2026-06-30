import { GizmoHelper, GizmoViewcube } from '@react-three/drei';
import React from 'react';

/**
 * Renders a styled GizmoViewcube centred in the mini canvas.
 * Used as the fallback when no glbUrl is provided.
 */
export const GizmoCubeFallback: React.FC = () => (
  <GizmoHelper alignment="center-center" margin={[0, 0]}>
    <GizmoViewcube
      color="#2a2d35"
      hoverColor="#3f4350"
      textColor="#e8edf4"
      strokeColor="#555a66"
    />
  </GizmoHelper>
);
