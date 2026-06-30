import { makeAutoObservable } from 'mobx';

import type { StateManager } from './StateManager';

export class ViewManager {
  private _libState: StateManager;
  /** URL of the currently loaded GLB (default = office model) */
  glbUrl = './glbs/OfficeSpace.glb';
  /** True while the model is being fetched/parsed */
  isModelLoading = true;
  /** Incremented every time a model finishes loading — used as a React key
   *  to remount scene-graph-dependent components cleanly */
  modelLoadKey = 0;

  constructor(libState: StateManager) {
    this._libState = libState;
    makeAutoObservable(this);
  }

  /** Called from NavBar when the user picks a new GLB file */
  setGlbUrl(glbUrl: string) {
    this.glbUrl = glbUrl;
    this.isModelLoading = true;
  }

  /** Called from MeshCompute once the model is fully in the scene */
  setModelLoaded() {
    this.isModelLoading = false;
    this.modelLoadKey += 1;
  }

  setModelLoading() {
    this.isModelLoading = true;
  }
}
