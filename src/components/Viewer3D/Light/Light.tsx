import { useThree } from '@react-three/fiber';
import { observer } from 'mobx-react-lite';
import { useEffect, useMemo, useRef } from 'react';
import * as THREE from 'three';

import { useMainContext } from '../../../hooks/useMainContext';

export const Light = observer(() => {
  const { design3DManager } = useMainContext();
  const leva = design3DManager.levaManager;
  const meshGroup = design3DManager.meshManager.groupRef;
  const meshCount = design3DManager.meshManager.meshInfos.length;

  const dirRef = useRef<THREE.DirectionalLight | null>(null);
  const helperRef = useRef<THREE.DirectionalLightHelper | null>(null);
  const { scene } = useThree();

  const directionalLightRefs = useRef(new Map<number, THREE.DirectionalLight>());
  const cornerLightRefs = useRef(new Map<number, THREE.PointLight>());
  const directionalHelpers = useRef(new Map<number, THREE.DirectionalLightHelper>());
  const cornerHelpers = useRef(new Map<number, THREE.PointLightHelper>());

  const modelBounds = useMemo(() => {
    if (!meshGroup) return null;

    meshGroup.updateWorldMatrix(true, true);

    const bounds = new THREE.Box3().setFromObject(meshGroup);
    if (bounds.isEmpty()) return null;

    const size = bounds.getSize(new THREE.Vector3());
    const maxDimension = Math.max(size.x, size.y, size.z);

    return {
      bounds,
      helperSize: Math.max(0.25, maxDimension * 0.06),
    };
  }, [meshGroup, meshCount]);

  const cornerLightPositions = useMemo(() => {
    if (!modelBounds) return [];

    const { bounds } = modelBounds;
    const top = bounds.max.y;

    return [
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
    ];
  }, [modelBounds]);

  // Create / show / hide helper based on leva flags and update when position changes
  useEffect(() => {
    if (!dirRef.current) return;

    if (leva.dirLightEnabled && leva.dirLightHelper) {
      if (!helperRef.current) {
        helperRef.current = new THREE.DirectionalLightHelper(
          dirRef.current,
          1,
          0xffff00,
        );
        scene.add(helperRef.current);
      } else {
        helperRef.current.visible = true;
      }
      helperRef.current.update();
    } else {
      if (helperRef.current) helperRef.current.visible = false;
    }
  }, [
    leva.dirLightEnabled,
    leva.dirLightHelper,
    leva.dirLightX,
    leva.dirLightY,
    leva.dirLightZ,
    scene,
  ]);

  // Cleanup helper on unmount
  useEffect(() => {
    return () => {
      if (helperRef.current) {
        scene.remove(helperRef.current);
        helperRef.current = null;
      }
      // remove all dynamic helpers
      directionalHelpers.current.forEach((h) => {
        scene.remove(h);
      });
      directionalHelpers.current.clear();
      cornerHelpers.current.forEach((h) => {
        scene.remove(h);
      });
      cornerHelpers.current.clear();
    };
  }, [scene]);

  // Manage helpers for dynamic directional lights
  useEffect(() => {
    const existingIds = new Set(directionalHelpers.current.keys());

    leva.directionalLights.forEach((l) => {
      const light = directionalLightRefs.current.get(l.id);
      if (!light) return;

      let helper = directionalHelpers.current.get(l.id);
      if (l.helper && l.enabled) {
        if (!helper) {
          helper = new THREE.DirectionalLightHelper(light, 1, 0xffff00);
          directionalHelpers.current.set(l.id, helper);
          scene.add(helper);
        } else {
          helper.visible = true;
        }
        helper.update();
      } else if (helper) {
        helper.visible = false;
      }

      existingIds.delete(l.id);
    });

    existingIds.forEach((id) => {
      const h = directionalHelpers.current.get(id);
      if (h) {
        scene.remove(h);
        directionalHelpers.current.delete(id);
      }
    });
  }, [leva.directionalLights, scene]);

  // Manage helpers for the four corner lights
  useEffect(() => {
    if (!modelBounds) {
      cornerHelpers.current.forEach((helper) => scene.remove(helper));
      cornerHelpers.current.clear();
      return;
    }

    const lightById = new Map(
      cornerLightPositions.map((corner) => [corner.id, corner.position]),
    );

    const existingIds = new Set(cornerHelpers.current.keys());

    leva.cornerLights.forEach((light) => {
      const lightRef = cornerLightRefs.current.get(light.id);
      const basePosition = lightById.get(light.id);

      if (!lightRef || !basePosition) return;

      const finalPosition = basePosition
        .clone()
        .add(new THREE.Vector3(light.offsetX, light.offsetY, light.offsetZ));

      lightRef.position.copy(finalPosition);
      lightRef.intensity = light.enabled ? light.intensity : 0;

      let helper = cornerHelpers.current.get(light.id);
      if (light.enabled && light.helper) {
        if (!helper) {
          helper = new THREE.PointLightHelper(
            lightRef,
            modelBounds.helperSize,
            0xffb84d,
          );
          cornerHelpers.current.set(light.id, helper);
          scene.add(helper);
        } else {
          helper.visible = true;
        }
        helper.update();
      } else if (helper) {
        helper.visible = false;
      }

      existingIds.delete(light.id);
    });

    existingIds.forEach((id) => {
      const helper = cornerHelpers.current.get(id);
      if (helper) {
        scene.remove(helper);
        cornerHelpers.current.delete(id);
      }
    });
  }, [cornerLightPositions, leva.cornerLights, modelBounds, scene]);

  return (
    <>
      <ambientLight intensity={leva.ambientIntensity} />
      {leva.dirLightEnabled && (
        <directionalLight
          ref={dirRef}
          color={leva.dirLightColor}
          intensity={leva.dirLightIntensity}
          position={[leva.dirLightX, leva.dirLightY, leva.dirLightZ]}
          castShadow
        />
      )}

      {leva.directionalLights.map((l) => (
        <directionalLight
          key={`dyn-${l.id}`}
          ref={(r) => {
            if (r) directionalLightRefs.current.set(l.id, r);
            else directionalLightRefs.current.delete(l.id);
          }}
          color={l.color}
          intensity={l.intensity}
          position={[l.x, l.y, l.z]}
          visible={l.enabled}
          castShadow
        />
      ))}

      {modelBounds &&
        leva.cornerLights.map((light) => {
          const corner = cornerLightPositions.find((item) => item.id === light.id);
          if (!corner) return null;

          const finalPosition = corner.position
            .clone()
            .add(new THREE.Vector3(light.offsetX, light.offsetY, light.offsetZ));

          return (
            <pointLight
              key={`corner-${light.id}`}
              ref={(ref) => {
                if (ref) cornerLightRefs.current.set(light.id, ref);
                else cornerLightRefs.current.delete(light.id);
              }}
              color="#ffffff"
              intensity={light.enabled ? light.intensity : 0}
              position={finalPosition.toArray()}
              visible={light.enabled}
            />
          );
        })}
    </>
  );
});
