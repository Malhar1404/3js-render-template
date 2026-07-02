import { useThree } from '@react-three/fiber';
import { observer } from 'mobx-react-lite';
import { useEffect, useRef } from 'react';
import * as THREE from 'three';

import { useMainContext } from '../../../hooks/useMainContext';

export const Light = observer(() => {
  const { design3DManager } = useMainContext();
  const leva = design3DManager.levaManager;

  const dirRef = useRef<THREE.DirectionalLight | null>(null);
  const helperRef = useRef<THREE.DirectionalLightHelper | null>(null);
  const { scene } = useThree();

  const directionalLightRefs = useRef(
    new Map<number, THREE.DirectionalLight>(),
  );
  const directionalHelpers = useRef(
    new Map<number, THREE.DirectionalLightHelper>(),
  );

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
    } else if (helperRef.current) {
      helperRef.current.visible = false;
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
      directionalHelpers.current.forEach((h) => {
        scene.remove(h);
      });
      directionalHelpers.current.clear();
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
    </>
  );
});
