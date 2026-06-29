import { observer } from 'mobx-react-lite';
import { useState } from 'react';

import { useMainContext } from '../../../hooks/useMainContext';
import { CornerLightPatch } from '../../../state/CornerLight';

const S = {
  panel: {
    backdropFilter: 'blur(20px)',
    background: 'rgba(12, 14, 20, 0.88)',
    border: '1px solid rgba(255,255,255,0.08)',
    borderRadius: '12px',
    boxShadow: '0 8px 32px rgba(0,0,0,0.4)',
    color: '#e8edf4',
    display: 'flex',
    flexDirection: 'column',
    maxHeight: '70vh',
    overflow: 'hidden',
    position: 'fixed' as const,
    left: '12px',
    top: '60%',
    transform: 'translateY(-50%)',
    width: '260px',
    zIndex: 40,
  },
  header: {
    alignItems: 'center',
    borderBottom: '1px solid rgba(255,255,255,0.07)',
    display: 'flex',
    justifyContent: 'space-between',
    padding: '10px 12px',
  },
  title: {
    fontSize: '12px',
    fontWeight: 600,
    letterSpacing: '0.08em',
    textTransform: 'uppercase' as const,
    color: 'rgba(255,255,255,0.5)',
  },
  headerActions: {
    display: 'flex',
    gap: '6px',
  },
  iconBtn: {
    alignItems: 'center',
    background: 'transparent',
    border: '1px solid rgba(255,255,255,0.1)',
    borderRadius: '6px',
    color: 'rgba(255,255,255,0.5)',
    cursor: 'pointer',
    display: 'flex',
    fontSize: '11px',
    justifyContent: 'center',
    padding: '4px 8px',
  },
  body: {
    display: 'flex',
    flexDirection: 'column' as const,
    gap: '4px',
    overflowY: 'auto' as const,
    padding: '8px',
  },
  card: {
    borderRadius: '8px',
    padding: '8px 10px',
    display: 'flex',
    flexDirection: 'column' as const,
    gap: '8px',
  },
  cardActive: {
    background: 'rgba(255,255,255,0.04)',
    border: '1px solid rgba(255,255,255,0.08)',
  },
  cardInactive: {
    background: 'transparent',
    border: '1px solid rgba(255,255,255,0.04)',
  },
  cardHeader: {
    alignItems: 'center',
    display: 'flex',
    justifyContent: 'space-between',
  },
  lightName: {
    fontSize: '12px',
    fontWeight: 600,
    color: '#e8edf4',
  },
  lightNameDisabled: {
    fontSize: '12px',
    fontWeight: 600,
    color: 'rgba(255,255,255,0.3)',
  },
  toggle: {
    alignItems: 'center',
    cursor: 'pointer',
    display: 'flex',
    gap: '5px',
  },
  toggleLabel: {
    fontSize: '10px',
    letterSpacing: '0.06em',
    textTransform: 'uppercase' as const,
    color: 'rgba(255,255,255,0.4)',
  },
  row: {
    alignItems: 'center',
    display: 'grid',
    gap: '6px',
    gridTemplateColumns: '1fr 1fr 1fr',
  },
  fieldGroup: {
    display: 'flex',
    flexDirection: 'column' as const,
    gap: '3px',
  },
  fieldLabel: {
    color: 'rgba(255,255,255,0.35)',
    fontSize: '9px',
    letterSpacing: '0.07em',
    textTransform: 'uppercase' as const,
  },
  input: {
    background: 'rgba(255,255,255,0.05)',
    border: '1px solid rgba(255,255,255,0.08)',
    borderRadius: '6px',
    color: '#e8edf4',
    fontSize: '11px',
    padding: '4px 6px',
    width: '100%',
    boxSizing: 'border-box' as const,
  },
  intensityRow: {
    alignItems: 'center',
    display: 'grid',
    gap: '6px',
    gridTemplateColumns: '1fr 52px',
  },
  intensitySlider: {
    accentColor: '#4f8ef7',
    cursor: 'pointer',
    width: '100%',
  },
  helperRow: {
    alignItems: 'center',
    display: 'flex',
    gap: '5px',
  },
} as const;

const CollapsedBtn = ({ onClick }: { onClick: () => void }) => (
  <button
    type="button"
    onClick={onClick}
    style={{
      backdropFilter: 'blur(20px)',
      background: 'rgba(12, 14, 20, 0.88)',
      border: '1px solid rgba(255,255,255,0.08)',
      borderRadius: '8px',
      boxShadow: '0 4px 16px rgba(0,0,0,0.3)',
      color: 'rgba(255,255,255,0.5)',
      cursor: 'pointer',
      fontSize: '10px',
      fontWeight: 600,
      letterSpacing: '0.1em',
      padding: '10px 7px',
      position: 'fixed',
      left: '12px',
      top: '60%',
      transform: 'translateY(-50%)',
      textTransform: 'uppercase',
      writingMode: 'vertical-rl',
      zIndex: 40,
    }}>
    ☀ Lights
  </button>
);

export const CornerLightsPanel = observer(() => {
  const { design3DManager } = useMainContext();
  const leva = design3DManager.levaManager;
  const [isOpen, setIsOpen] = useState(true);

  const updateLight = <K extends keyof CornerLightPatch>(
    id: number,
    key: K,
    value: NonNullable<CornerLightPatch[K]>,
  ) => {
    leva.setCornerLight(id, { [key]: value });
  };

  const handleSave = () => {
    const data = leva.cornerLights.map((l) => ({
      id: l.id,
      name: l.name,
      enabled: l.enabled,
      intensity: l.intensity,
      offsetX: l.offsetX,
      offsetY: l.offsetY,
      offsetZ: l.offsetZ,
      helper: l.helper,
    }));
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'corner-lights.json';
    a.click();
    URL.revokeObjectURL(url);
  };

  if (!isOpen) return <CollapsedBtn onClick={() => setIsOpen(true)} />;

  return (
    <div style={S.panel}>
      {/* Header */}
      <div style={S.header}>
        <span style={S.title}>Lights</span>
        <div style={S.headerActions}>
          <button type="button" style={S.iconBtn} onClick={handleSave}>
            ↓ JSON
          </button>
          <button type="button" style={S.iconBtn} onClick={() => setIsOpen(false)}>
            ✕
          </button>
        </div>
      </div>

      {/* Light cards */}
      <div style={S.body}>
        {leva.cornerLights.map((light) => (
          <div
            key={light.id}
            style={{ ...S.card, ...(light.enabled ? S.cardActive : S.cardInactive) }}>
            {/* Name + enable toggle */}
            <div style={S.cardHeader}>
              <span style={light.enabled ? S.lightName : S.lightNameDisabled}>
                {light.name}
              </span>
              <label style={S.toggle}>
                <input
                  type="checkbox"
                  checked={light.enabled}
                  onChange={(e) => updateLight(light.id, 'enabled', e.target.checked)}
                />
                <span style={S.toggleLabel}>{light.enabled ? 'On' : 'Off'}</span>
              </label>
            </div>

            {light.enabled && (
              <>
                {/* Intensity slider + number */}
                <div style={S.fieldGroup}>
                  <span style={S.fieldLabel}>Intensity</span>
                  <div style={S.intensityRow}>
                    <input
                      type="range"
                      min={0}
                      max={3}
                      step={0.01}
                      value={light.intensity}
                      onChange={(e) =>
                        updateLight(light.id, 'intensity', parseFloat(e.target.value))
                      }
                      style={S.intensitySlider}
                    />
                    <input
                      type="number"
                      min={0}
                      step={0.1}
                      value={light.intensity}
                      onChange={(e) =>
                        updateLight(light.id, 'intensity', parseFloat(e.target.value) || 0)
                      }
                      style={S.input}
                    />
                  </div>
                </div>

                {/* Offsets */}
                <div style={S.row}>
                  {(['offsetX', 'offsetY', 'offsetZ'] as const).map((axis) => (
                    <div key={axis} style={S.fieldGroup}>
                      <span style={S.fieldLabel}>{axis.replace('offset', '')}</span>
                      <input
                        type="number"
                        step={0.1}
                        value={light[axis]}
                        onChange={(e) =>
                          updateLight(light.id, axis, parseFloat(e.target.value) || 0)
                        }
                        style={S.input}
                      />
                    </div>
                  ))}
                </div>

                {/* Helper */}
                <label style={S.helperRow}>
                  <input
                    type="checkbox"
                    checked={light.helper}
                    onChange={(e) => updateLight(light.id, 'helper', e.target.checked)}
                  />
                  <span style={S.fieldLabel}>Show Helper</span>
                </label>
              </>
            )}
          </div>
        ))}
      </div>
    </div>
  );
});
