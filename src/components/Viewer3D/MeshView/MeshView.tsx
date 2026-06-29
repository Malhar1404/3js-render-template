import { observer } from 'mobx-react-lite';
import * as THREE from 'three';

import { MeshInfo } from '../../../core/MeshInfo';
import { useClick } from '../../../hooks/useClick';
import { Logger } from '../../../utils/Logger';
import { SingleMesh } from '../SingleMesh/SingleMesh';

export const MeshView = observer(({ meshInfo }: { meshInfo: MeshInfo }) => {
  const mesh = meshInfo.item;
  // material override removed; use original materials

  const handler = useClick({
    isSelectable: true,
    onHoverStateChanged: (hovered) => {
      Logger.log(`${mesh.name} hovered: ${hovered}`);
    },
    onSelected: () => {
      Logger.log(`${mesh.name} clicked`);
    },
  });

  return (
    <group {...handler.listeners}>
      <SingleMesh
        ukey={mesh.name}
        geometry={mesh.geometry}
        position={mesh.position}
        rotation={mesh.rotation}
        scale={mesh.scale}
        mainMeshVisible={meshInfo.isVisible}
        overrideMaterial={undefined}
        originalMaterial={mesh.material as THREE.Material}
      />
    </group>
  );
});
