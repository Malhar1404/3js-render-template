import {
  makeAutoObservable,
  observable,
  ObservableMap,
  ObservableSet,
} from 'mobx';
import * as THREE from 'three';

import { MeshSceneNode } from './MeshSceneNode';
import { SceneNode } from './SceneNode';

export class MeshTreeStore {
  /** Flat map of all nodes — keyed by THREE object uuid */
  nodes: ObservableMap<string, SceneNode> = observable.map();

  /** Ordered top-level node ids (direct children of the loaded scene root) */
  rootIds: string[] = [];

  /** Currently selected node uuid, or null */
  selectedId: string | null = null;

  /** Set of node ids that are expanded in the UI */
  expandedIds: ObservableSet<string> = observable.set();

  constructor() {
    makeAutoObservable(this);
  }

  // ─── Computed ─────────────────────────────────────────────────────────────

  get selectedNode(): SceneNode | null {
    if (!this.selectedId) return null;
    return this.nodes.get(this.selectedId) ?? null;
  }

  // ─── Actions ─────────────────────────────────────────────────────────────

  selectNode(id: string | null): void {
    this.selectedId = id;

    // Auto-expand parents when a node is selected
    if (id) {
      let current = this.nodes.get(id);
      while (current && current.parentId) {
        this.expandedIds.add(current.parentId);
        current = this.nodes.get(current.parentId);
      }
    }
  }

  toggleExpand(id: string): void {
    if (this.expandedIds.has(id)) {
      this.expandedIds.delete(id);
    } else {
      this.expandedIds.add(id);
    }
  }

  /**
   * Walks the THREE.js object hierarchy and populates the flat nodes map.
   * Groups → SceneNode, Meshes → MeshSceneNode.
   * Called once after each GLB load completes.
   */
  buildFromScene(root: THREE.Object3D): void {
    this.nodes.clear();
    this.rootIds = [];
    this.selectedId = null;
    this.expandedIds.clear();

    root.traverse((child) => {
      if (
        child instanceof THREE.LineSegments ||
        child.type === 'LineSegments'
      ) {
        child.raycast = () => {};
      }
    });

    const walk = (obj: THREE.Object3D, parentId: string | null): void => {
      // Filter out LineSegments children from parent-child mapping
      const children = obj.children;
      const childIds = children.map((c) => c.uuid);

      let node: SceneNode;
      if (obj instanceof THREE.Mesh) {
        node = new MeshSceneNode(
          obj as THREE.Mesh<
            THREE.BufferGeometry,
            THREE.Material | THREE.Material[]
          >,
          parentId,
          childIds,
        );
      } else {
        node = new SceneNode(obj, parentId, childIds);
      }

      this.nodes.set(node.id, node);

      if (parentId === null) {
        this.rootIds.push(node.id);
      }

      // Default expand all nodes initially
      this.expandedIds.add(node.id);

      for (const child of children) {
        walk(child, obj.uuid);
      }
    };

    // Walk each top-level child of the root group (skip the root itself)
    for (const child of root.children) {
      if (
        !(child instanceof THREE.LineSegments || child.type === 'LineSegments')
      ) {
        walk(child, null);
      }
    }
  }
}
