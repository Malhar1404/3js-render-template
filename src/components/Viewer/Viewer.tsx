import { Box, Button, IconButton, Stack, Tooltip } from '@mui/material';
import { observer } from 'mobx-react-lite';

import { useMainContext } from '../../hooks/useMainContext';
import { MeshPanel } from '../MeshPanel/MeshPanel';
import { Viewer3D } from '../Viewer3D/Viewer3D';
import { LayersIcon } from './icons/ViewerIcons';
import { NavBar } from './NavBar/NavBar';

export const Viewer = observer(() => {
  const { design3DManager } = useMainContext();
  const { meshTreeStore } = design3DManager;

  return (
    <Box sx={{ bgcolor: 'white', height: '100vh', width: '100%' }}>
      <NavBar />
      <Box
        sx={{
          height: '100vh',
          position: 'relative',
          width: '100%',
        }}>
        <Viewer3D />

        <MeshPanel />

        <Box
          sx={{
            left: meshTreeStore.isPanelOpen ? 276 : 16,
            position: 'absolute',
            top: 16,
            zIndex: 20,
            transition: 'left 0.2s ease',
            display: 'flex',
            alignItems: 'center',
            gap: 1,
          }}>

          {/* Panel toggle button */}
          <Tooltip title={meshTreeStore.isPanelOpen ? 'Hide Hierarchy' : 'Show Hierarchy'}>
            <IconButton
              onClick={() => meshTreeStore.togglePanel()}
              size="small"
              sx={{
                bgcolor: meshTreeStore.isPanelOpen
                  ? 'rgba(56,189,248,0.15)'
                  : 'rgba(30,30,40,0.75)',
                color: meshTreeStore.isPanelOpen ? '#38bdf8' : '#8b949e',
                border: '1px solid rgba(255,255,255,0.1)',
                backdropFilter: 'blur(8px)',
                '&:hover': {
                  bgcolor: 'rgba(56,189,248,0.2)',
                  color: '#38bdf8',
                },
              }}
            >
              <LayersIcon />
            </IconButton>
          </Tooltip>

          {/* Camera view buttons */}
          <Stack
            direction="row"
            spacing={1}
            sx={{ flexWrap: 'nowrap', justifyContent: 'flex-start' }}>
            <Button
              color="primary"
              onClick={() => design3DManager.cameraManager.viewFront()}
              size="small"
              variant="contained">
              Front
            </Button>
            <Button
              color="primary"
              onClick={() => design3DManager.cameraManager.viewLeft()}
              size="small"
              variant="contained">
              Left
            </Button>
            <Button
              color="primary"
              onClick={() => design3DManager.cameraManager.viewRight()}
              size="small"
              variant="contained">
              Right
            </Button>
            <Button
              color="primary"
              onClick={() => design3DManager.cameraManager.viewBack()}
              size="small"
              variant="contained">
              Back
            </Button>
          </Stack>
        </Box>
      </Box>
    </Box>
  );
});
