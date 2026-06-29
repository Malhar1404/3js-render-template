import { useCallback, useEffect, useState } from 'react';

import { MeshInfo } from '../core/MeshInfo';
import { Logger } from '../utils/Logger';
import { Utils3D } from '../utils/Utils3D';

export const useMeshParser = (url: string | undefined | null, onLoaded?: () => void) => {
  const [state, setState] = useState({
    isLoaded: false,
    meshInfo: [] as MeshInfo[],
  });

  const loader = useCallback(async () => {
    if (!url) {
      setState({ isLoaded: false, meshInfo: [] });
      return;
    }

    setState({ isLoaded: false, meshInfo: [] });

    try {
      const nodes = await Utils3D.loadNodeMapForGLTF(url);
      const meshCore = Object.values(nodes).flat().map((mesh) => MeshInfo.parseMeshInfo(mesh));
      setState({ isLoaded: true, meshInfo: meshCore });
      onLoaded?.();
    } catch (error) {
      Logger.error(`Error loading GLB file: ${error}`);
      setState({ isLoaded: false, meshInfo: [] });
    }
  }, [url]);

  useEffect(() => {
    loader();
  }, [loader]);

  return state;
};
