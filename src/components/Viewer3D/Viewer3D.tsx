import { observer } from 'mobx-react-lite';

import { Camera } from './Camera/Camera';
import { Canvas3D } from './Canvas3D/Canvas3D';
import { Env } from './Env/Env';
import { GroundPlane } from './GroundPlane/GroundPlane';
import { LevaControls } from './LevaControls/LevaControls';
import { Light } from './Light/Light';
import { MeshCompute } from './MeshCompute/MeshCompute';
import { PostProcessing } from './PostProcessing/PostProcessing';

export const Viewer3D = observer(() => {
  return (
    <>
      <LevaControls />
      <Canvas3D>
        <Camera />
        <Light />
        <Env />
        <MeshCompute />
        <GroundPlane />
        <PostProcessing />
      </Canvas3D>
    </>
  );
});
