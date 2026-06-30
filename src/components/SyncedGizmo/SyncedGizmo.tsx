import { GizmoHelper, GizmoViewcube } from '@react-three/drei';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import React, { useEffect, useState } from 'react';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';

import { useSyncedGizmoContext } from './SyncedGizmoContext';
import type { GizmoPosition, SyncedGizmoProps } from './types';

// ─── CSS position helper ──────────────────────────────────────────────────────

function getPositionStyle(
  position: GizmoPosition,
  margin: [number, number],
): React.CSSProperties {
  const [mx, my] = margin;
  switch (position) {
    case 'top-left':     return { top: my,    left: mx };
    case 'top-right':    return { top: my,    right: mx };
    case 'bottom-left':  return { bottom: my, left: mx };
    case 'bottom-right':
    default:             return { bottom: my, right: mx };
  }
}

// ─── Apply material overrides ─────────────────────────────────────────────────

function applyMaterialOverrides(
  model: THREE.Group,
  modelColor?: string,
  modelOpacity?: number,
) {
  model.traverse((child) => {
    if (!(child instanceof THREE.Mesh)) return;
    const materials = Array.isArray(child.material)
      ? child.material
      : [child.material];
    materials.forEach((mat: THREE.Material) => {
      if (modelColor && 'color' in mat) {
        (mat as THREE.MeshStandardMaterial).color.set(modelColor);
      }
      if (modelOpacity !== undefined) {
        mat.transparent = modelOpacity < 1;
        mat.opacity = modelOpacity;
      }
      mat.needsUpdate = true;
    });
  });
}

// ─── Inner scene ──────────────────────────────────────────────────────────────

const CAMERA_FOV = 40;
const PADDING = 1;

interface GizmoSceneProps {
  glbUrl?: string;
  ambientIntensity: number;
  modelColor?: string;
  modelOpacity: number;
}

const GizmoScene: React.FC<GizmoSceneProps> = ({
  glbUrl,
  ambientIntensity,
  modelColor,
  modelOpacity,
}) => {
  const { quaternionRef } = useSyncedGizmoContext();
  const { camera } = useThree();
  const [model, setModel] = useState<THREE.Group | null>(null);
  const cameraRadiusRef = React.useRef(3);

  // Load GLB on URL change
  useEffect(() => {
    if (!glbUrl) return;
    let cancelled = false;
    const loader = new GLTFLoader();
    loader.load(glbUrl, (gltf) => {
      if (cancelled) return;
      const scene = gltf.scene as THREE.Group;

      // Normalize scale to fill the mini canvas
      const box = new THREE.Box3().setFromObject(scene);
      const size = new THREE.Vector3();
      box.getSize(size);
      const maxDim = Math.max(size.x, size.y, size.z);
      if (maxDim > 0) scene.scale.setScalar(1.5 / maxDim);

      // Centre at origin
      const center = new THREE.Vector3();
      box.getCenter(center);
      scene.position.sub(center.multiplyScalar(1.5 / maxDim));

      // Compute fit-to-box camera radius
      scene.updateMatrixWorld(true);
      const sphere = new THREE.Sphere();
      new THREE.Box3().setFromObject(scene).getBoundingSphere(sphere);
      const halfFovRad = (CAMERA_FOV / 2) * (Math.PI / 180);
      cameraRadiusRef.current = (sphere.radius / Math.tan(halfFovRad)) * PADDING;

      setModel(scene);
    });
    return () => { cancelled = true; };
  }, [glbUrl]);

  // Re-apply colour & opacity whenever model or those props change
  useEffect(() => {
    if (!model) return;
    applyMaterialOverrides(model, modelColor, modelOpacity);
  }, [model, modelColor, modelOpacity]);

  // Mirror main camera orientation every frame
  useFrame(() => {
    const q = quaternionRef.current;
    const r = cameraRadiusRef.current;
    camera.position.set(0, 0, r).applyQuaternion(q);
    camera.quaternion.copy(q);
    camera.lookAt(0, 0, 0);
  });

  if (!glbUrl || !model) {
    return (
      <GizmoHelper alignment="center" margin={[0, 0]}>
        <GizmoViewcube
          color="#2a2d35"
          hoverColor="#3f4350"
          textColor="#e8edf4"
          strokeColor="#555a66"
        />
      </GizmoHelper>
    );
  }

  return (
    <>
      <ambientLight intensity={ambientIntensity} />
      <primitive object={model} />
    </>
  );
};

// ─── Public component ─────────────────────────────────────────────────────────

export const SyncedGizmo: React.FC<SyncedGizmoProps> = ({
  glbUrl,
  size = 120,
  position = 'bottom-right',
  margin = [16, 16],
  background = 'transparent',
  style,
  ambientIntensity = 3,
  modelColor,
  modelOpacity = 0.8,
}) => {
  const posStyle = getPositionStyle(position, margin);

  return (
    <div
      style={{
        position: 'fixed',
        width: size,
        height: size,
        pointerEvents: 'none',
        zIndex: 1000,
        background,
        ...posStyle,
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
};
