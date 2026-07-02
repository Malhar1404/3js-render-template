import { useThree } from '@react-three/fiber';
import { observer } from 'mobx-react-lite';
import { useEffect, useRef } from 'react';
import * as THREE from 'three';

import { CornerLight } from '../../../state/CornerLight';
import { CornerPointLightProps } from '../../../types';
import { CornerLightHelper } from './CornerLightHelper';

export const CornerPointLight = observer(
  ({ light, basePosition, center, helperSize }: CornerPointLightProps) => {
    const lightRef = useRef<THREE.DirectionalLight>(null);
    const { scene } = useThree();

    const position: [number, number, number] = [
      basePosition.x + light.offsetX,
      basePosition.y + light.offsetY,
      basePosition.z + light.offsetZ,
    ];
    const intensity = light.enabled ? light.intensity : 0;

    useEffect(() => {
      const dl = lightRef.current;
      if (!dl) return;
      scene.add(dl.target);
      return () => {
        scene.remove(dl.target);
      };
    }, [scene]);

    useEffect(() => {
      const dl = lightRef.current;
      if (!dl) return;
      dl.target.position.copy(center);
      dl.target.updateMatrixWorld();
    }, [center]);

    return (
      <>
        <directionalLight
          ref={lightRef}
          color="#ffffff"
          intensity={intensity}
          position={position}
          visible={light.enabled}
          castShadow
          shadow-mapSize={[512, 512]}
          shadow-bias={-0.0005}
        />
        {lightRef.current && light.enabled && light.helper && (
          <CornerLightHelper helperSize={helperSize} light={lightRef.current} />
        )}
      </>
    );
  },
);
