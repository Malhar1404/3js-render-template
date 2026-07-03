import { makeAutoObservable } from 'mobx';

import { CameraManager } from './CameraManager';
import { EnvManager } from './EnvManager';
import { MeshManager } from './MeshManager';
import { MeshTreeStore } from './MeshTreeStore';
import type { StateManager } from './StateManager';

export class Design3DManager {
  private _libState: StateManager;
  private _meshManager: MeshManager;
  private _cameraManager: CameraManager;
  private _envManager: EnvManager;
  private _meshTreeStore: MeshTreeStore;

  constructor(libState: StateManager) {
    this._libState = libState;
    this._meshManager = new MeshManager(libState);
    this._cameraManager = new CameraManager(libState);
    this._envManager = new EnvManager();
    this._meshTreeStore = new MeshTreeStore();
    makeAutoObservable(this);
  }

  get meshManager() {
    return this._meshManager;
  }

  get cameraManager() {
    return this._cameraManager;
  }

  get envManager() {
    return this._envManager;
  }

  get meshTreeStore() {
    return this._meshTreeStore;
  }
}
