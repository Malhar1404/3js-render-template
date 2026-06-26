import { observer } from 'mobx-react-lite';
import { useEffect, useMemo } from 'react';
import * as THREE from 'three';

import { MeshInfo } from '../../../core/MeshInfo';
import { useClick } from '../../../hooks/useClick';
import { useMainContext } from '../../../hooks/useMainContext';
import { Logger } from '../../../utils/Logger';
import { SingleMesh } from '../SingleMesh/SingleMesh';

const MATERIAL_MAP = {
  MeshStandardMaterial: THREE.MeshStandardMaterial,
  MeshPhysicalMaterial: THREE.MeshPhysicalMaterial,
  MeshToonMaterial: THREE.MeshToonMaterial,
  MeshLambertMaterial: THREE.MeshLambertMaterial,
  MeshPhongMaterial: THREE.MeshPhongMaterial,
} as const;

export const MeshView = observer(({ meshInfo }: { meshInfo: MeshInfo }) => {
  const mesh = meshInfo.item;
  const { design3DManager } = useMainContext();
  const leva = design3DManager.levaManager;

  const sampleMaterial = Array.isArray(mesh.material)
    ? mesh.material[0]
    : mesh.material;
  const overrideMaterial = useMemo(() => {
    const material = new MATERIAL_MAP[leva.materialType]() as any;

    if (sampleMaterial?.envMap && 'envMap' in material) {
      material.envMap = sampleMaterial.envMap;
      material.envMapIntensity = leva.materialEnvMapIntensity;
    }

    if (sampleMaterial?.map && 'map' in material) {
      material.map = sampleMaterial.map;
    }

    return material;
    // rebuild only when material type or source env map changes
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [leva.materialType, sampleMaterial]);

  useEffect(() => {
    overrideMaterial.color?.set(leva.materialColor);
    if ('roughness' in overrideMaterial)
      overrideMaterial.roughness = leva.materialRoughness;
    if ('metalness' in overrideMaterial)
      overrideMaterial.metalness = leva.materialMetalness;
    if ('emissive' in overrideMaterial)
      overrideMaterial.emissive?.set(leva.materialEmissive);
    if ('emissiveIntensity' in overrideMaterial)
      overrideMaterial.emissiveIntensity = leva.materialEmissiveIntensity;
    if ('envMapIntensity' in overrideMaterial)
      overrideMaterial.envMapIntensity = leva.materialEnvMapIntensity;
    overrideMaterial.opacity = leva.materialOpacity;
    overrideMaterial.transparent = leva.materialOpacity < 1;
    overrideMaterial.wireframe = leva.materialWireframe;
    overrideMaterial.needsUpdate = true;
  }, [
    overrideMaterial,
    leva.materialColor,
    leva.materialRoughness,
    leva.materialMetalness,
    leva.materialEmissive,
    leva.materialEmissiveIntensity,
    leva.materialEnvMapIntensity,
    leva.materialOpacity,
    leva.materialWireframe,
  ]);

  useEffect(() => {
    return () => {
      overrideMaterial.dispose();
    };
  }, [overrideMaterial]);

  const handler = useClick({
    isSelectable: true,
    onHoverStateChanged: (hovered) => {
      Logger.log(`${mesh.name} hovered: ${hovered}`);
    },
    onSelected: () => {
      Logger.log(`${mesh.name} clicked`);
    },
  });

  return (
    <group {...handler.listeners}>
      <SingleMesh
        ukey={mesh.name}
        geometry={mesh.geometry}
        position={mesh.position}
        rotation={mesh.rotation}
        scale={mesh.scale}
        mainMeshVisible={meshInfo.isVisible}
        overrideMaterial={
          leva.materialOverrideEnabled ? overrideMaterial : undefined
        }
        originalMaterial={mesh.material as THREE.Material}
      />
    </group>
  );
});
