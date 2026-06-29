import { observer } from 'mobx-react-lite';

import { useMainContext } from '../../../hooks/useMainContext';

export const Loader = observer(() => {
  const { designManager } = useMainContext();
  const { viewManager } = designManager;

  if (!viewManager.isModelLoading) return null;

  return (
    <div
      style={{
        alignItems: 'center',
        backdropFilter: 'blur(6px)',
        background: 'rgba(12, 14, 20, 0.7)',
        bottom: 0,
        display: 'flex',
        flexDirection: 'column',
        gap: '14px',
        justifyContent: 'center',
        left: 0,
        position: 'fixed',
        right: 0,
        top: 0,
        zIndex: 9999,
      }}>
      <div
        style={{
          animation: 'spin 1s linear infinite',
          border: '2px solid rgba(255,255,255,0.08)',
          borderRadius: '50%',
          borderTop: '2px solid rgba(255,255,255,0.6)',
          height: '36px',
          width: '36px',
        }}
      />
      <span
        style={{
          color: 'rgba(255,255,255,0.45)',
          fontSize: '11px',
          fontWeight: 600,
          letterSpacing: '0.1em',
          textTransform: 'uppercase',
        }}>
        Loading model...
      </span>
      <style>{'@keyframes spin { to { transform: rotate(360deg); } }'}</style>
    </div>
  );
});
