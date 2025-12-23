
import React from 'react';
import { Asset } from '../types';

const ASSETS: Asset[] = [
  { id: 'CVN-76', name: 'USS Ronald Reagan', type: 'Carrier', status: 'Operational', location: 'Philippine Sea' },
  { id: 'DDG-54', name: 'USS Curtis Wilbur', type: 'Destroyer', status: 'Deployed', location: 'Taiwan Strait' },
  { id: 'SSN-774', name: 'USS Virginia', type: 'Submarine', status: 'Operational', location: 'East China Sea' },
  { id: 'VFA-102', name: 'Diamondbacks', type: 'Squadron', status: 'Refit', location: 'Atsugi' },
];

const FleetView: React.FC = () => {
  return (
    <div className="p-4 flex flex-col gap-6">
      <div className="flex justify-between items-end border-b border-white/10 pb-3">
        <h3 className="text-white text-sm font-bold uppercase tracking-widest">Fleet Assets</h3>
        <span className="text-[10px] text-slate-500 font-mono uppercase">Theater Sort: Type</span>
      </div>

      <div className="grid grid-cols-1 gap-4">
        {ASSETS.map((asset) => (
          <div key={asset.id} className="bg-surface-dark/40 border border-white/5 rounded-2xl p-4 flex items-center gap-4 group hover:border-white/20 transition-all">
            <div className={`size-12 rounded-xl flex items-center justify-center border ${
              asset.status === 'Operational' ? 'border-emerald-500/30 text-emerald-400 bg-emerald-500/5' :
              asset.status === 'Deployed' ? 'border-primary/30 text-primary bg-primary/5' :
              'border-alert/30 text-alert bg-alert/5'
            }`}>
              <span className="material-symbols-outlined text-2xl">
                {asset.type === 'Carrier' ? 'directions_boat' : 
                 asset.type === 'Squadron' ? 'flight' : 'view_in_ar'}
              </span>
            </div>
            <div className="flex-1">
              <div className="flex justify-between items-center mb-1">
                <h4 className="text-white text-[11px] font-bold uppercase tracking-wider">{asset.name}</h4>
                <span className="text-[9px] font-mono text-slate-500">{asset.id}</span>
              </div>
              <div className="flex gap-3 items-center">
                <span className="text-[10px] text-slate-400 font-mono uppercase">{asset.location}</span>
                <span className={`text-[9px] px-1.5 py-0.5 rounded border uppercase font-bold tracking-tighter ${
                  asset.status === 'Operational' ? 'border-emerald-500/20 text-emerald-500' :
                  asset.status === 'Deployed' ? 'border-primary/20 text-primary' :
                  'border-alert/20 text-alert'
                }`}>{asset.status}</span>
              </div>
            </div>
            <button className="text-slate-600 group-hover:text-white transition-colors">
              <span className="material-symbols-outlined text-lg">arrow_forward_ios</span>
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FleetView;
