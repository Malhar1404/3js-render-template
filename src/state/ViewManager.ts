import { makeAutoObservable } from 'mobx';

import type { StateManager } from './StateManager';

export class ViewManager {
  private _libState: StateManager;
  private _glbUrl = './glbs/OfficeSpace.glb';
  private _isModelLoading = true;
  private _modelLoadKey = 0;

  constructor(libState: StateManager) {
    this._libState = libState;
    makeAutoObservable(this);
  }

  get glbUrl(): string {
    return this._glbUrl;
  }

  get isModelLoading(): boolean {
    return this._isModelLoading;
  }

  get modelLoadKey(): number {
    return this._modelLoadKey;
  }

  setGlbUrl(glbUrl: string) {
    this._glbUrl = glbUrl;
    this._isModelLoading = true;
    this._modelLoadKey += 1;
  }

  setModelLoaded() {
    this._isModelLoading = false;
  }

  setModelLoading() {
    this._isModelLoading = true;
  }
}
