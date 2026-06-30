import { ContactShadows } from '@react-three/drei';
import { Canvas } from '@react-three/fiber';
import { observer } from 'mobx-react-lite';
import React, { useCallback } from 'react';
import * as THREE from 'three';

import { useMainContext } from '../../../hooks/useMainContext';

export const Canvas3D: React.FC<{ children?: React.ReactNode }> = observer(
  ({ children }) => {
    const { design3DManager, designManager } = useMainContext();
    const leva = design3DManager.levaManager;
    const { meshManager } = design3DManager;
    const { viewManager } = designManager;

    const onCreated = useCallback(({ gl }: { gl: THREE.WebGLRenderer }) => {
      gl.setClearColor(new THREE.Color(0x525252), 1);
      gl.shadowMap.type = THREE.PCFShadowMap;
    }, []);

   
    const contactShadowsY = meshManager.contactShadowsY;

    const showContactShadows =
      leva.contactShadowsEnabled && !viewManager.isModelLoading;

    return (
      <Canvas
        className="canvas-3d"
        frameloop="always"
        shadows
        gl={{
          toneMapping: THREE.ACESFilmicToneMapping,
          toneMappingExposure: 0.9,
        }}
        onCreated={onCreated}>
        {children}
        {showContactShadows && (
          <ContactShadows
            key={`contact-shadows-${viewManager.modelLoadKey}`}
            position={[0, contactShadowsY, 0]}
            opacity={leva.contactShadowsOpacity}
            scale={leva.contactShadowsScale}
            blur={leva.contactShadowsBlur}
            far={leva.contactShadowsFar}
            resolution={128}
            frames={30}
          />
        )}
      </Canvas>
    );
  },
);
