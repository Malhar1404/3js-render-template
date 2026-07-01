import { observer } from 'mobx-react-lite';

import { useMainContext } from '../../hooks/useMainContext';

import './MeshPanel.css';
import { MeshPanelRow } from './MeshPanelRow';

export const MeshPanel = observer(() => {
  const { design3DManager } = useMainContext();
  const { meshTreeStore } = design3DManager;

  return (
    <div className="absolute top-0 left-0 w-64 h-full flex flex-col z-10 border-r border-white/[0.07] overflow-hidden"
      style={{ background: 'rgba(15, 17, 23, 0.82)', backdropFilter: 'blur(16px)' }}>

      {/* Header */}
      <div className="flex items-center justify-between px-3.5 py-3 border-b border-white/[0.07] shrink-0">
        <span className="text-[11px] font-semibold tracking-widest uppercase text-[#8b949e]">
          Scene Hierarchy
        </span>
        <span className="text-[10px] text-[#484f58] tabular-nums">
          {meshTreeStore.nodes.size} nodes
        </span>
      </div>

      {/* Scrollable tree */}
      <div className="mesh-panel-scroll flex-1 overflow-y-auto overflow-x-hidden py-1">
        {meshTreeStore.rootIds.length === 0 ? (
          <div className="px-3.5 py-5 text-[11px] text-[#484f58] text-center">
            No model loaded
          </div>
        ) : (
          meshTreeStore.rootIds.map((id) => (
            <MeshPanelRow key={id} id={id} depth={0} />
          ))
        )}
      </div>
    </div>
  );
});
