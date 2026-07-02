import { makeAutoObservable } from 'mobx';
import * as THREE from 'three';

import { ModelBounds } from './ModelBounds';
import type { StateManager } from './StateManager';

export class MeshManager {
  private _libState: StateManager;
  private _sceneGroup: THREE.Group | null = null;
  private _modelBounds: ModelBounds | null = null;

  constructor(libState: StateManager) {
    this._libState = libState;
    makeAutoObservable(this);
  }

  get sceneGroup() {
    return this._sceneGroup;
  }

  get groupRef() {
    return this._sceneGroup;
  }

  setSceneGroup(group: THREE.Group | null) {
    this._sceneGroup = group;
  }

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

  get contactShadowsY(): number {
    if (this._modelBounds) {
      return this._modelBounds.min.y - 0.1;
    }
    return -0.09;
  }
}
