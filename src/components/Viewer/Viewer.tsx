import { Box } from '@mui/material';
import { observer } from 'mobx-react-lite';

import { useMainContext } from '../../hooks/useMainContext';
import { MeshPanel } from '../MeshPanel/MeshPanel';
import { Viewer3D } from '../Viewer3D/Viewer3D';
import { NavBar } from './NavBar/NavBar';

export const Viewer = observer(() => {
  const { design3DManager } = useMainContext();

  return (
    <Box sx={{ bgcolor: 'white', height: '100vh', width: '100%' }}>
      <NavBar />
      <Box sx={{ height: '100vh', position: 'relative', width: '100%' }}>
        <Viewer3D />
        <MeshPanel />
      </Box>
    </Box>
  );
});
