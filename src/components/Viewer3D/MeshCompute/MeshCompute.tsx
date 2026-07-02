import { observer } from 'mobx-react-lite';
import * as THREE from 'three';

import { useMainContext } from '../../../hooks/useMainContext';
import { CornerLights } from '../Light/CornerLights';
import { useMeshCompute } from './useMeshCompute';

export const MeshCompute = observer(() => {
  const { design3DManager } = useMainContext();
  const { meshManager } = design3DManager;
  const { scene, groupRef, handleMeshClick } = useMeshCompute();

  if (!scene) return null;

  return (
    <group
      ref={(ref) => {
        (groupRef as React.MutableRefObject<THREE.Group | null>).current = ref;
        if (ref) meshManager.setSceneGroup(ref);
      }}
      onClick={handleMeshClick}>
      <primitive object={scene} />
      <CornerLights groupRef={groupRef} />
    </group>
  );
});
