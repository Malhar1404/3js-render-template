import React, { ReactNode, useState } from 'react';

import { StateManager } from '../state/StateManager';

export const MainContext = React.createContext<StateManager>(
  new StateManager(),
);

export const MainContextProvider = ({ children }: { children: ReactNode }) => {
  const [stateManager] = useState(() => new StateManager());

  return (
    <MainContext.Provider value={stateManager}>{children}</MainContext.Provider>
  );
};

export const useMainContext = () => React.useContext(MainContext);
