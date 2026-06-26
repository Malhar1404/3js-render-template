import { useCursor } from '@react-three/drei';
import { ThreeEvent } from '@react-three/fiber';
import { useRef, useState } from 'react';
import * as THREE from 'three';

export const SelectionOutlineDemo = ({
  onSelectionChange,
}: {
  onSelectionChange: (selection: THREE.Object3D | null) => void;
}) => {
  const meshRef = useRef<THREE.Mesh>(null);
  const [hovered, setHovered] = useState(false);

  useCursor(hovered);

  const handlePointerOver = (event: ThreeEvent<PointerEvent>) => {
    event.stopPropagation();
    setHovered(true);
    onSelectionChange(meshRef.current);
  };

  const handlePointerOut = (event: ThreeEvent<PointerEvent>) => {
    event.stopPropagation();
    setHovered(false);
    onSelectionChange(null);
  };

  return (
    <mesh
      castShadow
      onPointerOut={handlePointerOut}
      onPointerOver={handlePointerOver}
      position={[0, 1.25, 0]}
      ref={meshRef}>
      <torusKnotGeometry args={[0.45, 0.14, 128, 24]} />
      <meshStandardMaterial
        color={hovered ? '#262626' : '#3f3f46'}
        metalness={0.25}
        roughness={0.35}
      />
    </mesh>
  );
};
