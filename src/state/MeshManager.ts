import { makeAutoObservable } from 'mobx';
import * as THREE from 'three';

import { MeshInfo } from '../core/MeshInfo';
import { ModelBounds } from './ModelBounds';
import { StateManager } from './StateManager';

export class MeshManager {
  private _libState: StateManager;
  private _meshInfos: MeshInfo[] = [];
  private _groupRef: THREE.Group | null = null;
  private _modelBounds: ModelBounds | null = null;
  constructor(libState: StateManager) {
    this._libState = libState;
    makeAutoObservable(this);
  }

  get meshInfos() {
    return this._meshInfos;
  }

  setMeshInfos(meshInfos: MeshInfo[]) {
    this._meshInfos = meshInfos;
  }

  setGroupRef(group: THREE.Group) {
    this._groupRef = group;
  }

  get groupRef() {
    return this._groupRef;
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
}
