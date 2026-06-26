import { CameraControls } from '@react-three/drei';
import { makeAutoObservable } from 'mobx';
import * as THREE from 'three';

import { Utils3D } from '../utils/Utils3D';
import { StateManager } from './StateManager';

export class CameraManager {
  private _libState: StateManager;
  private _cameraRef: CameraControls | null = null;
  constructor(libState: StateManager) {
    this._libState = libState;
    makeAutoObservable(this);
  }

  setCameraRef(camera: CameraControls) {
    this._cameraRef = camera;
  }

  get cameraRef() {
    return this._cameraRef;
  }

  public resetCameraToRef = () => {
    const meshRef = this._libState.design3DManager.meshManager.groupRef;
    if (meshRef) {
      this.focusCameraTo([meshRef]);
    }
  };

  public focusCameraTo = (obj: THREE.Object3D[]) => {
    const item = Array.isArray(obj) ? obj[obj.length - 1] : obj;
    const { boundingBox, size } = Utils3D.getSizeAndCenter(item);
    const fitPadding = Math.max(Math.max(size.x, size.y, size.z) * 0.2, 0.5);

    this._cameraRef?.fitToBox(boundingBox, true, {
      paddingBottom: fitPadding,
      paddingLeft: fitPadding,
      paddingRight: fitPadding,
      paddingTop: fitPadding,
    });
  };

  private rotateCameraToAzimuth = (azimuthAngle: number) => {
    if (!this._cameraRef) return;

    const target = new THREE.Vector3();
    const position = new THREE.Vector3();

    this._cameraRef.getTarget(target);
    this._cameraRef.getPosition(position);

    const offset = position.clone().sub(target);
    const spherical = new THREE.Spherical().setFromVector3(offset);

    this._cameraRef.rotateTo(azimuthAngle, spherical.phi, true);
  };

  public viewFront = () => {
    this.rotateCameraToAzimuth(0);
  };

  public viewRight = () => {
    this.rotateCameraToAzimuth(Math.PI / 2);
  };

  public viewBack = () => {
    this.rotateCameraToAzimuth(Math.PI);
  };

  public viewLeft = () => {
    this.rotateCameraToAzimuth(-Math.PI / 2);
  };
}
