
import React from 'react';
import { MapNode } from '../types';

interface MapModuleProps {
  nodes: MapNode[];
  selectedNodeId: string;
  onNodeSelect: (node: MapNode) => void;
  timeOffset: number;
  onTimeChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onTimeRelease: () => void;
}

const MapModule: React.FC<MapModuleProps> = ({ 
  nodes, 
  selectedNodeId, 
  onNodeSelect, 
  timeOffset, 
  onTimeChange,
  onTimeRelease 
}) => {
  return (
    <div className="relative w-full h-[540px] bg-background-dark shrink-0 overflow-hidden">
      {/* Base Map Image - Tactical Dark */}
      <div 
        className="absolute inset-0 bg-cover bg-center opacity-30 scale-105" 
        style={{
          backgroundImage: `url("https://lh3.googleusercontent.com/aida-public/AB6AXuD3l5FiFRR2TL0JnV4DUAnir5pKmGggot-HQdUqtosG1Hu3cJQN0fyk2ZwtWzFtav9-ZWQYv9P5EVOrsGyDfp3LCQ3DxQAFljY7Ql4IZsRCd4IT71_s6J6NhxvavUY-6Td7tyO4BS0DVk7KT79PnjNAuralzTFBBHoKIBEGhQmAcXGYooO1Lx6nILMRnaxR0M__sCZ4iCNugR063dhyDUX_FkXFucInexKa2RrM2WxEROjj185JOHQT81k6YaxjDiLuGsLdCwuzWb4")`,
          filter: 'invert(100%) grayscale(100%) contrast(150%) brightness(50%)'
        }}
      />
      
      {/* HUD Layers */}
      <div className="absolute inset-0 bg-gradient-to-b from-background-dark via-transparent to-background-dark" />
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:30px_30px]" />
      
      {/* Tactical SVG Overlays */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 100 100" preserveAspectRatio="none">
        <defs>
          <pattern id="diagonalHatch" patternUnits="userSpaceOnUse" width="4" height="4" patternTransform="rotate(45 0 0)">
            <line x1="0" y1="0" x2="0" y2="4" style={{stroke:'#ef4444', strokeWidth:1, opacity: 0.2}} />
          </pattern>
        </defs>
        
        {/* Connection Lines */}
        <path className="animate-flow" d="M 20 30 L 52 52" fill="none" stroke="#3b82f6" strokeDasharray="2 2" strokeWidth="0.5" opacity="0.4" />
        <path className="animate-flow" d="M 52 52 L 42 82" fill="none" stroke="#f59e0b" strokeDasharray="2 2" strokeWidth="0.5" opacity="0.4" />
        
        {/* ADIZ / Zones */}
        <circle cx="20" cy="30" r="8" fill="rgba(59, 130, 246, 0.05)" stroke="rgba(59, 130, 246, 0.2)" strokeWidth="0.2" />
        <path d="M 60 40 L 80 40 L 75 60 L 55 60 Z" fill="url(#diagonalHatch)" stroke="#ef4444" strokeWidth="0.2" opacity="0.6" />

        {/* Tactical Markers (Ships/Planes) */}
        <g transform="translate(35, 45)" className="animate-pulse">
          <path d="M -1,0 L 1,0 M 0,-1 L 0,1" stroke="#3b82f6" strokeWidth="0.2" />
          <text x="1.5" y="0.5" fill="#3b82f6" fontSize="1.5" fontFamily="monospace">CVN-76</text>
        </g>
        <g transform="translate(65, 75)">
          <path d="M -1,-1 L 1,1 M 1,-1 L -1,1" stroke="#ef4444" strokeWidth="0.2" />
          <text x="1.5" y="0.5" fill="#ef4444" fontSize="1.5" fontFamily="monospace">UNKNOWN_SIG</text>
        </g>
      </svg>

      {/* Nodes */}
      {nodes.map(node => (
        <div 
          key={node.id}
          onClick={() => onNodeSelect(node)}
          style={{ left: node.coords.x, top: node.coords.y }}
          className={`absolute flex flex-col items-center gap-1 cursor-pointer z-20 -translate-x-1/2 -translate-y-1/2 transition-all duration-300 ${selectedNodeId === node.id ? 'scale-125' : 'hover:scale-110'}`}
        >
          <div className="relative flex items-center justify-center">
            {node.status === 'critical' && <div className="absolute size-8 rounded-full animate-ping bg-red-500/30" />}
            <div className={`relative size-6 bg-slate-900 border-2 rotate-45 flex items-center justify-center transition-all ${node.status === 'critical' ? 'border-red-500 shadow-[0_0_20px_#ef4444]' : node.status === 'warning' ? 'border-amber-500 shadow-[0_0_15px_#f59e0b]' : 'border-primary shadow-[0_0_15px_#135bec]'}`}>
              <span className={`material-symbols-outlined -rotate-45 text-xs ${node.status === 'critical' ? 'text-red-500' : node.status === 'warning' ? 'text-amber-500' : 'text-primary'}`}>
                {node.type === 'HUB' ? 'hub' : node.type === 'APS' ? 'warehouse' : 'location_searching'}
              </span>
            </div>
            {selectedNodeId === node.id && (
              <div className="absolute -inset-2 border border-white/20 rounded-full animate-[spin_4s_linear_infinite]" />
            )}
          </div>
          <div className="bg-black/80 backdrop-blur-md px-2 py-0.5 rounded border border-white/10 mt-2 shadow-xl">
            <span className="text-[9px] font-bold text-white font-mono tracking-tighter">{node.id}</span>
          </div>
        </div>
      ))}

      {/* Time Control Bar */}
      <div className="absolute bottom-12 left-0 right-0 h-32 bg-gradient-to-t from-background-dark via-background-dark/80 to-transparent z-30 flex flex-col justify-end px-6 pb-6">
        <div className="flex justify-between items-end mb-3">
          <div className="flex flex-col">
            <span className="text-[10px] text-primary font-bold uppercase tracking-[0.3em] mb-1">Timeline Projection</span>
            <div className="flex items-baseline gap-2">
              <span className="text-white text-3xl font-mono font-bold leading-none tracking-tighter">T+{timeOffset}</span>
              <span className="text-slate-400 text-sm font-mono uppercase">HOURS</span>
            </div>
          </div>
        </div>
        <div className="relative w-full h-8 flex items-center">
          <input 
            className="w-full relative z-10 accent-primary" 
            type="range" 
            min="0" 
            max="48" 
            value={timeOffset} 
            onChange={onTimeChange}
            onMouseUp={onTimeRelease}
            onTouchEnd={onTimeRelease}
          />
        </div>
        <div className="flex justify-between text-[9px] text-slate-500 font-mono font-bold mt-1 uppercase tracking-widest">
          <span>SITUATION_NOW</span>
          <span>+24H_EST</span>
          <span>+48H_MAX_PRED</span>
        </div>
      </div>
    </div>
  );
};

export default MapModule;
