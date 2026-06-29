import { MeshProps } from '@react-three/fiber';
import { observer } from 'mobx-react-lite';
import * as THREE from 'three';

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
    return (
      <mesh
        {...meshProps}
        visible={mainMeshVisible}
        castShadow
        receiveShadow
        material={overrideMaterial ?? originalMaterial}
      />
    );
  },
);
