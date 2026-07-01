import { GizmoHelper, GizmoViewcube, Loader } from '@react-three/drei';
import { observer } from 'mobx-react-lite';

import { Camera } from './Camera/Camera';
import { Canvas3D } from './Canvas3D/Canvas3D';
import { CornerLightsPanel } from './CornerLightsPanel/CornerLightsPanel';
import { Env } from './Env/Env';
import { LevaControls } from './LevaControls/LevaControls';
import { Light } from './Light/Light';
import { MeshCompute } from './MeshCompute/MeshCompute';
import { PostProcessing } from './PostProcessing/PostProcessing';
import { SelectionOutline } from './SelectionOutline/SelectionOutline';

export const Viewer3D = observer(() => {
  return (
    <>
      <LevaControls />
      <CornerLightsPanel />
      <Loader />
      <Canvas3D>
        <Camera />
        <Light />
        <Env />
        <MeshCompute />
        <PostProcessing />
        <SelectionOutline />

        <GizmoHelper renderPriority={2} alignment="bottom-right" margin={[80, 80]}>
          <group scale={1.1}>
            <GizmoViewcube
              color="#2a2d35"
              hoverColor="#3f4350"
              textColor="#e8edf4"
              strokeColor="#555a66"
            />
          </group>
        </GizmoHelper>
      </Canvas3D>
    </>
  );
});
