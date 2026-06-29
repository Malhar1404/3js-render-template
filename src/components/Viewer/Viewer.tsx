import { Box, Button, Stack } from '@mui/material';
import { observer } from 'mobx-react-lite';

import { useMainContext } from '../../hooks/useMainContext';
import { Viewer3D } from '../Viewer3D/Viewer3D';
import { NavBar } from './NavBar/NavBar';

export const Viewer = observer(() => {
  const { design3DManager } = useMainContext();

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
        <Box
          sx={{
            left: 16,
            position: 'absolute',
            top: 16,
            zIndex: 20,
          }}>
          <Stack
            direction="row"
            spacing={1}
            sx={{
              flexWrap: 'nowrap',
              justifyContent: 'flex-start',
            }}>
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
