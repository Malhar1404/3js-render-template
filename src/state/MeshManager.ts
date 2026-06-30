import { makeAutoObservable } from 'mobx';
import * as THREE from 'three';

import { ModelBounds } from './ModelBounds';
import type { StateManager } from './StateManager';

export class MeshManager {
  private _libState: StateManager;
  /** The root THREE.Group of the currently loaded GLB scene */
  private _sceneGroup: THREE.Group | null = null;
  /** Bounding box computed after model loads (used for contact shadows, corner lights) */
  private _modelBounds: ModelBounds | null = null;

  constructor(libState: StateManager) {
    this._libState = libState;
    makeAutoObservable(this);
  }

  get sceneGroup() {
    return this._sceneGroup;
  }

  /** @deprecated use sceneGroup */
  get groupRef() {
    return this._sceneGroup;
  }

  setSceneGroup(group: THREE.Group | null) {
    this._sceneGroup = group;
  }

  /** @deprecated use setSceneGroup */
  setGroupRef(group: THREE.Group) {
    this._sceneGroup = group;
  }

  get modelBounds() {
    return this._modelBounds;
  }

  setModelBounds(bounds: ModelBounds | null) {
    this._modelBounds = bounds;
  }

  clearModelBounds() {
    this._modelBounds = null;
  }

  /** The Y position ContactShadows should sit at (bottom of model bbox) */
  get contactShadowsY(): number {
    if (this._modelBounds) {
      return this._modelBounds.min.y;
    }
    return -0.09;
  }
}
