import { observer } from 'mobx-react-lite';
import { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react';
import * as THREE from 'three';

import { useMainContext } from '../../../hooks/useMainContext';
import { Utils3D } from '../../../utils/Utils3D';
import { CornerLights } from '../Light/CornerLights';

/**
 * Traverse the entire GLTF scene and configure every mesh for:
 *  - castShadow / receiveShadow
 *  - roughness + metalness from levaManager
 * Called once on load and whenever leva material props change.
 */
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
  const { meshManager, cameraManager, levaManager } = design3DManager;
  const { viewManager } = designManager;

  const groupRef = useRef<THREE.Group>(null);
  const [scene, setScene] = useState<THREE.Group | null>(null);

  // ─── Load the GLB whenever the URL changes ───────────────────────────────
  useEffect(() => {
    let cancelled = false;

    // Reset scene while new model loads
    setScene(null);
    meshManager.setSceneGroup(null);
    meshManager.clearModelBounds();

    if (!viewManager.glbUrl) return;

    Utils3D.loadGLTF(viewManager.glbUrl).then((loadedScene) => {
      if (cancelled) return;
      setScene(loadedScene);
    }).catch(() => {
      if (cancelled) return;
      setScene(null);
      viewManager.setModelLoaded(); // unblock loading state even on error
    });

    return () => {
      cancelled = true;
    };
  }, [viewManager.glbUrl]); // eslint-disable-line react-hooks/exhaustive-deps

  // ─── Once scene is in state, configure it and register with managers ─────
  useLayoutEffect(() => {
    if (!scene) return;

    // Apply shadow + material settings
    applySceneSettings(scene, levaManager.modelRoughness, levaManager.modelMetalness);

    // Mark the group ref on the manager so CameraManager & CornerLights can use it
    if (groupRef.current) {
      meshManager.setSceneGroup(groupRef.current);
    }

    // Signal loaded — triggers overlay hide + modelLoadKey bump
    viewManager.setModelLoaded();
  }, [scene]); // eslint-disable-line react-hooks/exhaustive-deps

  // ─── Re-apply material settings when leva roughness/metalness changes ────
  useEffect(() => {
    if (!scene) return;
    applySceneSettings(scene, levaManager.modelRoughness, levaManager.modelMetalness);
  }, [scene, levaManager.modelRoughness, levaManager.modelMetalness]);

  // ─── Auto-focus camera once the group ref is ready ───────────────────────
  useLayoutEffect(() => {
    if (meshManager.sceneGroup) {
      cameraManager.focusCameraTo([meshManager.sceneGroup]);
    }
  }, [cameraManager, meshManager.sceneGroup]);

  // ─── Nothing to render while loading ─────────────────────────────────────
  if (!scene) return null;

  return (
    <group
      ref={(ref) => {
        (groupRef as React.MutableRefObject<THREE.Group | null>).current = ref;
        if (ref) meshManager.setSceneGroup(ref);
      }}
    >
      {/* Render the full GLB scene graph — preserves all parent transforms */}
      <primitive object={scene} />
      {/* Corner point lights positioned at bounding-box corners */}
      <CornerLights groupRef={groupRef} />
    </group>
  );
});
