import { Leva, useControls } from 'leva';
import { useEffect } from 'react';

import { useMainContext } from '../../../hooks/useMainContext';

const TITLE_BAR = {
  drag: true,
  position: { x: 0, y: 70 },
} as const;

export const LevaControls = () => {
  const { design3DManager } = useMainContext();
  const leva = design3DManager.levaManager;

  // ── Ambient Occlusion ─────────────────────────────────────
  const [, setAO] = useControls('Ambient Occlusion (N8AO)', () => ({
    aoEnabled: {
      label: 'Enabled',
      value: leva.aoEnabled,
      onChange: (v: boolean) => {
        leva.setAO({ aoEnabled: v });
      },
    },
    aoRadius: {
      label: 'Radius',
      max: 5,
      min: 0.01,
      step: 0.01,
      value: leva.aoRadius,
      onChange: (v: number) => {
        leva.setAO({ aoRadius: v });
      },
    },
    aoIntensity: {
      label: 'Intensity',
      max: 20,
      min: 0,
      step: 0.1,
      value: leva.aoIntensity,
      onChange: (v: number) => {
        leva.setAO({ aoIntensity: v });
      },
    },
    aoDistanceFalloff: {
      label: 'Distance Falloff',
      max: 5,
      min: 0,
      step: 0.01,
      value: leva.aoDistanceFalloff,
      onChange: (v: number) => {
        leva.setAO({ aoDistanceFalloff: v });
      },
    },
  }));

  // ── Contact Shadows ───────────────────────────────────────
  const [, setShadows] = useControls('Contact Shadows', () => ({
    contactShadowsEnabled: {
      label: 'Enabled',
      value: leva.contactShadowsEnabled,
      onChange: (v: boolean) => {
        leva.setContactShadows({ contactShadowsEnabled: v });
      },
    },
    contactShadowsOpacity: {
      label: 'Opacity',
      max: 1,
      min: 0,
      step: 0.01,
      value: leva.contactShadowsOpacity,
      onChange: (v: number) => {
        leva.setContactShadows({ contactShadowsOpacity: v });
      },
    },
    contactShadowsScale: {
      label: 'Scale',
      max: 1000,
      min: 1,
      step: 0.5,
      value: leva.contactShadowsScale,
      onChange: (v: number) => {
        leva.setContactShadows({ contactShadowsScale: v });
      },
    },
    contactShadowsBlur: {
      label: 'Blur',
      max: 10,
      min: 0,
      step: 0.1,
      value: leva.contactShadowsBlur,
      onChange: (v: number) => {
        leva.setContactShadows({ contactShadowsBlur: v });
      },
    },
    contactShadowsFar: {
      label: 'Far',
      max: 50,
      min: 0.1,
      step: 0.1,
      value: leva.contactShadowsFar,
      onChange: (v: number) => {
        leva.setContactShadows({ contactShadowsFar: v });
      },
    },
    contactShadowsPositionY: {
      label: 'Position Y',
      max: 2,
      min: -2,
      step: 0.001,
      value: leva.contactShadowsPositionY,
      onChange: (v: number) => {
        leva.setContactShadows({ contactShadowsPositionY: v });
      },
    },
  }));

  // ── Environment ───────────────────────────────────────────
  const [, setEnv] = useControls('Environment', () => ({
    envVisible: {
      label: 'Show Background',
      value: leva.envVisible,
      onChange: (v: boolean) => {
        leva.setEnv({ envVisible: v });
      },
    },
    envIntensity: {
      label: 'Intensity',
      max: 5,
      min: 0,
      step: 0.01,
      value: leva.envIntensity,
      onChange: (v: number) => {
        leva.setEnv({ envIntensity: v });
      },
    },
    envRotationY: {
      label: 'Rotation Y',
      max: Math.PI,
      min: -Math.PI,
      step: 0.01,
      value: leva.envRotationY,
      onChange: (v: number) => {
        leva.setEnv({ envRotationY: v });
      },
    },
  }));

  // ── Lights ────────────────────────────────────────────────
  const [, setLights] = useControls('Lights', () => ({
    ambientIntensity: {
      label: 'Ambient Intensity',
      max: 20,
      min: 0,
      step: 0.1,
      value: leva.ambientIntensity,
      onChange: (v: number) => {
        leva.setLight({ ambientIntensity: v });
      },
    },
  }));

  // ── Model Material ───────────────────────────────────────
  const [, setModelMaterial] = useControls('Model Material', () => ({
    modelRoughness: {
      label: 'Roughness',
      max: 1,
      min: 0,
      step: 0.01,
      value: leva.modelRoughness,
      onChange: (v: number) => {
        leva.setMaterial({ modelRoughness: v });
      },
    },
    modelMetalness: {
      label: 'Metalness',
      max: 1,
      min: 0,
      step: 0.01,
      value: leva.modelMetalness,
      onChange: (v: number) => {
        leva.setMaterial({ modelMetalness: v });
      },
    },
  }));

  // Sync back from MobX if values change from external sources (e.g. model loads reset values)
  useEffect(() => {
    setAO({
      aoEnabled: leva.aoEnabled,
      aoRadius: leva.aoRadius,
      aoIntensity: leva.aoIntensity,
      aoDistanceFalloff: leva.aoDistanceFalloff,
    });
  }, [leva.aoEnabled, leva.aoRadius, leva.aoIntensity, leva.aoDistanceFalloff, setAO]);

  useEffect(() => {
    setShadows({
      contactShadowsEnabled: leva.contactShadowsEnabled,
      contactShadowsOpacity: leva.contactShadowsOpacity,
      contactShadowsScale: leva.contactShadowsScale,
      contactShadowsBlur: leva.contactShadowsBlur,
      contactShadowsFar: leva.contactShadowsFar,
      contactShadowsPositionY: leva.contactShadowsPositionY,
    });
  }, [
    leva.contactShadowsEnabled,
    leva.contactShadowsOpacity,
    leva.contactShadowsScale,
    leva.contactShadowsBlur,
    leva.contactShadowsFar,
    leva.contactShadowsPositionY,
    setShadows,
  ]);

  useEffect(() => {
    setEnv({
      envVisible: leva.envVisible,
      envIntensity: leva.envIntensity,
      envRotationY: leva.envRotationY,
    });
  }, [leva.envVisible, leva.envIntensity, leva.envRotationY, setEnv]);

  useEffect(() => {
    setLights({
      ambientIntensity: leva.ambientIntensity,
    });
  }, [leva.ambientIntensity, setLights]);

  useEffect(() => {
    setModelMaterial({
      modelRoughness: leva.modelRoughness,
      modelMetalness: leva.modelMetalness,
    });
  }, [leva.modelRoughness, leva.modelMetalness, setModelMaterial]);

  return <Leva collapsed titleBar={TITLE_BAR} />;
};
