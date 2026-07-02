import {
  makeAutoObservable,
  observable,
  ObservableMap,
  ObservableSet,
} from 'mobx';
import * as THREE from 'three';

import { Utils3D } from '../utils/Utils3D';
import { SceneNode } from './SceneNode';

export class MeshTreeStore {
  /** Flat map of all nodes — keyed by THREE object uuid */
  private _nodes: ObservableMap<string, SceneNode> = observable.map();

  /** Ordered top-level node ids (direct children of the loaded scene root) */
  private _rootIds: string[] = [];

  /** Currently selected node uuid, or null */
  private _selectedId: string | null = null;

  /** Set of node ids that are expanded in the UI */
  private _expandedIds: ObservableSet<string> = observable.set();

  constructor() {
    makeAutoObservable(this);
  }

  // ─── Getters & Setters ─────────────────────────────────────────────────────

  get nodes(): ObservableMap<string, SceneNode> {
    return this._nodes;
  }

  get rootIds(): string[] {
    return this._rootIds;
  }

  set rootIds(val: string[]) {
    this._rootIds = val;
  }

  get selectedId(): string | null {
    return this._selectedId;
  }

  set selectedId(val: string | null) {
    this._selectedId = val;
  }

  get expandedIds(): ObservableSet<string> {
    return this._expandedIds;
  }

  set expandedIds(val: ObservableSet<string>) {
    this._expandedIds = val;
  }

  // ─── Computed ─────────────────────────────────────────────────────────────

  get selectedNode(): SceneNode | null {
    if (!this.selectedId) return null;
    return this.nodes.get(this.selectedId) ?? null;
  }

  // ─── Setters/Mutators (Actions) ──────────────────────────────────────────

  setNode(id: string, node: SceneNode): void {
    this._nodes.set(id, node);
  }

  clearNodes(): void {
    this._nodes.clear();
  }

  addRootId(id: string): void {
    this.rootIds = [...this.rootIds, id];
  }

  clearRootIds(): void {
    this.rootIds = [];
  }

  addExpandedId(id: string): void {
    this._expandedIds.add(id);
  }

  removeExpandedId(id: string): void {
    this._expandedIds.delete(id);
  }

  clearExpandedIds(): void {
    this._expandedIds.clear();
  }

  // ─── Actions ─────────────────────────────────────────────────────────────

  selectNode(id: string | null): void {
    this.selectedId = id;

    // Auto-expand parents when a node is selected
    if (id) {
      let current = this.nodes.get(id);
      while (current && current.parentId) {
        this.addExpandedId(current.parentId);
        current = this.nodes.get(current.parentId);
      }
    }
  }

  toggleExpand(id: string): void {
    if (this.expandedIds.has(id)) {
      this.removeExpandedId(id);
    } else {
      this.addExpandedId(id);
    }
  }

  /**
   * Walks the THREE.js object hierarchy and populates the flat nodes map.
   * Groups → SceneNode, Meshes → MeshSceneNode.
   * Called once after each GLB load completes.
   */
  buildFromScene(root: THREE.Object3D): void {
    this.clearNodes();
    this.clearRootIds();
    this.selectedId = null;
    this.clearExpandedIds();

    root.traverse((child) => {
      if (
        child instanceof THREE.LineSegments ||
        child.type === 'LineSegments'
      ) {
        child.raycast = () => {};
      }
    });

    // Walk each top-level child of the root group (skip the root itself)
    for (const child of root.children) {
      if (
        !(child instanceof THREE.LineSegments || child.type === 'LineSegments')
      ) {
        Utils3D.walkScene(child, null, this);
      }
    }
  }
}
