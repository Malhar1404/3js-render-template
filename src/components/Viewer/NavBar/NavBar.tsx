import { observer } from 'mobx-react-lite';
import { useRef } from 'react';

import { useMainContext } from '../../../hooks/useMainContext';

export const NavBar = observer(() => {
  const { designManager } = useMainContext();
  const { viewManager } = designManager;
  const fileInputRef = useRef<HTMLInputElement>(null);
  const previousBlobUrlRef = useRef<string | null>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    if (previousBlobUrlRef.current) {
      URL.revokeObjectURL(previousBlobUrlRef.current);
    }

    const blobUrl = URL.createObjectURL(file);
    previousBlobUrlRef.current = blobUrl;
    viewManager.setGlbUrl(blobUrl);

    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const isLoading = viewManager.isModelLoading;

  return (
    <>
      <input
        ref={fileInputRef}
        type="file"
        accept=".glb,.gltf"
        style={{ display: 'none' }}
        onChange={handleFileChange}
      />

      <button
        id="load-glb-btn"
        onClick={() => !isLoading && fileInputRef.current?.click()}
        disabled={isLoading}
        style={{
          alignItems: 'center',
          backdropFilter: 'blur(20px)',
          background: isLoading
            ? 'rgba(12,14,20,0.55)'
            : 'rgba(12,14,20,0.88)',
          border: isLoading
            ? '1px solid rgba(255,255,255,0.04)'
            : '1px solid rgba(255,255,255,0.08)',
          borderRadius: '8px',
          color: isLoading ? 'rgba(232,237,244,0.45)' : '#e8edf4',
          cursor: isLoading ? 'not-allowed' : 'pointer',
          display: 'flex',
          fontSize: '12px',
          fontWeight: 600,
          gap: '8px',
          letterSpacing: '0.08em',
          padding: '8px 14px',
          position: 'fixed',
          right: '12px',
          textTransform: 'uppercase',
          top: '12px',
          transition: 'background 0.2s, color 0.2s, border 0.2s',
          zIndex: 1300,
        }}>
        {isLoading && (
          <span
            style={{
              animation: 'spin 0.9s linear infinite',
              border: '2px solid rgba(255,255,255,0.15)',
              borderRadius: '50%',
              borderTopColor: '#e8edf4',
              display: 'inline-block',
              height: '12px',
              width: '12px',
            }}
          />
        )}
        {isLoading ? 'Loading…' : 'Load GLB'}
      </button>

      {isLoading && (
        <div
          style={{
            alignItems: 'center',
            background: 'rgba(10,12,18,0.72)',
            backdropFilter: 'blur(6px)',
            bottom: 0,
            display: 'flex',
            flexDirection: 'column',
            gap: '16px',
            justifyContent: 'center',
            left: 0,
            position: 'fixed',
            right: 0,
            top: 0,
            zIndex: 1200,
          }}>
          <div
            style={{
              animation: 'spin 1s linear infinite',
              border: '3px solid rgba(255,255,255,0.12)',
              borderRadius: '50%',
              borderTopColor: 'rgba(255,255,255,0.85)',
              height: '48px',
              width: '48px',
            }}
          />
          <p
            style={{
              color: 'rgba(232,237,244,0.7)',
              fontSize: '13px',
              fontWeight: 500,
              letterSpacing: '0.06em',
              margin: 0,
              textTransform: 'uppercase',
            }}>
            Loading model…
          </p>
        </div>
      )}

      <style>{`
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
      `}</style>
    </>
  );
});
