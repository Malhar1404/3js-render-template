import { useFrame } from '@react-three/fiber';
import { ThreeEvent } from '@react-three/fiber';
import { observer } from 'mobx-react-lite';
import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import * as THREE from 'three';

import { useMainContext } from '../../../hooks/useMainContext';
import { Utils3D } from '../../../utils/Utils3D';
import { CornerLights } from '../Light/CornerLights';

function applySceneSettings(
  scene: THREE.Group,
  roughness: number,
  metalness: number,
) {
  scene.traverse((child) => {
    if (!(child instanceof THREE.Mesh)) return;

    child.castShadow = true;
    child.receiveShadow = true;

    const materials = Array.isArray(child.material)
      ? child.material
      : [child.material];

    materials.forEach((mat) => {
      if (mat && 'roughness' in mat) {
        (mat as THREE.MeshStandardMaterial).roughness = roughness;
        (mat as THREE.MeshStandardMaterial).metalness = metalness;
        mat.needsUpdate = true;
      }
    });
  });
}

export const MeshCompute = observer(() => {
  const { design3DManager, designManager } = useMainContext();
  const { meshManager, cameraManager, levaManager, meshTreeStore } = design3DManager;
  const { viewManager } = designManager;

  const groupRef = useRef<THREE.Group>(null);
  const [scene, setScene] = useState<THREE.Group | null>(null);
  const frameCountRef = useRef(0);

  useEffect(() => {
    let cancelled = false;

    setScene(null);
    meshManager.setSceneGroup(null);
    meshManager.clearModelBounds();
    frameCountRef.current = 0;

    if (!viewManager.glbUrl) return;

    Utils3D.loadGLTF(viewManager.glbUrl).then((loadedScene) => {
      if (cancelled) return;
      setScene(loadedScene);
    }).catch(() => {
      if (cancelled) return;
      setScene(null);
      viewManager.setModelLoaded();
    });

    return () => {
      cancelled = true;
    };
  }, [viewManager.glbUrl]);

  useLayoutEffect(() => {
    if (!scene) return;

    applySceneSettings(scene, levaManager.modelRoughness, levaManager.modelMetalness);

    if (groupRef.current) {
      meshManager.setSceneGroup(groupRef.current);
    }

    // Build the observable node tree from the loaded scene
    meshTreeStore.buildFromScene(scene);
  }, [scene]);

  useFrame(() => {
    if (scene && viewManager.isModelLoading) {
      if (frameCountRef.current < 15) {
        frameCountRef.current++;
        if (frameCountRef.current === 15) {
          viewManager.setModelLoaded();
        }
      }
    }
  });

  useEffect(() => {
    if (!scene) return;
    applySceneSettings(scene, levaManager.modelRoughness, levaManager.modelMetalness);
  }, [scene, levaManager.modelRoughness, levaManager.modelMetalness]);

  useLayoutEffect(() => {
    if (meshManager.sceneGroup) {
      cameraManager.focusCameraTo([meshManager.sceneGroup]);
    }
  }, [cameraManager, meshManager.sceneGroup]);

  if (!scene) return null;

  const handleMeshClick = (e: ThreeEvent<MouseEvent>): void => {
    e.stopPropagation();
    const uuid = e.object.uuid;
    if (meshTreeStore.nodes.has(uuid)) {
      meshTreeStore.selectNode(uuid);
    }
  };

  return (
    <group
      ref={(ref) => {
        (groupRef as React.MutableRefObject<THREE.Group | null>).current = ref;
        if (ref) meshManager.setSceneGroup(ref);
      }}
      onClick={handleMeshClick}
    >
      <primitive object={scene} />
      <CornerLights groupRef={groupRef} />
    </group>
  );
});
