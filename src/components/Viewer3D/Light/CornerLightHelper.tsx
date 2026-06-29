import { useFrame } from '@react-three/fiber';
import { useEffect, useMemo } from 'react';
import * as THREE from 'three';

type CornerLightHelperProps = {
  helperSize: number;
  light: THREE.PointLight;
};

export const CornerLightHelper = ({
  light,
  helperSize,
}: CornerLightHelperProps) => {
  const helper = useMemo(
    () => new THREE.PointLightHelper(light, helperSize, 0xffb84d),
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
