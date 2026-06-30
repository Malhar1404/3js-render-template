import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Leva } from 'leva';
import { observer } from 'mobx-react-lite';
import { SnackbarProvider } from 'notistack';

import { MainContextProvider } from './hooks/useMainContext';
import { Router } from './router/Router';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: false,
    },
  },
});

const TITLE_BAR = {
  drag: true,
  position: { x: 0, y: 70 },
} as const;

export const App = observer(() => {
  return (
    <QueryClientProvider client={queryClient}>
      <SnackbarProvider
        maxSnack={3}
        anchorOrigin={{ horizontal: 'right', vertical: 'top' }}>
        <MainContextProvider>
          <Leva collapsed titleBar={TITLE_BAR} />
          <Router />
        </MainContextProvider>
      </SnackbarProvider>
    </QueryClientProvider>
  );
});
