import { makeAutoObservable } from 'mobx';

import type { StateManager } from './StateManager';

export class ViewManager {
  private _libState: StateManager;
  glbUrl = './glbs/OfficeSpace.glb';
  isModelLoading = true;
  modelLoadKey = 0;
  gizmoUrl = './glbs/cube.glb';

  constructor(libState: StateManager) {
    this._libState = libState;
    makeAutoObservable(this);
  }

  setGlbUrl(glbUrl: string) {
    this.glbUrl = glbUrl;
    this.isModelLoading = true;
    this.modelLoadKey += 1;
  }

  setModelLoaded() {
    this.isModelLoading = false;
  }

  setModelLoading() {
    this.isModelLoading = true;
  }

  setGizmoUrl(gizmoUrl: string) {
    this.gizmoUrl = gizmoUrl;
  }
  getGizmoUrl() {
    return this.gizmoUrl;
  }
}
