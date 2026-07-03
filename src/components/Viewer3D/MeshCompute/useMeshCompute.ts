import { ThreeEvent, useFrame, useThree } from '@react-three/fiber';
import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import * as THREE from 'three';

import { useMainContext } from '../../../hooks/useMainContext';
import { Utils3D } from '../../../utils/Utils3D';

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

export function useMeshCompute() {
  const { design3DManager, designManager } = useMainContext();
  const { meshManager, cameraManager, meshTreeStore } = design3DManager;
  const { viewManager } = designManager;

  const groupRef = useRef<THREE.Group>(null);
  const [scene, setScene] = useState<THREE.Group | null>(null);
  const frameCountRef = useRef(0);

  // 1. Load GLTF model when the URL changes
  useEffect(() => {
    let cancelled = false;

    setScene(null);
    meshManager.setSceneGroup(null);
    meshManager.clearModelBounds();
    frameCountRef.current = 0;

    if (!viewManager.glbUrl) return;

    Utils3D.loadGLTF(viewManager.glbUrl)
      .then((loadedScene) => {
        if (cancelled) return;
        setScene(loadedScene);
      })
      .catch(() => {
        if (cancelled) return;
        setScene(null);
        viewManager.setModelLoaded();
      });

    return () => {
      cancelled = true;
    };
  }, [viewManager.glbUrl, meshManager, viewManager]);

  // 2. Build tree and apply initial scene settings
  useLayoutEffect(() => {
    if (!scene) return;

    // Hardcoded model settings: roughness = 0.39, metalness = 0.12
    applySceneSettings(scene, 0.39, 0.12);

    if (groupRef.current) {
      meshManager.setSceneGroup(groupRef.current);
    }

    // Build the observable node tree from the loaded scene
    meshTreeStore.buildFromScene(scene);
  }, [scene, meshManager, meshTreeStore]);

  // 3. Render-loop frame counter for loading complete transition
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

  // 4. Focus camera to scene group when it is set
  useLayoutEffect(() => {
    if (meshManager.sceneGroup) {
      cameraManager.focusCameraTo([meshManager.sceneGroup]);
    }
  }, [cameraManager, meshManager.sceneGroup]);

  // 5. Canvas click/double-click and drag detection
  const { gl, camera } = useThree();

  useEffect(() => {
    const dom = gl.domElement;
    let downX = 0;
    let downY = 0;

    const handlePointerDown = (e: PointerEvent) => {
      downX = e.clientX;
      downY = e.clientY;
    };

    const handleNativeClick = (e: MouseEvent) => {
      const dist = Math.hypot(e.clientX - downX, e.clientY - downY);
      if (dist > 5) return; // User dragged (e.g. rotated camera)

      const rect = dom.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      const y = -((e.clientY - rect.top) / rect.height) * 2 + 1;

      const raycaster = new THREE.Raycaster();
      raycaster.setFromCamera(new THREE.Vector2(x, y), camera);

      if (meshManager.sceneGroup) {
        const intersects = raycaster.intersectObjects(meshManager.sceneGroup.children, true);
        const hitMesh = intersects.find(
          (intersect) =>
            intersect.object instanceof THREE.Mesh &&
            intersect.object.type !== 'LineSegments'
        );
        if (hitMesh) return; // Clicked a mesh, let handleMeshClick handle it
      }

      // Single click on empty canvas -> deselect mesh
      meshTreeStore.selectNode(null);
    };

    const handleNativeDblClick = (e: MouseEvent) => {
      const dist = Math.hypot(e.clientX - downX, e.clientY - downY);
      if (dist > 5) return; // User dragged

      const rect = dom.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      const y = -((e.clientY - rect.top) / rect.height) * 2 + 1;

      const raycaster = new THREE.Raycaster();
      raycaster.setFromCamera(new THREE.Vector2(x, y), camera);

      if (meshManager.sceneGroup) {
        const intersects = raycaster.intersectObjects(meshManager.sceneGroup.children, true);
        const hitMesh = intersects.find(
          (intersect) =>
            intersect.object instanceof THREE.Mesh &&
            intersect.object.type !== 'LineSegments'
        );
        if (hitMesh) return; // Double clicked a mesh, ignore
      }

      // Double click on empty canvas -> focus entire model
      if (meshManager.sceneGroup) {
        cameraManager.focusCameraTo([meshManager.sceneGroup]);
      }
    };

    dom.addEventListener('pointerdown', handlePointerDown);
    dom.addEventListener('click', handleNativeClick);
    dom.addEventListener('dblclick', handleNativeDblClick);

    return () => {
      dom.removeEventListener('pointerdown', handlePointerDown);
      dom.removeEventListener('click', handleNativeClick);
      dom.removeEventListener('dblclick', handleNativeDblClick);
    };
  }, [gl, camera, meshManager, cameraManager, meshTreeStore]);

  // 6. Mesh click handling
  const handleMeshClick = (e: ThreeEvent<MouseEvent>): void => {
    e.stopPropagation();

    const uuid = e.object.uuid;
    if (meshTreeStore.nodes.has(uuid)) {
      if (meshTreeStore.selectedId === uuid) {
        meshTreeStore.selectNode(null);
      } else {
        meshTreeStore.selectNode(uuid);
      }
    }
  };

  return {
    scene,
    groupRef,
    handleMeshClick,
  };
}
