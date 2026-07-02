import { action, makeObservable, observable } from 'mobx';
import * as THREE from 'three';

export class SceneNode {
  readonly id: string;
  readonly name: string;
  readonly parentId: string | null;
  readonly childIds: string[];

  // Plain ref — never proxied by MobX. Mutations are imperative side-effects.
  readonly object3D: THREE.Object3D;

  isVisible: boolean;

  constructor(
    object3D: THREE.Object3D,
    parentId: string | null,
    childIds: string[],
  ) {
    this.id = object3D.uuid;
    this.name = object3D.name || object3D.type;
    this.parentId = parentId;
    this.childIds = childIds;
    this.object3D = object3D;
    this.isVisible = object3D.visible;

    makeObservable(this, {
      isVisible: observable,
      setVisibility: action,
      toggleVisibility: action,
    });
  }

  toggleVisibility(): void {
    this.isVisible = !this.isVisible;
    this.object3D.visible = this.isVisible; // imperative Three.js side-effect
  }

  setVisibility(visible: boolean): void {
    this.isVisible = visible;
    this.object3D.visible = visible;
  }
}
