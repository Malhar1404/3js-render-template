import { EffectComposer, N8AO, Outline } from '@react-three/postprocessing';
import { observer } from 'mobx-react-lite';
import { KernelSize } from 'postprocessing';
import { useMemo } from 'react';
import * as THREE from 'three';

import { useMainContext } from '../../../hooks/useMainContext';

export const PostProcessing = observer(
  ({ outlineSelection }: { outlineSelection: THREE.Object3D | null }) => {
    const { design3DManager } = useMainContext();
    const leva = design3DManager.levaManager;
    const selection = useMemo(
      () => (outlineSelection ? [outlineSelection] : []),
      [outlineSelection],
    );

    if (!leva.aoEnabled && selection.length === 0) return null;

    return (
      <EffectComposer autoClear={false} multisampling={4}>
        {leva.aoEnabled && (
          <N8AO
            key={`n8ao-${leva.aoSamples}-${leva.aoRadius}-${leva.aoIntensity}`}
            aoRadius={leva.aoRadius}
            intensity={leva.aoIntensity}
            distanceFalloff={leva.aoDistanceFalloff}
            screenSpaceRadius={leva.aoScreenSpaceRadius}
            samples={leva.aoSamples}
          />
        )}
        <Outline
          blur={false}
          edgeStrength={10}
          hiddenEdgeColor={0xff00ff}
          kernelSize={KernelSize.VERY_SMALL}
          selection={selection}
          visibleEdgeColor={0xffffff}
          xRay
        />
      </EffectComposer>
    );
  },
);
