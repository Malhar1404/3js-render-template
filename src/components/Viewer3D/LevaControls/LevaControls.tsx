import { folder, Leva, useControls } from 'leva';
import { observer } from 'mobx-react-lite';
import { useEffect } from 'react';

import { useMainContext } from '../../../hooks/useMainContext';

export const LevaControls = observer(() => {
  const { design3DManager } = useMainContext();
  const leva = design3DManager.levaManager;

  // ── Ambient Occlusion ─────────────────────────────────────
  const ao = useControls('Ambient Occlusion (N8AO)', {
    aoEnabled: { value: leva.aoEnabled, label: 'Enabled' },
    aoRadius: {
      value: leva.aoRadius,
      min: 0.01,
      max: 5,
      step: 0.01,
      label: 'Radius',
    },
    aoIntensity: {
      value: leva.aoIntensity,
      min: 0,
      max: 20,
      step: 0.1,
      label: 'Intensity',
    },
    aoDistanceFalloff: {
      value: leva.aoDistanceFalloff,
      min: 0,
      max: 5,
      step: 0.01,
      label: 'Distance Falloff',
    },
    aoScreenSpaceRadius: {
      value: leva.aoScreenSpaceRadius,
      label: 'Screen Space Radius',
    },
    aoSamples: {
      value: leva.aoSamples,
      min: 1,
      max: 32,
      step: 1,
      label: 'Samples',
    },
  });

  // ── Contact Shadows ───────────────────────────────────────
  const shadows = useControls('Contact Shadows', {
    contactShadowsEnabled: {
      value: leva.contactShadowsEnabled,
      label: 'Enabled',
    },
    contactShadowsOpacity: {
      value: leva.contactShadowsOpacity,
      min: 0,
      max: 1,
      step: 0.01,
      label: 'Opacity',
    },
    contactShadowsScale: {
      value: leva.contactShadowsScale,
      min: 1,
      max: 1000,
      step: 0.5,
      label: 'Scale',
    },
    contactShadowsBlur: {
      value: leva.contactShadowsBlur,
      min: 0,
      max: 10,
      step: 0.1,
      label: 'Blur',
    },
    contactShadowsFar: {
      value: leva.contactShadowsFar,
      min: 0.1,
      max: 50,
      step: 0.1,
      label: 'Far',
    },
    contactShadowsPositionY: {
      value: leva.contactShadowsPositionY,
      min: -2,
      max: 2,
      step: 0.001,
      label: 'Position Y',
    },
  });

  // ── Environment ───────────────────────────────────────────
  const env = useControls('Environment', {
    envVisible: { value: leva.envVisible, label: 'Show Background' },
    envIntensity: {
      value: leva.envIntensity,
      min: 0,
      max: 5,
      step: 0.01,
      label: 'Intensity',
    },
    envRotationY: {
      value: leva.envRotationY,
      min: -Math.PI,
      max: Math.PI,
      step: 0.01,
      label: 'Rotation Y',
    },
  });

  // ── Lights ────────────────────────────────────────────────
  const lights = useControls('Lights', {
    ambientIntensity: {
      value: leva.ambientIntensity,
      min: 0,
      max: 5,
      step: 0.01,
      label: 'Ambient Intensity',
    },
    directional: folder({
      dirLightEnabled: { value: leva.dirLightEnabled, label: 'Enabled' },
      dirLightColor: { value: leva.dirLightColor, label: 'Color' },
      dirLightIntensity: {
        value: leva.dirLightIntensity,
        min: 0,
        max: 10,
        step: 0.1,
        label: 'Intensity',
      },
      dirLightX: {
        value: leva.dirLightX,
        min: -20,
        max: 20,
        step: 0.1,
        label: 'X',
      },
      dirLightY: {
        value: leva.dirLightY,
        min: -20,
        max: 20,
        step: 0.1,
        label: 'Y',
      },
      dirLightZ: {
        value: leva.dirLightZ,
        min: -20,
        max: 20,
        step: 0.1,
        label: 'Z',
      },
    }),
  });

  // ── Material Override ─────────────────────────────────────
  const material = useControls('Material Override', {
    materialOverrideEnabled: {
      value: leva.materialOverrideEnabled,
      label: 'Enabled',
    },
    materialType: {
      value: leva.materialType,
      options: [
        'MeshStandardMaterial',
        'MeshPhysicalMaterial',
        'MeshToonMaterial',
        'MeshLambertMaterial',
        'MeshPhongMaterial',
      ],
      label: 'Type',
    },
    materialColor: { value: leva.materialColor, label: 'Color' },
    materialRoughness: {
      value: leva.materialRoughness,
      min: 0,
      max: 1,
      step: 0.01,
      label: 'Roughness',
    },
    materialMetalness: {
      value: leva.materialMetalness,
      min: 0,
      max: 1,
      step: 0.01,
      label: 'Metalness',
    },
    materialEmissive: { value: leva.materialEmissive, label: 'Emissive' },
    materialEmissiveIntensity: {
      value: leva.materialEmissiveIntensity,
      min: 0,
      max: 5,
      step: 0.01,
      label: 'Emissive Intensity',
    },
    materialEnvMapIntensity: {
      value: leva.materialEnvMapIntensity,
      min: 0,
      max: 5,
      step: 0.01,
      label: 'Env Map Intensity',
    },
    materialOpacity: {
      value: leva.materialOpacity,
      min: 0,
      max: 1,
      step: 0.01,
      label: 'Opacity',
    },
    materialWireframe: { value: leva.materialWireframe, label: 'Wireframe' },
  });

  // ── Ground Plane ────────────────────────────────────────
  const ground = useControls('Ground Plane', {
    planeEnabled: { value: leva.planeEnabled, label: 'Enabled' },
    planeSize: {
      value: leva.planeSize,
      min: 0.1,
      max: 200,
      step: 0.1,
      label: 'Size',
    },
    planeY: { value: leva.planeY, min: -10, max: 10, step: 0.01, label: 'Y' },
    planeColor: { value: leva.planeColor, label: 'Color' },
    planeReceiveShadow: {
      value: leva.planeReceiveShadow,
      label: 'Receive Shadow',
    },
  });

  // ── Sync to MobX ──────────────────────────────────────────
  useEffect(() => {
    leva.setAO(ao);
  }, [ao, leva]);
  useEffect(() => {
    leva.setContactShadows(shadows);
  }, [shadows, leva]);
  useEffect(() => {
    leva.setEnv(env);
  }, [env, leva]);
  useEffect(() => {
    const directional = lights.directional ?? {
      dirLightEnabled: leva.dirLightEnabled,
      dirLightColor: leva.dirLightColor,
      dirLightIntensity: leva.dirLightIntensity,
      dirLightX: leva.dirLightX,
      dirLightY: leva.dirLightY,
      dirLightZ: leva.dirLightZ,
    };

    leva.setLight({
      ambientIntensity: lights.ambientIntensity,
      dirLightEnabled: directional.dirLightEnabled,
      dirLightColor: directional.dirLightColor,
      dirLightIntensity: directional.dirLightIntensity,
      dirLightX: directional.dirLightX,
      dirLightY: directional.dirLightY,
      dirLightZ: directional.dirLightZ,
    });
  }, [
    lights.ambientIntensity,
    (lights.directional ?? leva).dirLightEnabled,
    (lights.directional ?? leva).dirLightColor,
    (lights.directional ?? leva).dirLightIntensity,
    (lights.directional ?? leva).dirLightX,
    (lights.directional ?? leva).dirLightY,
    (lights.directional ?? leva).dirLightZ,
    leva,
  ]);
  useEffect(() => {
    leva.setMaterial(material);
  }, [material, leva]);

  useEffect(() => {
    leva.setPlane(ground);
  }, [ground, leva]);

  return (
    <>
      <Leva
        titleBar={{
          drag: true,
          position: { x: 0, y: 70 },
        }}
      />
    </>
  );
});
