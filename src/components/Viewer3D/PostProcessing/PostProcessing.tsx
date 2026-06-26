import { EffectComposer, N8AO } from '@react-three/postprocessing';
import { observer } from 'mobx-react-lite';

import { useMainContext } from '../../../hooks/useMainContext';

export const PostProcessing = observer(() => {
  const { design3DManager } = useMainContext();
  const leva = design3DManager.levaManager;

  if (!leva.aoEnabled) return null;

  return (
    <EffectComposer multisampling={4}>
      <N8AO
        key={`n8ao-${leva.aoSamples}-${leva.aoRadius}-${leva.aoIntensity}`}
        aoRadius={leva.aoRadius}
        intensity={leva.aoIntensity}
        distanceFalloff={leva.aoDistanceFalloff}
        screenSpaceRadius={leva.aoScreenSpaceRadius}
        samples={leva.aoSamples}
      />
    </EffectComposer>
  );
});
