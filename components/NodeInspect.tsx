import React from 'react';
import { MapNode } from '../types.ts';

interface NodeInspectProps {
  node: MapNode;
}

const NodeInspect: React.FC<NodeInspectProps> = ({ node }) => {
  return (
    <div className="flex flex-col gap-3 mt-4">
      <h3 className="text-white text-sm font-bold uppercase tracking-wider">Node Inspect</h3>
      <div className="flex flex-col rounded bg-surface-dark border border-white/5 overflow-hidden">
        <div className="flex h-32">
          <div 
            className="w-1/3 bg-cover bg-center relative border-r border-white/5" 
            style={{
              backgroundImage: `url("https://picsum.photos/seed/${node.id}/400/400")`,
              filter: 'grayscale(50%) contrast(1.1)'
            }}
          >
            <div className="absolute inset-0 bg-blue-900/40 mix-blend-multiply" />
            <div className="absolute bottom-2 left-2">
              <div className="bg-black/50 backdrop-blur px-1.5 py-0.5 rounded border border-white/10">
                <span className="text-[10px] text-white font-mono block">{node.id}</span>
              </div>
            </div>
          </div>
          <div className="w-2/3 p-3 flex flex-col gap-2">
            <div className="flex justify-between items-start">
              <div>
                <h4 className="text-white text-sm font-bold leading-tight">{node.name}</h4>
                <p className="text-slate-400 text-[10px] font-mono">GRID: {node.grid} // SECTOR {node.sector}</p>
              </div>
              <div className={`flex items-center gap-1 px-1.5 py-0.5 rounded border ${node.status === 'active' ? 'bg-emerald-500/10 border-emerald-500/20 text-emerald-500' : 'bg-red-500/10 border-red-500/20 text-red-500'}`}>
                <div className={`size-1.5 rounded-full animate-pulse ${node.status === 'active' ? 'bg-emerald-500' : 'bg-red-500'}`} />
                <span className="text-[9px] font-bold uppercase">{node.status}</span>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-2 mt-1">
              <div>
                <span className="text-slate-500 text-[9px] uppercase block">Inbound</span>
                <span className="text-white text-xs font-mono font-bold">{node.inbound}</span>
              </div>
              <div>
                <span className="text-slate-500 text-[9px] uppercase block">Sortie Rate</span>
                <span className="text-white text-xs font-mono font-bold">{node.sortieRate}</span>
              </div>
            </div>
            <div className="flex gap-2 mt-1">
              <button className="flex-1 bg-white/5 hover:bg-white/10 border border-white/10 text-white py-1.5 rounded text-[10px] font-bold uppercase tracking-wide transition-colors">
                Manifest
              </button>
              <button className="flex-1 bg-primary hover:bg-blue-600 text-white py-1.5 rounded text-[10px] font-bold uppercase tracking-wide transition-colors">
                Reroute
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NodeInspect;