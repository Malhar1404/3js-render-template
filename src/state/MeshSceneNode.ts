import { makeAutoObservable } from 'mobx';
import * as THREE from 'three';

/**
 * Represents a THREE.Mesh node in the scene hierarchy.
 *
 * Kept as a separate class so that:
 *  - instanceof checks can distinguish meshes from groups in the tree
 *  - Future mesh-specific properties (material overrides, etc.) have a home
 */
export class MeshSceneNode {
  readonly id: string;
  readonly name: string;
  readonly parentId: string | null;
  readonly childIds: string[];

  // Narrowed type — guaranteed to be a Mesh, not just any Object3D
  readonly object3D: THREE.Mesh;

  isVisible: boolean;

  constructor(
    object3D: THREE.Mesh,
    parentId: string | null,
    childIds: string[],
  ) {
    this.id = object3D.uuid;
    this.name = object3D.name || object3D.type;
    this.parentId = parentId;
    this.childIds = childIds;
    this.object3D = object3D;
    this.isVisible = object3D.visible;

    makeAutoObservable(this);
  }

  toggleVisibility(): void {
    this.isVisible = !this.isVisible;
    this.object3D.visible = this.isVisible;
  }

  setVisibility(visible: boolean): void {
    this.isVisible = visible;
    this.object3D.visible = visible;
  }
}
