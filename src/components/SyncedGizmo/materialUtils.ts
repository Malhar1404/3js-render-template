import * as THREE from 'three';

export function applyMaterialOverrides(
  model: THREE.Group,
  modelColor?: string,
  modelOpacity?: number,
) {
  model.traverse((child) => {
    if (!(child instanceof THREE.Mesh)) return;
    const materials = Array.isArray(child.material)
      ? child.material
      : [child.material];
    materials.forEach((mat: THREE.Material) => {
      if (modelColor && 'color' in mat) {
        (mat as THREE.MeshStandardMaterial).color.set(modelColor);
      }
      if (modelOpacity !== undefined) {
        mat.transparent = modelOpacity < 1;
        mat.opacity = modelOpacity;
      }
      mat.needsUpdate = true;
    });
  });
}
