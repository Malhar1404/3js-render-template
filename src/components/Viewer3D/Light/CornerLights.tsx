import { useFrame } from '@react-three/fiber';
import { observer } from 'mobx-react-lite';
import { RefObject, useRef, useState } from 'react';
import * as THREE from 'three';

import { useMainContext } from '../../../hooks/useMainContext';
import { ModelBounds } from '../../../state/ModelBounds';
import { CornerPointLight } from '../Light/CornerPointLight';

type CornerLightsProps = {
  groupRef: RefObject<THREE.Group | null>;
};

type CornerLayout = {
  bounds: ModelBounds;
  positions: Array<{ id: number; position: THREE.Vector3 }>;
};

const buildCornerLayout = (bounds: ModelBounds): CornerLayout => {
  const top = bounds.max.y;

  return {
    bounds,
    positions: [
      {
        id: 1,
        position: new THREE.Vector3(bounds.min.x, top, bounds.max.z),
      },
      {
        id: 2,
        position: new THREE.Vector3(bounds.max.x, top, bounds.max.z),
      },
      {
        id: 3,
        position: new THREE.Vector3(bounds.min.x, top, bounds.min.z),
      },
      {
        id: 4,
        position: new THREE.Vector3(bounds.max.x, top, bounds.min.z),
      },
    ],
  };
};

const boundsKey = (bounds: ModelBounds) =>
  [
    bounds.min.x,
    bounds.min.y,
    bounds.min.z,
    bounds.max.x,
    bounds.max.y,
    bounds.max.z,
    bounds.helperSize,
  ].join('|');

export const CornerLights = observer(({ groupRef }: CornerLightsProps) => {
  const { design3DManager } = useMainContext();
  const leva = design3DManager.levaManager;
  const { meshManager } = design3DManager;
  const [layout, setLayout] = useState<CornerLayout | null>(null);
  const lastBoundsKeyRef = useRef('');

  useFrame(() => {
    const group = groupRef.current;
    if (!group || meshManager.meshInfos.length === 0) return;

    group.updateWorldMatrix(true, true);

    const box = new THREE.Box3().setFromObject(group);
    if (box.isEmpty()) return;

    const size = box.getSize(new THREE.Vector3());
    const maxDimension = Math.max(size.x, size.y, size.z);
    const nextBounds: ModelBounds = {
      helperSize: Math.max(0.25, maxDimension * 0.06),
      max: { x: box.max.x, y: box.max.y, z: box.max.z },
      min: { x: box.min.x, y: box.min.y, z: box.min.z },
    };

    const nextKey = boundsKey(nextBounds);
    if (nextKey === lastBoundsKeyRef.current) return;

    lastBoundsKeyRef.current = nextKey;
    meshManager.setModelBounds(nextBounds);
    setLayout(buildCornerLayout(nextBounds));
  });

  if (!layout) {
    return null;
  }

  return (
    <>
      {leva.cornerLights.map((light) => {
        const corner = layout.positions.find((item) => item.id === light.id);
        if (!corner) return null;

        return (
          <CornerPointLight
            key={`corner-${light.id}`}
            basePosition={corner.position}
            helperSize={layout.bounds.helperSize}
            light={light}
          />
        );
      })}
    </>
  );
});
