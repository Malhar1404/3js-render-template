import { observer } from 'mobx-react-lite';
import { useState } from 'react';

import { useMainContext } from '../../../hooks/useMainContext';
import { CornerLightPatch } from '../../../state/CornerLight';

const panelStyles = {
  backdropFilter: 'blur(14px)',
  background: 'rgba(10, 12, 18, 0.82)',
  border: '1px solid rgba(255, 255, 255, 0.12)',
  borderRadius: '16px',
  color: '#f4f7fb',
  boxShadow: '0 18px 48px rgba(0, 0, 0, 0.32)',
} as const;

const labelStyles = {
  color: 'rgba(244, 247, 251, 0.82)',
  fontSize: '12px',
  letterSpacing: '0.04em',
  textTransform: 'uppercase',
} as const;

const inputStyles = {
  background: 'rgba(255, 255, 255, 0.06)',
  border: '1px solid rgba(255, 255, 255, 0.12)',
  borderRadius: '10px',
  color: '#fff',
  padding: '8px 10px',
  width: '100%',
} as const;

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

  if (!isOpen) {
    return (
      <button
        type="button"
        onClick={() => setIsOpen(true)}
        style={{
          ...panelStyles,
          position: 'fixed',
          left: '16px',
          top: '50%',
          transform: 'translateY(-50%)',
          zIndex: 40,
          padding: '12px 10px',
          cursor: 'pointer',
          writingMode: 'vertical-rl',
          textOrientation: 'mixed',
          letterSpacing: '0.12em',
          fontSize: '12px',
          fontWeight: 600,
        }}>
        Lights
      </button>
    );
  }

  return (
    <div
      style={{
        ...panelStyles,
        position: 'fixed',
        left: '16px',
        top: '50%',
        transform: 'translateY(-50%)',
        zIndex: 40,
        width: '320px',
        maxWidth: 'calc(100vw - 32px)',
        maxHeight: '80vh',
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden',
      }}>
      <div
        style={{
          alignItems: 'center',
          borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
          display: 'flex',
          justifyContent: 'space-between',
          padding: '14px 14px 12px',
        }}>
        <div>
          <div style={{ fontSize: '16px', fontWeight: 700 }}>Corner Lights</div>
          <div style={{ color: 'rgba(244, 247, 251, 0.65)', fontSize: '12px' }}>
            Top 4 model corners
          </div>
        </div>
        <div style={{ display: 'flex', gap: '8px' }}>
          <button
            type="button"
            onClick={() => {
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
            }}
            style={{
              ...inputStyles,
              cursor: 'pointer',
              width: 'auto',
              padding: '8px 12px',
              background: 'rgba(80, 160, 255, 0.18)',
              border: '1px solid rgba(80, 160, 255, 0.4)',
            }}>
            Save JSON
          </button>
          <button
            type="button"
            onClick={() => setIsOpen(false)}
            style={{
              ...inputStyles,
              cursor: 'pointer',
              width: 'auto',
              padding: '8px 12px',
            }}>
            Close
          </button>
        </div>
      </div>

      <div
        style={{
          display: 'grid',
          gap: '12px',
          overflowY: 'auto',
          padding: '14px',
        }}>
        {leva.cornerLights.map((light) => (
          <div
            key={light.id}
            style={{
              background: 'rgba(255, 255, 255, 0.04)',
              border: '1px solid rgba(255, 255, 255, 0.08)',
              borderRadius: '14px',
              display: 'grid',
              gap: '10px',
              padding: '12px',
            }}>
            <div
              style={{
                alignItems: 'center',
                display: 'flex',
                justifyContent: 'space-between',
                gap: '12px',
              }}>
              <div style={{ fontSize: '14px', fontWeight: 700 }}>{light.name}</div>
              <label style={{ alignItems: 'center', display: 'flex', gap: '6px' }}>
                <input
                  type="checkbox"
                  checked={light.enabled}
                  onChange={(event) =>
                    updateLight(light.id, 'enabled', event.target.checked)
                  }
                />
                <span style={labelStyles}>Enabled</span>
              </label>
            </div>

            <label style={{ display: 'grid', gap: '6px' }}>
              <span style={labelStyles}>Intensity</span>
              <input
                type="number"
                min={0}
                step={0.1}
                value={light.intensity}
                onChange={(event) =>
                  updateLight(
                    light.id,
                    'intensity',
                    Number.parseFloat(event.target.value) || 0,
                  )
                }
                style={inputStyles}
              />
            </label>

            <label style={{ alignItems: 'center', display: 'flex', gap: '6px' }}>
              <input
                type="checkbox"
                checked={light.helper}
                onChange={(event) => updateLight(light.id, 'helper', event.target.checked)}
              />
              <span style={labelStyles}>Show Helper</span>
            </label>

            <div style={{ display: 'grid', gap: '10px', gridTemplateColumns: 'repeat(3, 1fr)' }}>
              <label style={{ display: 'grid', gap: '6px' }}>
                <span style={labelStyles}>Offset X</span>
                <input
                  type="number"
                  step={0.1}
                  value={light.offsetX}
                  onChange={(event) =>
                    updateLight(
                      light.id,
                      'offsetX',
                      Number.parseFloat(event.target.value) || 0,
                    )
                  }
                  style={inputStyles}
                />
              </label>

              <label style={{ display: 'grid', gap: '6px' }}>
                <span style={labelStyles}>Offset Y</span>
                <input
                  type="number"
                  step={0.1}
                  value={light.offsetY}
                  onChange={(event) =>
                    updateLight(
                      light.id,
                      'offsetY',
                      Number.parseFloat(event.target.value) || 0,
                    )
                  }
                  style={inputStyles}
                />
              </label>

              <label style={{ display: 'grid', gap: '6px' }}>
                <span style={labelStyles}>Offset Z</span>
                <input
                  type="number"
                  step={0.1}
                  value={light.offsetZ}
                  onChange={(event) =>
                    updateLight(
                      light.id,
                      'offsetZ',
                      Number.parseFloat(event.target.value) || 0,
                    )
                  }
                  style={inputStyles}
                />
              </label>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
});
