import { EffectComposer, N8AO } from '@react-three/postprocessing';
import { observer } from 'mobx-react-lite';

export const PostProcessing = observer(() => {
  return (
    <EffectComposer autoClear={false} multisampling={4}>
      <N8AO
        aoRadius={2.97}
        intensity={4.2}
        distanceFalloff={2.31}
        screenSpaceRadius={false}
        aoSamples={32}
        denoiseRadius={20}
        denoiseSamples={20}
        quality="low"
      />
    </EffectComposer>
  );
});
