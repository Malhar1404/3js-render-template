import { observer } from 'mobx-react-lite';
import { useState } from 'react';

import { CORNER_LIGHTS_PANEL_STYLES as S } from '../../../constants';
import { useMainContext } from '../../../hooks/useMainContext';
import { CornerLightPatch } from '../../../types';

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
      left: '12px',
      letterSpacing: '0.1em',
      padding: '10px 7px',
      position: 'fixed',
      textTransform: 'uppercase',
      top: '60%',
      transform: 'translateY(-50%)',
      writingMode: 'vertical-rl',
      zIndex: 40,
    }}>
    ☀ Lights
  </button>
);

export const CornerLightsPanel = observer(() => {
  const { design3DManager } = useMainContext();
  const leva = design3DManager.levaManager;
  const [isOpen, setIsOpen] = useState(false);

  const updateLight = <K extends keyof CornerLightPatch>(
    id: number,
    key: K,
    value: NonNullable<CornerLightPatch[K]>,
  ) => {
    leva.setCornerLight(id, { [key]: value });
  };

  const handleSave = () => {
    const data = leva.cornerLights.map((l) => ({
      enabled: l.enabled,
      helper: l.helper,
      id: l.id,
      intensity: l.intensity,
      name: l.name,
      offsetX: l.offsetX,
      offsetY: l.offsetY,
      offsetZ: l.offsetZ,
    }));
    const blob = new Blob([JSON.stringify(data, null, 2)], {
      type: 'application/json',
    });
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
          <button
            type="button"
            style={S.iconBtn}
            onClick={() => setIsOpen(false)}>
            ✕
          </button>
        </div>
      </div>

      {/* Light cards */}
      <div style={S.body}>
        {leva.cornerLights.map((light) => (
          <div
            key={light.id}
            style={{
              ...S.card,
              ...(light.enabled ? S.cardActive : S.cardInactive),
            }}>
            {/* Name + enable toggle */}
            <div style={S.cardHeader}>
              <span style={light.enabled ? S.lightName : S.lightNameDisabled}>
                {light.name}
              </span>
              <label style={S.toggle}>
                <input
                  type="checkbox"
                  checked={light.enabled}
                  onChange={(e) =>
                    updateLight(light.id, 'enabled', e.target.checked)
                  }
                />
                <span style={S.toggleLabel}>
                  {light.enabled ? 'On' : 'Off'}
                </span>
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
                        updateLight(
                          light.id,
                          'intensity',
                          parseFloat(e.target.value),
                        )
                      }
                      style={S.intensitySlider}
                    />
                    <input
                      type="number"
                      min={0}
                      step={0.1}
                      value={light.intensity}
                      onChange={(e) =>
                        updateLight(
                          light.id,
                          'intensity',
                          parseFloat(e.target.value) || 0,
                        )
                      }
                      style={S.input}
                    />
                  </div>
                </div>

                {/* Offsets */}
                <div style={S.row}>
                  {(['offsetX', 'offsetY', 'offsetZ'] as const).map((axis) => (
                    <div key={axis} style={S.fieldGroup}>
                      <span style={S.fieldLabel}>
                        {axis.replace('offset', '')}
                      </span>
                      <input
                        type="number"
                        step={0.1}
                        value={light[axis]}
                        onChange={(e) =>
                          updateLight(
                            light.id,
                            axis,
                            parseFloat(e.target.value) || 0,
                          )
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
                    onChange={(e) =>
                      updateLight(light.id, 'helper', e.target.checked)
                    }
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
