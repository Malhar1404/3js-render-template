import { makeAutoObservable } from 'mobx';

import { CameraManager } from './CameraManager';
import { EnvManager } from './EnvManager';
import { LevaManager } from './LevaManager';
import { MeshManager } from './MeshManager';
import { StateManager } from './StateManager';

export class Design3DManager {
  private _libState: StateManager;
  private _meshManager: MeshManager;
  private _cameraManager: CameraManager;
  private _envManager: EnvManager;
  private _levaManager: LevaManager;

  constructor(libState: StateManager) {
    this._libState = libState;
    this._meshManager = new MeshManager(libState);
    this._cameraManager = new CameraManager(libState);
    this._envManager = new EnvManager();
    this._levaManager = new LevaManager();
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

  get levaManager() {
    return this._levaManager;
  }
}
