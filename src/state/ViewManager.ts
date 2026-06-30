import { makeAutoObservable } from 'mobx';

import type { StateManager } from './StateManager';

export class ViewManager {
  private _libState: StateManager;
  glbUrl = './glbs/OfficeSpace.glb';
  isModelLoading = true;
  modelLoadKey = 0;

  constructor(libState: StateManager) {
    this._libState = libState;
    makeAutoObservable(this);
  }

  setGlbUrl(glbUrl: string) {
    this.glbUrl = glbUrl;
    this.isModelLoading = true;
  }

  setModelLoaded() {
    this.isModelLoading = false;
    this.modelLoadKey += 1;
  }

  setModelLoading() {
    this.isModelLoading = true;
  }
}
