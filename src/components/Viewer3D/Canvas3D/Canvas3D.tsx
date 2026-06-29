import { ContactShadows } from '@react-three/drei';
import { Canvas } from '@react-three/fiber';
import { observer } from 'mobx-react-lite';
import React, { useCallback } from 'react';
import * as THREE from 'three';

import { useMainContext } from '../../../hooks/useMainContext';

export const Canvas3D: React.FC<{ children?: React.ReactNode }> = observer(
  ({ children }) => {
    const { design3DManager } = useMainContext();
    const leva = design3DManager.levaManager;

    const onCreated = useCallback(({ gl }: { gl: THREE.WebGLRenderer }) => {
      gl.setClearColor(new THREE.Color(0xe8e8e8), 1);
    }, []);

    return (
      <Canvas
        className="canvas-3d"
        frameloop="always"
        shadows
        gl={{
          stencilBuffer: false,
          toneMapping: THREE.ACESFilmicToneMapping,
          toneMappingExposure: 0.9,
        }}
        shadowMap={{ type: THREE.PCFSoftShadowMap }}
        onCreated={onCreated}>
        {children}
        {leva.contactShadowsEnabled && (
          <ContactShadows
            position={[0, leva.contactShadowsPositionY, 0]}
            opacity={leva.contactShadowsOpacity}
            scale={leva.contactShadowsScale}
            blur={leva.contactShadowsBlur}
            far={leva.contactShadowsFar}
            resolution={512}
            frames={Infinity}
          />
        )}
      </Canvas>
    );
  },
);
