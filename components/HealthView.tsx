import React, { useState, useEffect } from 'react';
import { getHealthPrognosis } from '../services/geminiService.ts';

const HealthView: React.FC = () => {
  const [prognosis, setPrognosis] = useState<string>('');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchPrognosis = async () => {
      const data = await getHealthPrognosis();
      setPrognosis(data);
      setIsLoading(false);
    };
    fetchPrognosis();
  }, []);

  return (
    <div className="p-4 flex flex-col gap-6 animate-in fade-in slide-in-from-bottom duration-500">
      <div className="flex justify-between items-end border-b border-white/10 pb-3">
        <h3 className="text-white text-sm font-bold uppercase tracking-widest flex items-center gap-2">
          <span className="material-symbols-outlined text-primary">health_and_safety</span>
          Theater Health Analysis
        </h3>
        <span className="text-[10px] text-slate-500 font-mono uppercase tracking-tighter">7D Forecast</span>
      </div>

      {/* Main Health Gauge */}
      <div className="flex flex-col items-center justify-center p-8 bg-surface-dark/40 rounded-3xl border border-white/5 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/5 to-transparent" />
        <div className="relative size-40 flex items-center justify-center">
          <svg className="size-full -rotate-90" viewBox="0 0 100 100">
            <circle className="text-slate-800" strokeWidth="6" stroke="currentColor" fill="transparent" r="40" cx="50" cy="50" />
            <circle 
              className="text-emerald-500 transition-all duration-1000 ease-out" 
              strokeWidth="6" 
              strokeDasharray="251.2" 
              strokeDashoffset="20" // 92% readiness
              strokeLinecap="round" 
              stroke="currentColor" 
              fill="transparent" 
              r="40" 
              cx="50" 
              cy="50" 
            />
          </svg>
          <div className="absolute flex flex-col items-center">
            <span className="text-4xl font-mono font-bold text-white tracking-tighter">92</span>
            <span className="text-[9px] text-emerald-400 font-bold uppercase tracking-[0.2em]">Ready</span>
          </div>
        </div>
        <p className="mt-4 text-[10px] text-slate-400 font-mono uppercase tracking-widest">Theater Readiness Index</p>
      </div>

      {/* Sub-Health Metrics */}
      <div className="grid grid-cols-2 gap-3">
        {[
          { label: 'Cyber Mesh', val: '100%', status: 'Nominal', color: 'text-emerald-400' },
          { label: 'Supply Integrity', val: '64%', status: 'Degraded', color: 'text-amber-400' },
          { label: 'Comm Uplink', val: '98%', status: 'Nominal', color: 'text-emerald-400' },
          { label: 'Power Grid', val: '89%', status: 'Stable', color: 'text-emerald-400' },
        ].map((m) => (
          <div key={m.label} className="p-3 bg-surface-dark/40 border border-white/5 rounded-2xl">
            <span className="text-[9px] text-slate-500 uppercase font-bold block mb-1">{m.label}</span>
            <div className="flex justify-between items-baseline">
              <span className="text-lg font-mono font-bold text-white">{m.val}</span>
              <span className={`text-[9px] font-bold uppercase ${m.color}`}>{m.status}</span>
            </div>
          </div>
        ))}
      </div>

      {/* AI Prognosis Report */}
      <div className="flex flex-col gap-3">
        <div className="flex items-center gap-2 border-b border-white/5 pb-2">
          <span className="material-symbols-outlined text-primary text-sm">stethoscope</span>
          <h4 className="text-white text-[11px] font-bold uppercase tracking-widest">AI Strategic Prognosis</h4>
        </div>
        <div className="bg-slate-900/60 p-4 rounded-2xl border border-white/5 shadow-inner">
          {isLoading ? (
            <div className="flex flex-col gap-2 animate-pulse">
              <div className="h-2 bg-slate-800 rounded w-full" />
              <div className="h-2 bg-slate-800 rounded w-3/4" />
              <div className="h-2 bg-slate-800 rounded w-5/6" />
            </div>
          ) : (
            <div className="text-[10px] font-mono text-slate-300 leading-relaxed space-y-2 whitespace-pre-line">
              {prognosis}
            </div>
          )}
        </div>
      </div>
      
      {/* Maintenance Schedule */}
      <div className="flex flex-col gap-3">
        <h4 className="text-white text-[11px] font-bold uppercase tracking-widest px-1">Planned Maintenance</h4>
        <div className="space-y-2">
          {[
            { item: 'Okinawa SATCOM Array', time: 'T-24H', type: 'Critical' },
            { item: 'Guam Local Power Gen-2', time: 'T-48H', type: 'Routine' }
          ].map((item, i) => (
            <div key={i} className="flex justify-between items-center p-3 bg-surface-dark/20 border border-white/5 rounded-xl">
              <div className="flex flex-col">
                <span className="text-[10px] text-white font-bold">{item.item}</span>
                <span className="text-[9px] text-slate-500 font-mono uppercase">{item.time}</span>
              </div>
              <span className={`text-[8px] px-2 py-0.5 rounded border font-bold uppercase ${item.type === 'Critical' ? 'border-amber-500/20 text-amber-500' : 'border-slate-500/20 text-slate-500'}`}>
                {item.type}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HealthView;