import { Leva, useControls } from 'leva';
import { observer } from 'mobx-react-lite';
import { useEffect, useMemo } from 'react';

import { useMainContext } from '../../../hooks/useMainContext';

export const LevaControls = observer(() => {
  const { design3DManager } = useMainContext();
  const leva = design3DManager.levaManager;

  // ── Ambient Occlusion ─────────────────────────────────────
  const aoConfig = useMemo(
    () => ({
      aoDistanceFalloff: {
        label: 'Distance Falloff',
        max: 5,
        min: 0,
        step: 0.01,
        value: leva.aoDistanceFalloff,
      },
      aoEnabled: { label: 'Enabled', value: leva.aoEnabled },
      aoIntensity: {
        label: 'Intensity',
        max: 20,
        min: 0,
        step: 0.1,
        value: leva.aoIntensity,
      },
      aoRadius: {
        label: 'Radius',
        max: 5,
        min: 0.01,
        step: 0.01,
        value: leva.aoRadius,
      },
    }),
    [leva.aoDistanceFalloff, leva.aoEnabled, leva.aoIntensity, leva.aoRadius],
  );
  const ao = useControls('Ambient Occlusion (N8AO)', aoConfig);

  // ── Contact Shadows ───────────────────────────────────────
  const shadowsConfig = useMemo(
    () => ({
      contactShadowsBlur: {
        label: 'Blur',
        max: 10,
        min: 0,
        step: 0.1,
        value: leva.contactShadowsBlur,
      },
      contactShadowsEnabled: {
        label: 'Enabled',
        value: leva.contactShadowsEnabled,
      },
      contactShadowsFar: {
        label: 'Far',
        max: 50,
        min: 0.1,
        step: 0.1,
        value: leva.contactShadowsFar,
      },
      contactShadowsOpacity: {
        label: 'Opacity',
        max: 1,
        min: 0,
        step: 0.01,
        value: leva.contactShadowsOpacity,
      },
      contactShadowsPositionY: {
        label: 'Position Y',
        max: 2,
        min: -2,
        step: 0.001,
        value: leva.contactShadowsPositionY,
      },
      contactShadowsScale: {
        label: 'Scale',
        max: 1000,
        min: 1,
        step: 0.5,
        value: leva.contactShadowsScale,
      },
    }),
    [
      leva.contactShadowsBlur,
      leva.contactShadowsEnabled,
      leva.contactShadowsFar,
      leva.contactShadowsOpacity,
      leva.contactShadowsPositionY,
      leva.contactShadowsScale,
    ],
  );
  const shadows = useControls('Contact Shadows', shadowsConfig);

  // ── Environment ───────────────────────────────────────────
  const envConfig = useMemo(
    () => ({
      envIntensity: {
        label: 'Intensity',
        max: 5,
        min: 0,
        step: 0.01,
        value: leva.envIntensity,
      },
      envRotationY: {
        label: 'Rotation Y',
        max: Math.PI,
        min: -Math.PI,
        step: 0.01,
        value: leva.envRotationY,
      },
      envVisible: { label: 'Show Background', value: leva.envVisible },
    }),
    [leva.envIntensity, leva.envRotationY, leva.envVisible],
  );
  const env = useControls('Environment', envConfig);

  // ── Lights ────────────────────────────────────────────────
  const lightsConfig = useMemo(
    () => ({
      ambientIntensity: {
        label: 'Ambient Intensity',
        max: 20,
        min: 0,
        step: 0.1,
        value: leva.ambientIntensity,
      },
    }),
    [leva.ambientIntensity],
  );
  const lights = useControls('Lights', lightsConfig);

  // ── Material Override ─────────────────────────────────────
  // Material Override removed

  // ── Model Material ───────────────────────────────────────
  const modelMaterialConfig = useMemo(
    () => ({
      modelMetalness: {
        label: 'Metalness',
        max: 1,
        min: 0,
        step: 0.01,
        value: leva.modelMetalness,
      },
      modelRoughness: {
        label: 'Roughness',
        max: 1,
        min: 0,
        step: 0.01,
        value: leva.modelRoughness,
      },
    }),
    [leva.modelMetalness, leva.modelRoughness],
  );
  const modelMaterial = useControls('Model Material', modelMaterialConfig);

  // Ground Plane controls removed

  // ── Sync to MobX ──────────────────────────────────────────
  useEffect(() => {
    const nextAO = {
      aoDistanceFalloff: ao.aoDistanceFalloff,
      aoEnabled: ao.aoEnabled,
      aoIntensity: ao.aoIntensity,
      aoRadius: ao.aoRadius,
    };

    if (
      nextAO.aoDistanceFalloff !== leva.aoDistanceFalloff ||
      nextAO.aoEnabled !== leva.aoEnabled ||
      nextAO.aoIntensity !== leva.aoIntensity ||
      nextAO.aoRadius !== leva.aoRadius
    ) {
      leva.setAO(nextAO);
    }
  }, [ao, leva]);

  useEffect(() => {
    const nextShadows = {
      contactShadowsBlur: shadows.contactShadowsBlur,
      contactShadowsEnabled: shadows.contactShadowsEnabled,
      contactShadowsFar: shadows.contactShadowsFar,
      contactShadowsOpacity: shadows.contactShadowsOpacity,
      contactShadowsPositionY: shadows.contactShadowsPositionY,
      contactShadowsScale: shadows.contactShadowsScale,
    };

    if (
      nextShadows.contactShadowsBlur !== leva.contactShadowsBlur ||
      nextShadows.contactShadowsEnabled !== leva.contactShadowsEnabled ||
      nextShadows.contactShadowsFar !== leva.contactShadowsFar ||
      nextShadows.contactShadowsOpacity !== leva.contactShadowsOpacity ||
      nextShadows.contactShadowsPositionY !== leva.contactShadowsPositionY ||
      nextShadows.contactShadowsScale !== leva.contactShadowsScale
    ) {
      leva.setContactShadows(nextShadows);
    }
  }, [shadows, leva]);

  useEffect(() => {
    const nextEnv = {
      envIntensity: env.envIntensity,
      envRotationY: env.envRotationY,
      envVisible: env.envVisible,
    };

    if (
      nextEnv.envIntensity !== leva.envIntensity ||
      nextEnv.envRotationY !== leva.envRotationY ||
      nextEnv.envVisible !== leva.envVisible
    ) {
      leva.setEnv(nextEnv);
    }
  }, [env, leva]);

  useEffect(() => {
    if (lights.ambientIntensity !== leva.ambientIntensity) {
      leva.setLight({ ambientIntensity: lights.ambientIntensity });
    }
  }, [lights, leva]);

  useEffect(() => {
    if (
      modelMaterial.modelRoughness !== leva.modelRoughness ||
      modelMaterial.modelMetalness !== leva.modelMetalness
    ) {
      leva.setMaterial({
        modelMetalness: modelMaterial.modelMetalness,
        modelRoughness: modelMaterial.modelRoughness,
      });
    }
  }, [modelMaterial, leva]);

  return (
    <Leva
      collapsed
      titleBar={{
        drag: true,
        position: { x: 0, y: 70 },
      }}
    />
  );
});
