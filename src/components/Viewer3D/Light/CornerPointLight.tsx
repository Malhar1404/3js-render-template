import { observer } from 'mobx-react-lite';
import { useState } from 'react';
import * as THREE from 'three';

import { CornerLight } from '../../../state/CornerLight';
import { CornerLightHelper } from './CornerLightHelper';

type CornerPointLightProps = {
  basePosition: THREE.Vector3;
  helperSize: number;
  light: CornerLight;
};

export const CornerPointLight = observer(
  ({ light, basePosition, helperSize }: CornerPointLightProps) => {
    const [pointLight, setPointLight] = useState<THREE.PointLight | null>(null);

    const position: [number, number, number] = [
      basePosition.x + light.offsetX,
      basePosition.y + light.offsetY,
      basePosition.z + light.offsetZ,
    ];
    const intensity = light.enabled ? light.intensity : 0;

    return (
      <>
        <pointLight
          ref={setPointLight}
          color="#ffffff"
          decay={0}
          distance={0}
          intensity={intensity}
          position={position}
          visible={light.enabled}
        />
        {pointLight && light.enabled && light.helper && (
          <CornerLightHelper helperSize={helperSize} light={pointLight} />
        )}
      </>
    );
  },
);
