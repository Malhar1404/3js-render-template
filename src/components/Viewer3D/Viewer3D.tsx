import { Loader } from '@react-three/drei';
import { observer } from 'mobx-react-lite';

import { useMainContext } from '../../hooks/useMainContext';
import { GizmoSyncer } from '../SyncedGizmo';
import { SyncedGizmo } from '../SyncedGizmo/SyncedGizmo';
import { SyncedGizmoProvider } from '../SyncedGizmo/SyncedGizmoProvider';
import { Camera } from './Camera/Camera';
import { Canvas3D } from './Canvas3D/Canvas3D';
import { CornerLightsPanel } from './CornerLightsPanel/CornerLightsPanel';
import { Env } from './Env/Env';
import { LevaControls } from './LevaControls/LevaControls';
import { Light } from './Light/Light';
import { MeshCompute } from './MeshCompute/MeshCompute';
import { PostProcessing } from './PostProcessing/PostProcessing';

export const Viewer3D = observer(() => {
  const { designManager } = useMainContext();
  const { viewManager } = designManager;

  return (
    <SyncedGizmoProvider>
      <LevaControls />
      <CornerLightsPanel />
      <Loader />
      <Canvas3D>
        <Camera />
        <Light />
        <Env />
        <GizmoSyncer />
        <MeshCompute />
        <PostProcessing />
      </Canvas3D>
      <SyncedGizmo
        glbUrl={viewManager.gizmoUrl}
        size={100}
        position="bottom-right"
        margin={[72, 30]}
        background="transparent"
      />
    </SyncedGizmoProvider>
  );
});
