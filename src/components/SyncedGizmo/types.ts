import type { CSSProperties, MutableRefObject } from 'react';
import type * as THREE from 'three';

export type GizmoPosition = 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right';

export interface SyncedGizmoProps {
  glbUrl?: string;
  size?: number;
  position?: GizmoPosition;
  margin?: [number, number];
  background?: string;
  style?: CSSProperties;

  // ─── Lighting ──────────────────────────────────────────────────────────

  /** Ambient light intensity. Default: 3 */
  ambientIntensity?: number;

  /** Intensity of the 6 directional fill lights. Default: 0.8 */
  lightIntensity?: number;

  // ─── Model appearance ──────────────────────────────────────────────────

  /**
   * Override colour applied to every mesh material in the loaded GLB.
   * Any CSS colour string (e.g. '#ff0000', 'white', 'rgb(0,128,255)').
   * Leave undefined to keep the original material colours.
   */
  modelColor?: string;

  /**
   * Override opacity (0 = invisible, 1 = opaque) applied to every mesh
   * material. Automatically enables transparency when < 1.
   * Default: 1
   */
  modelOpacity?: number;
}

/**
 * Shape of the context value shared between GizmoSyncer (inside main Canvas)
 * and SyncedGizmo (its own Canvas).
 */
export interface SyncedGizmoContextValue {
  /** Mutable ref that always holds the main camera's world quaternion. */
  quaternionRef: MutableRefObject<THREE.Quaternion>;
}
