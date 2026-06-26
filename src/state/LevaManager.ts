import { makeAutoObservable } from 'mobx';

export class LevaManager {
  // Ambient Occlusion (N8AO)
  aoEnabled = true;
  aoRadius = 2.97;
  aoIntensity = 4.2;
  aoDistanceFalloff = 2.31;
  aoScreenSpaceRadius = false;
  aoSamples = 8;

  // Contact Shadows
  contactShadowsEnabled = true;
  contactShadowsOpacity = 0.57;
  contactShadowsScale = 171.6;
  contactShadowsBlur = 0.5;
  contactShadowsFar = 2.3;
  contactShadowsPositionY = -0.09;

  // Ground plane
  planeEnabled = false;
  planeSize = 10;
  planeColor = '#888888';
  planeY = 0;
  planeReceiveShadow = true;

  // Environment
  envVisible = false;
  envIntensity = 1.6;
  envRotationY = 1.5;

  // Lights
  ambientIntensity = 4;
  dirLightEnabled = false;
  dirLightIntensity = 1;
  dirLightX = 5;
  dirLightY = 5;
  dirLightZ = 5;
  dirLightColor = '#ffffff';

  // Material overrides (applied globally to all meshes)
  materialOverrideEnabled = false;
  materialType:
    | 'MeshStandardMaterial'
    | 'MeshPhysicalMaterial'
    | 'MeshToonMaterial'
    | 'MeshLambertMaterial'
    | 'MeshPhongMaterial' = 'MeshStandardMaterial';
  materialColor = '#ffffff';
  materialRoughness = 0.5;
  materialMetalness = 0.0;
  materialEmissive = '#000000';
  materialEmissiveIntensity = 1.0;
  materialEnvMapIntensity = 1.0;
  materialOpacity = 1.0;
  materialWireframe = false;

  constructor() {
    makeAutoObservable(this);
  }

  setAO(
    props: Partial<
      Pick<
        LevaManager,
        | 'aoEnabled'
        | 'aoRadius'
        | 'aoIntensity'
        | 'aoDistanceFalloff'
        | 'aoScreenSpaceRadius'
        | 'aoSamples'
      >
    >,
  ) {
    Object.assign(this, props);
  }

  setContactShadows(
    props: Partial<
      Pick<
        LevaManager,
        | 'contactShadowsEnabled'
        | 'contactShadowsOpacity'
        | 'contactShadowsScale'
        | 'contactShadowsBlur'
        | 'contactShadowsFar'
        | 'contactShadowsPositionY'
      >
    >,
  ) {
    Object.assign(this, props);
  }

  setEnv(
    props: Partial<
      Pick<LevaManager, 'envVisible' | 'envIntensity' | 'envRotationY'>
    >,
  ) {
    Object.assign(this, props);
  }

  setLight(
    props:
      | Partial<
          Pick<
            LevaManager,
            | 'ambientIntensity'
            | 'dirLightEnabled'
            | 'dirLightIntensity'
            | 'dirLightX'
            | 'dirLightY'
            | 'dirLightZ'
            | 'dirLightColor'
          >
        >
      | {
          directional?: Partial<
            Pick<
              LevaManager,
              | 'dirLightEnabled'
              | 'dirLightIntensity'
              | 'dirLightX'
              | 'dirLightY'
              | 'dirLightZ'
              | 'dirLightColor'
            >
          >;
        },
  ) {
    const { directional, ...rest } = props as any;
    Object.assign(this, {
      ...rest,
      ...directional,
    });
  }

  setMaterial(
    props: Partial<
      Pick<
        LevaManager,
        | 'materialOverrideEnabled'
        | 'materialType'
        | 'materialColor'
        | 'materialRoughness'
        | 'materialMetalness'
        | 'materialEmissive'
        | 'materialEmissiveIntensity'
        | 'materialEnvMapIntensity'
        | 'materialOpacity'
        | 'materialWireframe'
      >
    >,
  ) {
    Object.assign(this, props);
  }

  setPlane(
    props: Partial<
      Pick<
        LevaManager,
        | 'planeEnabled'
        | 'planeSize'
        | 'planeColor'
        | 'planeY'
        | 'planeReceiveShadow'
      >
    >,
  ) {
    Object.assign(this, props);
  }
}
