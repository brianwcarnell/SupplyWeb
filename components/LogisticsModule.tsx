import React from 'react';
import { LogisticsStatus } from '../types.ts';

interface LogisticsModuleProps {
  data: LogisticsStatus[];
}

const LogisticsModule: React.FC<LogisticsModuleProps> = ({ data }) => {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex justify-between items-end border-b border-white/5 pb-2">
        <h3 className="text-white text-[11px] font-bold uppercase tracking-widest flex items-center gap-2">
          <span className="material-symbols-outlined text-primary text-sm">inventory_2</span>
          Theater Logistics (Aggregate)
        </h3>
        <span className="text-[9px] text-slate-500 font-mono font-bold animate-pulse uppercase">Syncing...</span>
      </div>
      <div className="grid grid-cols-3 gap-3">
        {data.map(item => (
          <div key={item.id} className="group relative flex flex-col gap-2 p-3 rounded-xl bg-surface-dark/40 border border-white/5 hover:border-white/10 transition-all cursor-help">
            <div className="flex justify-between items-start">
              <span className="text-[9px] text-slate-400 font-bold uppercase tracking-tighter leading-none">{item.label}</span>
              <span className={`text-[11px] font-mono font-bold ${item.value < 40 ? 'text-alert' : 'text-emerald-400'}`}>{item.value}%</span>
            </div>
            
            <div className="h-10 w-full relative">
              <svg width="100%" height="100%" viewBox="0 0 100 40" preserveAspectRatio="none">
                <path 
                  className="sparkline-path" 
                  fill="none" 
                  stroke={item.color} 
                  strokeWidth="2" 
                  vectorEffect="non-scaling-stroke" 
                  d={`M 0,${40 - item.trend[0]/3} ${item.trend.map((val, idx) => `L ${idx * 20},${40 - val/3}`).join(' ')}`}
                />
                <path 
                  fill={`url(#grad-${item.id})`}
                  opacity="0.2"
                  d={`M 0,${40 - item.trend[0]/3} ${item.trend.map((val, idx) => `L ${idx * 20},${40 - val/3}`).join(' ')} L 100,40 L 0,40 Z`}
                />
                <defs>
                  <linearGradient id={`grad-${item.id}`} x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stopColor={item.color} />
                    <stop offset="100%" stopColor="transparent" />
                  </linearGradient>
                </defs>
              </svg>
            </div>

            <div className="w-full bg-slate-800 h-1 rounded-full overflow-hidden">
              <div 
                className="h-full transition-all duration-1000 ease-out" 
                style={{ width: `${item.value}%`, backgroundColor: item.color }} 
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LogisticsModule;