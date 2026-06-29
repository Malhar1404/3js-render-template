import { observer } from 'mobx-react-lite';
import { useState } from 'react';
import * as THREE from 'three';

import { Camera } from './Camera/Camera';
import { Canvas3D } from './Canvas3D/Canvas3D';
import { CornerLightsPanel } from './CornerLightsPanel/CornerLightsPanel';
import { Env } from './Env/Env';
import { LevaControls } from './LevaControls/LevaControls';
import { Light } from './Light/Light';
import { MeshCompute } from './MeshCompute/MeshCompute';
import { PostProcessing } from './PostProcessing/PostProcessing';
import { SelectionOutlineDemo } from './SelectionOutlineDemo/SelectionOutlineDemo';

export const Viewer3D = observer(() => {
  const [outlineSelection, setOutlineSelection] =
    useState<THREE.Object3D | null>(null);

  return (
    <>
      <LevaControls />
      <CornerLightsPanel />
      <Canvas3D>
        <Camera />
        <Light />
        <Env />
        <MeshCompute />
        <SelectionOutlineDemo onSelectionChange={setOutlineSelection} />
        <PostProcessing outlineSelection={outlineSelection} />
      </Canvas3D>
    </>
  );
});
