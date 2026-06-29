import { observer } from 'mobx-react-lite';
import { useCallback, useLayoutEffect, useRef } from 'react';
import * as THREE from 'three';

import { useMainContext } from '../../../hooks/useMainContext';
import { useMeshParser } from '../../../hooks/useMeshParser';
import { CornerLights } from '../Light/CornerLights';
import { MeshView } from '../MeshView/MeshView';

export const MeshCompute = observer(() => {
  const { design3DManager, designManager } = useMainContext();
  const { meshManager, cameraManager } = design3DManager;
  const { viewManager } = designManager;
  const groupRef = useRef<THREE.Group>(null);

  const onLoaded = useCallback(() => {
    viewManager.setModelLoaded();
  }, [viewManager]);

  const { isLoaded, meshInfo } = useMeshParser(viewManager.glbUrl, onLoaded);

  useLayoutEffect(() => {
    if (isLoaded) {
      meshManager.setMeshInfos(meshInfo);
      return;
    }
    meshManager.setMeshInfos([]);
    meshManager.clearModelBounds();
  }, [isLoaded, meshInfo, meshManager]);

  useLayoutEffect(() => {
    if (meshManager.groupRef) {
      cameraManager.focusCameraTo([meshManager.groupRef]);
    }
  }, [cameraManager, meshManager.groupRef, meshManager.meshInfos.length]);

  if (!isLoaded) return null;

  return (
    <group
      ref={(ref) => {
        groupRef.current = ref;
        if (ref) meshManager.setGroupRef(ref);
      }}>
      {meshManager.meshInfos.map((mesh) => (
        <MeshView key={mesh.name} meshInfo={mesh} />
      ))}
      <CornerLights groupRef={groupRef} />
    </group>
  );
});
