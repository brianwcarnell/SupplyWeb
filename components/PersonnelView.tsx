
import React from 'react';

const READINESS = [
  { unit: '7th Fleet', value: 94, status: 'Full' },
  { unit: 'USARPAC', value: 82, status: 'Marginal' },
  { unit: 'PACAF', value: 88, status: 'Ready' },
  { unit: 'MARFORPAC', value: 91, status: 'Full' },
];

const PersonnelView: React.FC = () => {
  return (
    <div className="p-4 flex flex-col gap-6">
      <div className="flex justify-between items-end border-b border-white/10 pb-3">
        <h3 className="text-white text-sm font-bold uppercase tracking-widest">Personnel Readiness</h3>
        <span className="text-[10px] text-slate-500 font-mono uppercase">Updated: 1400Z</span>
      </div>

      <div className="flex flex-col gap-5">
        {READINESS.map((item) => (
          <div key={item.unit} className="flex flex-col gap-3">
            <div className="flex justify-between items-center px-1">
              <span className="text-white text-[10px] font-bold uppercase tracking-[0.2em]">{item.unit}</span>
              <span className={`text-[10px] font-mono font-bold ${item.value > 90 ? 'text-emerald-400' : 'text-amber-400'}`}>{item.value}%</span>
            </div>
            <div className="h-2 w-full bg-slate-800 rounded-full overflow-hidden border border-white/5 p-[1px]">
              <div 
                className={`h-full rounded-full transition-all duration-1000 ${
                  item.value > 90 ? 'bg-emerald-500' : 'bg-amber-500'
                }`} 
                style={{ width: `${item.value}%` }} 
              />
            </div>
            <div className="flex justify-between items-center text-[9px] font-mono uppercase text-slate-500 px-1">
              <span>Status: {item.status}</span>
              <span>Deployable: {Math.floor(item.value * 1.2)}K</span>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-4 p-4 bg-primary/5 border border-primary/20 rounded-2xl flex items-center gap-4">
        <div className="size-10 rounded-full bg-primary/10 flex items-center justify-center text-primary">
          <span className="material-symbols-outlined text-xl">info</span>
        </div>
        <p className="text-[10px] text-slate-300 leading-relaxed font-mono">
          Deployment window for PACOM Bravo units is currently [LOCKED] per command directive 44-X.
        </p>
      </div>
    </div>
  );
};

export default PersonnelView;
