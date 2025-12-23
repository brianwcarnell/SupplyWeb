
import React, { useState, useEffect } from 'react';
import { SupplyRoute } from '../types';
import { getSupplyRiskAssessment } from '../services/geminiService';

const ROUTES: SupplyRoute[] = [
  { id: 'SR-01', origin: 'Dar es Salaam', destination: 'Darwin', integrity: 94, status: 'Clear', cargo: 'Fuel/Bulk' },
  { id: 'SR-04', origin: 'San Diego', destination: 'Guam', integrity: 78, status: 'Choke Point', cargo: 'Class V' },
  { id: 'SR-09', origin: 'Atsugi', destination: 'Okinawa', integrity: 42, status: 'Contested', cargo: 'AvGas' },
  { id: 'SR-12', origin: 'Darwin', destination: 'Guam', integrity: 88, status: 'Clear', cargo: 'Med' },
];

const SupplyRiskView: React.FC = () => {
  const [assessment, setAssessment] = useState<string>('');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchAssessment = async () => {
      const data = await getSupplyRiskAssessment();
      setAssessment(data);
      setIsLoading(false);
    };
    fetchAssessment();
  }, []);

  return (
    <div className="p-4 flex flex-col gap-6 animate-in fade-in slide-in-from-bottom duration-500">
      <div className="flex justify-between items-end border-b border-white/10 pb-3">
        <h3 className="text-white text-sm font-bold uppercase tracking-widest flex items-center gap-2">
          <span className="material-symbols-outlined text-primary">route</span>
          Supply Chain Vulnerabilities
        </h3>
        <span className="text-[10px] text-slate-500 font-mono uppercase tracking-tighter">Live Monitor</span>
      </div>

      {/* Global Vulnerability Chart */}
      <div className="bg-surface-dark/40 border border-white/5 rounded-3xl p-5 relative overflow-hidden">
        <div className="flex justify-between items-center mb-6">
          <div className="flex flex-col">
            <span className="text-[10px] text-slate-500 uppercase font-bold tracking-widest">Aggregate Risk</span>
            <span className="text-2xl font-mono font-bold text-alert">ELEVATED</span>
          </div>
          <div className="size-12 rounded-full border-2 border-alert/20 flex items-center justify-center">
            <span className="material-symbols-outlined text-alert animate-pulse">priority_high</span>
          </div>
        </div>
        
        <div className="space-y-4">
          {[
            { label: 'Choke Point Density', val: 72, color: 'bg-alert' },
            { label: 'Attrition Forecast', val: 18, color: 'bg-primary' },
            { label: 'Reroute Capacity', val: 45, color: 'bg-amber-400' },
          ].map((m) => (
            <div key={m.label} className="flex flex-col gap-1">
              <div className="flex justify-between text-[9px] font-mono uppercase text-slate-400">
                <span>{m.label}</span>
                <span>{m.val}%</span>
              </div>
              <div className="h-1.5 w-full bg-slate-800 rounded-full overflow-hidden">
                <div className={`h-full ${m.color}`} style={{ width: `${m.val}%` }} />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Gemini Vulnerability Report */}
      <div className="flex flex-col gap-3">
        <div className="flex items-center gap-2 border-b border-white/5 pb-2">
          <span className="material-symbols-outlined text-primary text-sm">security</span>
          <h4 className="text-white text-[11px] font-bold uppercase tracking-widest">AI Vulnerability Report</h4>
        </div>
        <div className="bg-slate-900/40 p-4 rounded-2xl border border-white/5">
          {isLoading ? (
            <div className="flex flex-col gap-2 animate-pulse">
              <div className="h-2 bg-slate-800 rounded w-full" />
              <div className="h-2 bg-slate-800 rounded w-5/6" />
            </div>
          ) : (
            <div className="text-[10px] font-mono text-slate-300 leading-relaxed whitespace-pre-line">
              {assessment}
            </div>
          )}
        </div>
      </div>

      {/* Active Route Status */}
      <div className="flex flex-col gap-3">
        <h4 className="text-white text-[11px] font-bold uppercase tracking-widest px-1">Tactical Route Status</h4>
        <div className="grid grid-cols-1 gap-2">
          {ROUTES.map((route) => (
            <div key={route.id} className="p-3 bg-surface-dark/30 border border-white/5 rounded-xl flex items-center gap-4">
              <div className={`size-2 rounded-full ${
                route.status === 'Clear' ? 'bg-emerald-500' :
                route.status === 'Choke Point' ? 'bg-amber-500' : 'bg-alert'
              }`} />
              <div className="flex-1">
                <div className="flex justify-between items-center mb-1">
                  <span className="text-white text-[10px] font-bold font-mono">{route.origin} &rarr; {route.destination}</span>
                  <span className="text-[8px] text-slate-500 font-mono">{route.id}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-[9px] text-slate-400 uppercase tracking-tighter">Cargo: {route.cargo}</span>
                  <span className={`text-[9px] font-bold uppercase ${
                    route.integrity > 80 ? 'text-emerald-400' : 
                    route.integrity > 50 ? 'text-amber-400' : 'text-alert'
                  }`}>Integrity: {route.integrity}%</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SupplyRiskView;
