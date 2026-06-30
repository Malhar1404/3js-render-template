import { EffectComposer, N8AO } from '@react-three/postprocessing';
import { observer } from 'mobx-react-lite';

import { useMainContext } from '../../../hooks/useMainContext';

export const PostProcessing = observer(() => {
  const { design3DManager } = useMainContext();
  const leva = design3DManager.levaManager;

  return (
    <EffectComposer autoClear={false} multisampling={4}>
      {leva.aoEnabled && (
        <N8AO
          aoRadius={leva.aoRadius}
          intensity={leva.aoIntensity}
          distanceFalloff={leva.aoDistanceFalloff}
          screenSpaceRadius={leva.aoScreenSpaceRadius}
          aoSamples={32}
          denoiseRadius={20}
          denoiseSamples={20}
          quality='low'
        />
      )}
    </EffectComposer>
  );
});
