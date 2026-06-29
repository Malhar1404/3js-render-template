import { MeshProps, useFrame } from '@react-three/fiber';
import { observer } from 'mobx-react-lite';
import { useEffect } from 'react';
import * as THREE from 'three';

import { useMainContext } from '../../../hooks/useMainContext';

export const SingleMesh = observer(
  (
    props: MeshProps & {
      ukey: string;
      mainMeshVisible: boolean;
      overrideMaterial?: THREE.Material;
      originalMaterial: THREE.Material;
    },
  ) => {
    const { mainMeshVisible, overrideMaterial, originalMaterial, ukey: _u, ...meshProps } = props;
    const { design3DManager } = useMainContext();
    const leva = design3DManager.levaManager;

    const mat = (overrideMaterial ?? originalMaterial) as THREE.MeshStandardMaterial;

    useEffect(() => {
      if (!mat || !('metalness' in mat)) return;
      mat.metalness = leva.modelMetalness;
      mat.roughness = leva.modelRoughness;
      mat.needsUpdate = true;
    }, [mat, leva.modelMetalness, leva.modelRoughness]);

    return (
      <mesh
        {...meshProps}
        visible={mainMeshVisible}
        castShadow
        receiveShadow
        material={mat}
      />
    );
  },
);
