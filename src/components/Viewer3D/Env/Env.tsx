import { useLoader, useThree } from '@react-three/fiber';
import { observer } from 'mobx-react-lite';
import { useEffect, useMemo } from 'react';
import * as THREE from 'three';
import { RGBELoader } from 'three-stdlib';

import { useMainContext } from '../../../hooks/useMainContext';

export const Env = observer(() => {
  const defaultTexture = useLoader(RGBELoader, '/env/pretoria_gardens_1k.hdr');
  const { design3DManager } = useMainContext();
  const leva = design3DManager.levaManager;
  const { envManager } = design3DManager;
  const { scene } = useThree();

  const envVisible = leva.envVisible;
  const envIntensity = leva.envIntensity;
  const envRotationY = leva.envRotationY;

  const texture = useMemo(() => {
    const chosenTexture = envManager.environmentTexture || defaultTexture;
    if (chosenTexture) {
      chosenTexture.mapping = THREE.EquirectangularReflectionMapping;
      chosenTexture.encoding = THREE.RGBEEncoding;
    }
    return chosenTexture;
  }, [envManager.environmentTexture, defaultTexture]);

  useEffect(() => {
    if (texture) {
      texture.rotation = envRotationY;
    }

    scene.environment = texture;
    scene.background = envVisible ? texture : null;

    if ('environmentIntensity' in scene) {
      (scene as any).environmentIntensity = envIntensity;
    }
    if ('environmentRotation' in scene) {
      (scene as any).environmentRotation.set(0, envRotationY, 0);
    }
    if ('backgroundRotation' in scene) {
      (scene as any).backgroundRotation.set(0, envRotationY, 0);
    }

    return () => {
      scene.environment = null;
      scene.background = null;
    };
  }, [scene, texture, envVisible, envIntensity, envRotationY]);

  return null;
});
