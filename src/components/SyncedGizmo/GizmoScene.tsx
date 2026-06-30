import { useFrame, useThree } from '@react-three/fiber';
import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';

import { GizmoCubeFallback } from './GizmoCubeFallback';
import { GizmoModelScene } from './GizmoModelScene';
import { useSyncedGizmoContext } from './SyncedGizmoContext';

const CAMERA_FOV = 40;
const PADDING = 1;

function computeCameraRadius(scene: THREE.Group): number {
  scene.updateMatrixWorld(true);
  const sphere = new THREE.Sphere();
  new THREE.Box3().setFromObject(scene).getBoundingSphere(sphere);
  const halfFovRad = (CAMERA_FOV / 2) * (Math.PI / 180);
  return (sphere.radius / Math.tan(halfFovRad)) * PADDING;
}

function normalizeScene(scene: THREE.Group): void {
  const box = new THREE.Box3().setFromObject(scene);
  const size = new THREE.Vector3();
  box.getSize(size);
  const maxDim = Math.max(size.x, size.y, size.z);
  const scale = maxDim > 0 ? 1.5 / maxDim : 1;
  scene.scale.setScalar(scale);
  const center = new THREE.Vector3();
  box.getCenter(center);
  scene.position.sub(center.multiplyScalar(scale));
}

interface GizmoSceneProps {
  glbUrl?: string;
  ambientIntensity: number;
  modelColor?: string;
  modelOpacity: number;
}

/**
 * Coordinator component rendered inside the overlay <Canvas>.
 * Handles GLB loading, camera synchronisation, and delegates rendering
 * to either GizmoCubeFallback or GizmoModelScene.
 */
export const GizmoScene: React.FC<GizmoSceneProps> = ({
  glbUrl,
  ambientIntensity,
  modelColor,
  modelOpacity,
}) => {
  const { quaternionRef } = useSyncedGizmoContext();
  const { camera } = useThree();
  const [model, setModel] = useState<THREE.Group | null>(null);
  const cameraRadiusRef = useRef(3);

  useEffect(() => {
    if (!glbUrl) { setModel(null); return; }
    let cancelled = false;
    const loader = new GLTFLoader();
    loader.load(glbUrl, (gltf) => {
      if (cancelled) return;
      const scene = gltf.scene as THREE.Group;
      normalizeScene(scene);
      cameraRadiusRef.current = computeCameraRadius(scene);
      setModel(scene);
    });
    return () => { cancelled = true; };
  }, [glbUrl]);

  useFrame(() => {
    const q = quaternionRef.current;
    const r = cameraRadiusRef.current;
    camera.position.set(0, 0, r).applyQuaternion(q);
    camera.quaternion.copy(q);
    camera.lookAt(0, 0, 0);
  });

  if (!glbUrl || !model) {
    return <GizmoCubeFallback />;
  }

  return (
    <GizmoModelScene
      model={model}
      ambientIntensity={ambientIntensity}
      modelColor={modelColor}
      modelOpacity={modelOpacity}
    />
  );
};
