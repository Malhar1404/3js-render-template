import { Environment } from '@react-three/drei';
import { useLoader } from '@react-three/fiber';
import { observer } from 'mobx-react-lite';
import * as THREE from 'three';
import { RGBELoader } from 'three-stdlib';

import { useMainContext } from '../../../hooks/useMainContext';

export const Env = observer(() => {
  const defaultTexture = useLoader(RGBELoader, '/env/studio_small_09_2k.hdr');
  const { design3DManager } = useMainContext();
  const leva = design3DManager.levaManager;
  const { envManager } = design3DManager;

  return (
    <Environment background={leva.envVisible}>
      <color attach="background" args={['black']} />
      {leva.envVisible && (
        <mesh rotation={[0, leva.envRotationY, 0]} scale={100}>
          <sphereGeometry />
          <meshBasicMaterial
            transparent
            opacity={leva.envIntensity}
            map={envManager.environmentTexture || defaultTexture}
            side={THREE.BackSide}
            toneMapped={false}
          />
        </mesh>
      )}
    </Environment>
  );
});
