import { createContext, useContext } from 'react';

import type { SyncedGizmoContextValue } from './types';

export const SyncedGizmoContext = createContext<SyncedGizmoContextValue | null>(null);

export const useSyncedGizmoContext = (): SyncedGizmoContextValue => {
  const ctx = useContext(SyncedGizmoContext);
  if (!ctx) {
    throw new Error('useSyncedGizmoContext must be used inside <SyncedGizmoProvider>');
  }
  return ctx;
};
