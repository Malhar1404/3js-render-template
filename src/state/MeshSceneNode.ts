import { makeObservable } from 'mobx';
import * as THREE from 'three';

import { SceneNode } from './SceneNode';

/**
 * Represents a THREE.Mesh node in the scene hierarchy.
 * Extends SceneNode with a narrowed object3D type (THREE.Mesh instead of THREE.Object3D).
 *
 * Kept as a separate class so that:
 *  - instanceof checks can distinguish meshes from groups in the tree
 *  - Future mesh-specific properties (material overrides, etc.) have a home
 */
export class MeshSceneNode extends SceneNode {
  // Narrowed type — guaranteed to be a Mesh, not just any Object3D
  override readonly object3D: THREE.Mesh;

  constructor(
    object3D: THREE.Mesh,
    parentId: string | null,
    childIds: string[],
  ) {
    super(object3D, parentId, childIds);
    this.object3D = object3D;
    // No additional observables yet — makeObservable call is inherited via super()
    makeObservable(this, {});
  }
}
