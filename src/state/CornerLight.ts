import { makeAutoObservable } from 'mobx';

export class CornerLight {
  id: number;
  name: string;
  enabled = true;
  intensity = 0.5;
  offsetX = 0;
  offsetY = 0.5;
  offsetZ = 0;
  helper = false;

  constructor(config: {
    id: number;
    name: string;
    enabled?: boolean;
    helper?: boolean;
    intensity?: number;
    offsetX?: number;
    offsetY?: number;
    offsetZ?: number;
  }) {
    this.id = config.id;
    this.name = config.name;
    if (config.enabled !== undefined) this.enabled = config.enabled;
    if (config.helper !== undefined) this.helper = config.helper;
    if (config.intensity !== undefined) this.intensity = config.intensity;
    if (config.offsetX !== undefined) this.offsetX = config.offsetX;
    if (config.offsetY !== undefined) this.offsetY = config.offsetY;
    if (config.offsetZ !== undefined) this.offsetZ = config.offsetZ;
    makeAutoObservable(this);
  }
}

export type CornerLightPatch = Partial<
  Pick<
    CornerLight,
    'enabled' | 'intensity' | 'offsetX' | 'offsetY' | 'offsetZ' | 'helper'
  >
>;
