import { GizmoHelper, GizmoViewcube, Loader } from '@react-three/drei';
import { observer } from 'mobx-react-lite';

import { Camera } from './Camera/Camera';
import { Canvas3D } from './Canvas3D/Canvas3D';
import { Env } from './Env/Env';
import { Light } from './Light/Light';
import { MeshCompute } from './MeshCompute/MeshCompute';
import { PostProcessing } from './PostProcessing/PostProcessing';
import { SelectionOutline } from './SelectionOutline/SelectionOutline';

export const Viewer3D = observer(() => {
  return (
    <>
      <Loader />
      <Canvas3D>
        <Camera />
        <Light />
        <Env />
        <MeshCompute />
        <PostProcessing />
        <SelectionOutline />

        <GizmoHelper
          renderPriority={2}
          alignment="bottom-right"
          margin={[80, 80]}>
          <group scale={1.1}>
            <GizmoViewcube
              color="#374151"
              hoverColor="#38bdf8"
              textColor="#f3f4f6"
              strokeColor="#38bdf8"
            />
          </group>
        </GizmoHelper>
      </Canvas3D>
    </>
  );
});
