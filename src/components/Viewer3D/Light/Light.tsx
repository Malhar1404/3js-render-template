import { observer } from 'mobx-react-lite';

import { useMainContext } from '../../../hooks/useMainContext';

export const Light = observer(() => {
  const { design3DManager } = useMainContext();
  const leva = design3DManager.levaManager;

  return (
    <>
      <ambientLight intensity={leva.ambientIntensity} />
      {leva.dirLightEnabled && (
        <directionalLight
          color={leva.dirLightColor}
          intensity={leva.dirLightIntensity}
          position={[leva.dirLightX, leva.dirLightY, leva.dirLightZ]}
          castShadow
        />
      )}
    </>
  );
});
