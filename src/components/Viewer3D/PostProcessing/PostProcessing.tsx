import { EffectComposer, N8AO } from '@react-three/postprocessing';
import { observer } from 'mobx-react-lite';
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
      <EffectComposer autoClear={false}>
        {leva.aoEnabled && (
          <N8AO
            aoRadius={leva.aoRadius}
            intensity={leva.aoIntensity}
            distanceFalloff={leva.aoDistanceFalloff}
            screenSpaceRadius={leva.aoScreenSpaceRadius}
            samples={32}
            denoiseRadius={16}
            denoiseSamples={16}
          />
        )}
      </EffectComposer>
    );
  },
);
