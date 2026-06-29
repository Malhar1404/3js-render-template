import { Loader } from '@react-three/drei';
import { observer } from 'mobx-react-lite';

import { Camera } from './Camera/Camera';
import { Canvas3D } from './Canvas3D/Canvas3D';
import { CornerLightsPanel } from './CornerLightsPanel/CornerLightsPanel';
import { Env } from './Env/Env';
import { LevaControls } from './LevaControls/LevaControls';
import { Light } from './Light/Light';
import { MeshCompute } from './MeshCompute/MeshCompute';
import { PostProcessing } from './PostProcessing/PostProcessing';

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
      </Canvas3D>
    </>
  );
});
