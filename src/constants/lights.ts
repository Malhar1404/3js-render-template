import { CornerLight } from '../state/CornerLight';

export const HARDCODED_LIGHTS: CornerLight[] = [
  {
    id: 1,
    name: 'Front Left',
    enabled: true,
    intensity: 0.8,
    offsetX: 0,
    offsetY: 0.5,
    offsetZ: 0,
    helper: false,
  },
  {
    id: 2,
    name: 'Front Right',
    enabled: false,
    intensity: 0.5,
    offsetX: 0,
    offsetY: 0.5,
    offsetZ: 0,
    helper: false,
  },
  {
    id: 3,
    name: 'Back Left',
    enabled: true,
    intensity: 1.3,
    offsetX: 0,
    offsetY: 0.5,
    offsetZ: 0,
    helper: false,
  },
  {
    id: 4,
    name: 'Back Right',
    enabled: true,
    intensity: 0.4,
    offsetX: 0,
    offsetY: 0.5,
    offsetZ: 0,
    helper: false,
  },
];
