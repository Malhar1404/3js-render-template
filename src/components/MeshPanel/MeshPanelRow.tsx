import { observer } from 'mobx-react-lite';
import { useEffect, useRef } from 'react';

import { useMainContext } from '../../hooks/useMainContext';
import { MeshSceneNode } from '../../state/MeshSceneNode';
import { MeshPanelRowProps } from '../../types';
import {
  IconChevronRight,
  IconEyeClosed,
  IconEyeOpen,
  IconGroup,
  IconMesh,
} from './icons/MeshPanelIcons';

export const MeshPanelRow = observer(({ id, depth }: MeshPanelRowProps) => {
  const { design3DManager } = useMainContext();
  const { meshTreeStore } = design3DManager;

  const node = meshTreeStore.nodes.get(id);
  const expanded = meshTreeStore.expandedIds.has(id);

  if (!node) return null;

  const isMesh = node instanceof MeshSceneNode;
  const hasChildren = node.childIds.length > 0;
  const isSelected = meshTreeStore.selectedId === id;
  const rowRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isSelected && rowRef.current) {
      rowRef.current.scrollIntoView({ behavior: 'auto', block: 'start' });
    }
  }, [isSelected]);

  const handleRowClick = () => {
    meshTreeStore.selectNode(isSelected ? null : id);
  };

  const handleEyeClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    node.toggleVisibility();
  };

  const handleExpandClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    meshTreeStore.toggleExpand(id);
  };

  return (
    <div>
      {/* ── Row ────────────────────────────────────────────────── */}
      <div
        ref={rowRef}
        className={[
          // Base: group for group-hover to work on children
          'group flex items-center h-7 pr-2 cursor-pointer select-none transition-colors duration-100',
          // Indentation via inline padding (dynamic depth value)
          // Selection state
          isSelected
            ? 'bg-sky-400/10 border-l-2 border-sky-400'
            : 'border-l-2 border-transparent hover:bg-white/[0.05]',
          // Hidden state dims the name/icon
          !node.isVisible ? 'opacity-50' : '',
        ].join(' ')}
        style={{ paddingLeft: `${8 + depth * 16}px` }}
        onClick={handleRowClick}>
        {/* Expand chevron */}
        <button
          className={[
            'flex items-center justify-center w-4 h-4 shrink-0 rounded bg-transparent border-0 p-0 cursor-pointer transition-all duration-150',
            'text-[#484f58] hover:text-[#8b949e] hover:bg-white/[0.06]',
            hasChildren ? '' : 'invisible pointer-events-none',
            expanded && hasChildren ? 'rotate-90' : '',
          ].join(' ')}
          onClick={hasChildren ? handleExpandClick : undefined}>
          <IconChevronRight />
        </button>

        {/* Type icon */}
        <span
          className={`flex items-center justify-center shrink-0 w-3.5 ml-0.5 ${isMesh ? 'text-sky-400' : 'text-amber-400'}`}>
          {isMesh ? <IconMesh /> : <IconGroup />}
        </span>

        {/* Name */}
        <span
          className="flex-1 min-w-0 mx-1.5 text-[12px] text-[#8b949e] truncate transition-colors duration-100"
          title={node.name}>
          {node.name}
        </span>

        {/* Eye toggle — hidden by default, shown on group-hover OR when already hidden */}
        <button
          className={[
            'flex items-center justify-center w-5 h-5 shrink-0 rounded bg-transparent border-0 p-0 cursor-pointer transition-all duration-150',
            // Always visible when node is hidden, otherwise only on row hover
            node.isVisible
              ? 'opacity-0 group-hover:opacity-100 text-[#484f58] hover:text-[#c9d1d9] hover:bg-white/[0.08]'
              : 'opacity-100 text-[#30363d] hover:text-[#c9d1d9] hover:bg-white/[0.08]',
          ].join(' ')}
          onClick={handleEyeClick}
          title={node.isVisible ? 'Hide' : 'Show'}>
          {node.isVisible ? <IconEyeOpen /> : <IconEyeClosed />}
        </button>
      </div>

      {/* ── Children (recursive) ─────────────────────────────── */}
      {hasChildren && expanded && (
        <div>
          {node.childIds.map((childId) => (
            <MeshPanelRow key={childId} id={childId} depth={depth + 1} />
          ))}
        </div>
      )}
    </div>
  );
});
