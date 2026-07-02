import { useFrame } from '@react-three/fiber';
import { useEffect, useMemo } from 'react';
import * as THREE from 'three';

import { CornerLightHelperProps } from '../../../types';

export const CornerLightHelper = ({
  light,
  helperSize,
}: CornerLightHelperProps) => {
  const helper = useMemo(
    () => new THREE.DirectionalLightHelper(light, helperSize, 0xffb84d),
    [helperSize, light],
  );

  useEffect(() => {
    return () => {
      helper.dispose();
    };
  }, [helper]);

  useFrame(() => {
    helper.update();
  });

  return <primitive object={helper} />;
};
