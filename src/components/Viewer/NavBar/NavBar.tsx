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
    if (file) {
      if (previousBlobUrlRef.current)
        URL.revokeObjectURL(previousBlobUrlRef.current);
      const blobUrl = URL.createObjectURL(file);
      previousBlobUrlRef.current = blobUrl;
      viewManager.setGlbUrl(blobUrl);
    }
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  return (
    <>
      <input
        ref={fileInputRef}
        type="file"
        accept=".glb"
        style={{ display: 'none' }}
        onChange={handleFileChange}
      />
      <button
        onClick={() => fileInputRef.current?.click()}
        style={{
          backdropFilter: 'blur(20px)',
          background: 'rgba(12,14,20,0.88)',
          border: '1px solid rgba(255,255,255,0.08)',
          borderRadius: '8px',
          color: '#e8edf4',
          cursor: 'pointer',
          fontSize: '12px',
          fontWeight: 600,
          letterSpacing: '0.08em',
          padding: '8px 14px',
          position: 'fixed',
          right: '12px',
          textTransform: 'uppercase',
          top: '12px',
          zIndex: 1300,
        }}>
        Load GLB
      </button>
    </>
  );
});
