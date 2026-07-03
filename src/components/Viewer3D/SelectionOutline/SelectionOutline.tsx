import { observer } from 'mobx-react-lite';
import { useRef } from 'react';
import * as THREE from 'three';

import { useMainContext } from '../../../hooks/useMainContext';
import { MeshSceneNode } from '../../../state/MeshSceneNode';

/**
 * Uses useFrame to sync matrix every frame so the outline always
 * matches the mesh's world position/rotation/scale.
 */
export const SelectionOutline = observer(() => {
  const { design3DManager } = useMainContext();
  const { meshTreeStore } = design3DManager;
  const { selectedNode } = meshTreeStore;

  const outlineRef = useRef<THREE.Mesh>(null);

  // Only render if something is selected AND it is actually a mesh (not a group)
  if (!selectedNode || !(selectedNode instanceof MeshSceneNode)) return null;

  return (
    <mesh
      ref={outlineRef}
      geometry={selectedNode.object3D.geometry}
      // matrixAutoUpdate=false means R3F won't overwrite our matrix each frame
      matrixAutoUpdate={false}
      raycast={()=>{}}
    >
      <meshBasicMaterial
        color="#38bdf8"
        depthTest={false}
        transparent
        opacity={0.85}
        wireframe
      />
    </mesh>
  );
});
