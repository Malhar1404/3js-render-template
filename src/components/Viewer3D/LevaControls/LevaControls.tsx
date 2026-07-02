import { useControls } from 'leva';
import { useEffect } from 'react';

import { useMainContext } from '../../../hooks/useMainContext';

export const LevaControls = () => {
  const { design3DManager } = useMainContext();
  const leva = design3DManager.levaManager;

  // ── Ambient Occlusion ─────────────────────────────────────
  const [, setAO] = useControls('Ambient Occlusion (N8AO)', () => ({
    aoDistanceFalloff: {
      label: 'Distance Falloff',
      max: 5,
      min: 0,
      onChange: (v: number) => {
        leva.setAO({ aoDistanceFalloff: v });
      },
      step: 0.01,
      value: leva.aoDistanceFalloff,
    },
    aoEnabled: {
      label: 'Enabled',
      onChange: (v: boolean) => {
        leva.setAO({ aoEnabled: v });
      },
      value: leva.aoEnabled,
    },
    aoIntensity: {
      label: 'Intensity',
      max: 20,
      min: 0,
      onChange: (v: number) => {
        leva.setAO({ aoIntensity: v });
      },
      step: 0.1,
      value: leva.aoIntensity,
    },
    aoRadius: {
      label: 'Radius',
      max: 5,
      min: 0.01,
      onChange: (v: number) => {
        leva.setAO({ aoRadius: v });
      },
      step: 0.01,
      value: leva.aoRadius,
    },
  }));

  // ── Contact Shadows ───────────────────────────────────────
  const [, setShadows] = useControls('Contact Shadows', () => ({
    contactShadowsBlur: {
      label: 'Blur',
      max: 10,
      min: 0,
      onChange: (v: number) => {
        leva.setContactShadows({ contactShadowsBlur: v });
      },
      step: 0.1,
      value: leva.contactShadowsBlur,
    },
    contactShadowsEnabled: {
      label: 'Enabled',
      onChange: (v: boolean) => {
        leva.setContactShadows({ contactShadowsEnabled: v });
      },
      value: leva.contactShadowsEnabled,
    },
    contactShadowsFar: {
      label: 'Far',
      max: 50,
      min: 0.1,
      onChange: (v: number) => {
        leva.setContactShadows({ contactShadowsFar: v });
      },
      step: 0.1,
      value: leva.contactShadowsFar,
    },
    contactShadowsOpacity: {
      label: 'Opacity',
      max: 1,
      min: 0,
      onChange: (v: number) => {
        leva.setContactShadows({ contactShadowsOpacity: v });
      },
      step: 0.01,
      value: leva.contactShadowsOpacity,
    },
    contactShadowsPositionY: {
      label: 'Position Y',
      max: 2,
      min: -2,
      onChange: (v: number) => {
        leva.setContactShadows({ contactShadowsPositionY: v });
      },
      step: 0.001,
      value: leva.contactShadowsPositionY,
    },
    contactShadowsScale: {
      label: 'Scale',
      max: 1000,
      min: 1,
      onChange: (v: number) => {
        leva.setContactShadows({ contactShadowsScale: v });
      },
      step: 0.5,
      value: leva.contactShadowsScale,
    },
  }));

  // ── Environment ───────────────────────────────────────────
  const [, setEnv] = useControls('Environment', () => ({
    envIntensity: {
      label: 'Intensity',
      max: 5,
      min: 0,
      onChange: (v: number) => {
        leva.setEnv({ envIntensity: v });
      },
      step: 0.01,
      value: leva.envIntensity,
    },
    envRotationY: {
      label: 'Rotation Y',
      max: Math.PI,
      min: -Math.PI,
      onChange: (v: number) => {
        leva.setEnv({ envRotationY: v });
      },
      step: 0.01,
      value: leva.envRotationY,
    },
    envVisible: {
      label: 'Show Background',
      onChange: (v: boolean) => {
        leva.setEnv({ envVisible: v });
      },
      value: leva.envVisible,
    },
  }));

  // ── Lights ────────────────────────────────────────────────
  const [, setLights] = useControls('Lights', () => ({
    ambientIntensity: {
      label: 'Ambient Intensity',
      max: 20,
      min: 0,
      onChange: (v: number) => {
        leva.setLight({ ambientIntensity: v });
      },
      step: 0.1,
      value: leva.ambientIntensity,
    },
  }));

  // ── Model Material ───────────────────────────────────────
  const [, setModelMaterial] = useControls('Model Material', () => ({
    modelMetalness: {
      label: 'Metalness',
      max: 1,
      min: 0,
      onChange: (v: number) => {
        leva.setMaterial({ modelMetalness: v });
      },
      step: 0.01,
      value: leva.modelMetalness,
    },
    modelRoughness: {
      label: 'Roughness',
      max: 1,
      min: 0,
      onChange: (v: number) => {
        leva.setMaterial({ modelRoughness: v });
      },
      step: 0.01,
      value: leva.modelRoughness,
    },
  }));

  // Sync back from MobX if values change from external sources (e.g. model loads reset values)
  useEffect(() => {
    setAO({
      aoDistanceFalloff: leva.aoDistanceFalloff,
      aoEnabled: leva.aoEnabled,
      aoIntensity: leva.aoIntensity,
      aoRadius: leva.aoRadius,
    });
  }, [
    leva.aoEnabled,
    leva.aoRadius,
    leva.aoIntensity,
    leva.aoDistanceFalloff,
    setAO,
  ]);

  useEffect(() => {
    setShadows({
      contactShadowsBlur: leva.contactShadowsBlur,
      contactShadowsEnabled: leva.contactShadowsEnabled,
      contactShadowsFar: leva.contactShadowsFar,
      contactShadowsOpacity: leva.contactShadowsOpacity,
      contactShadowsPositionY: leva.contactShadowsPositionY,
      contactShadowsScale: leva.contactShadowsScale,
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
      envIntensity: leva.envIntensity,
      envRotationY: leva.envRotationY,
      envVisible: leva.envVisible,
    });
  }, [leva.envVisible, leva.envIntensity, leva.envRotationY, setEnv]);

  useEffect(() => {
    setLights({
      ambientIntensity: leva.ambientIntensity,
    });
  }, [leva.ambientIntensity, setLights]);

  useEffect(() => {
    setModelMaterial({
      modelMetalness: leva.modelMetalness,
      modelRoughness: leva.modelRoughness,
    });
  }, [leva.modelRoughness, leva.modelMetalness, setModelMaterial]);

  return null;
};
