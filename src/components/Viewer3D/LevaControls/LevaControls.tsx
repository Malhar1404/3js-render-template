import { Leva, useControls } from 'leva';
import { observer } from 'mobx-react-lite';
import { useEffect } from 'react';

import { useMainContext } from '../../../hooks/useMainContext';

export const LevaControls = observer(() => {
  const { design3DManager } = useMainContext();
  const leva = design3DManager.levaManager;

  // ── Ambient Occlusion ─────────────────────────────────────
  const ao = useControls('Ambient Occlusion (N8AO)', {
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
    aoSamples: {
      label: 'Samples',
      max: 32,
      min: 1,
      step: 1,
      value: leva.aoSamples,
    },
    aoScreenSpaceRadius: {
      label: 'Screen Space Radius',
      value: leva.aoScreenSpaceRadius,
    },
  });

  // ── Contact Shadows ───────────────────────────────────────
  const shadows = useControls('Contact Shadows', {
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
  });

  // ── Environment ───────────────────────────────────────────
  const env = useControls('Environment', {
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
  });

  // ── Material Override ─────────────────────────────────────
  // Material Override removed

  // Ground Plane controls removed

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

  return (
    <Leva
      titleBar={{
        drag: true,
        position: { x: 0, y: 70 },
      }}
    />
  );
});
