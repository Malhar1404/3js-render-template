import { observer } from 'mobx-react-lite';
import { useMemo } from 'react';
import * as THREE from 'three';

import { useMainContext } from '../../../hooks/useMainContext';

export const GroundPlane = observer(() => {
  const { design3DManager } = useMainContext();
  const leva = design3DManager.levaManager;

  const color = useMemo(
    () => new THREE.Color(leva.planeColor),
    [leva.planeColor],
  );

  if (!leva.planeEnabled) return null;

  return (
    <mesh
      rotation={[-Math.PI / 2, 0, 0]}
      position={[0, leva.planeY, 0]}
      receiveShadow={leva.planeReceiveShadow}>
      <planeGeometry args={[leva.planeSize, leva.planeSize]} />
      <meshStandardMaterial color={color} />
    </mesh>
  );
});
