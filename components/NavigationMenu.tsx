import React from 'react';
import { AppPage } from '../types.ts';

interface NavigationMenuProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigate: (page: AppPage) => void;
  currentPage: AppPage;
}

const NavigationMenu: React.FC<NavigationMenuProps> = ({ isOpen, onClose, onNavigate, currentPage }) => {
  const menuItems: { id: AppPage; label: string; icon: string }[] = [
    { id: 'COP', label: 'Theater COP', icon: 'dashboard' },
    { id: 'Fleet', label: 'Fleet Assets', icon: 'directions_boat' },
    { id: 'Personnel', label: 'Personnel Readiness', icon: 'groups' },
    { id: 'Messaging', label: 'Secure Messaging', icon: 'encrypted' },
    { id: 'MissionPlanning', label: 'Mission Planning', icon: 'architecture' },
    { id: 'Transactions', label: 'Logistics Transactions', icon: 'swap_horiz' },
    { id: 'SupplyRisk', label: 'Supply Chain Risk', icon: 'route' },
    { id: 'Health', label: 'Predictive Health', icon: 'health_and_safety' },
    { id: 'Intel', label: 'Intelligence Feed', icon: 'visibility' },
  ];

  if (!isOpen) return null;

  return (
    <div className="absolute inset-0 z-[60] flex animate-in fade-in duration-300">
      <div className="w-64 bg-background-dark/95 backdrop-blur-2xl border-r border-white/10 flex flex-col p-6 animate-in slide-in-from-left duration-300">
        <div className="flex justify-between items-center mb-10">
          <h3 className="text-primary text-xs font-bold tracking-[0.3em] uppercase">Navigator</h3>
          <button onClick={onClose} className="text-slate-500 hover:text-white">
            <span className="material-symbols-outlined">close</span>
          </button>
        </div>
        
        <nav className="flex flex-col gap-2">
          {menuItems.map((item) => (
            <button
              key={item.id}
              onClick={() => onNavigate(item.id)}
              className={`flex items-center gap-4 px-4 py-3 rounded-xl transition-all border ${
                currentPage === item.id 
                ? 'bg-primary/20 border-primary text-white' 
                : 'bg-transparent border-transparent text-slate-400 hover:bg-white/5 hover:text-white'
              }`}
            >
              <span className="material-symbols-outlined text-xl">{item.icon}</span>
              <span className="text-[11px] font-bold uppercase tracking-widest">{item.label}</span>
            </button>
          ))}
        </nav>

        <div className="mt-auto pt-10 border-t border-white/5">
          <div className="flex flex-col gap-4">
            <div className="bg-surface-dark/40 p-3 rounded-lg border border-white/5">
              <span className="text-[9px] text-slate-500 uppercase block mb-1">Commander Identity</span>
              <span className="text-white text-[10px] font-mono font-bold tracking-widest uppercase">CAPT. J. DOE // 07-S</span>
            </div>
            <button className="flex items-center gap-2 text-[10px] text-alert font-bold uppercase tracking-widest hover:text-red-400">
              <span className="material-symbols-outlined text-sm">logout</span> Sign Out
            </button>
          </div>
        </div>
      </div>
      <div className="flex-1 bg-black/40" onClick={onClose} />
    </div>
  );
};

export default NavigationMenu;