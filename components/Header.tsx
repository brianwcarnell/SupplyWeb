
import React from 'react';

interface HeaderProps {
  onAdvisorToggle: () => void;
  onMenuToggle: () => void;
  isAdvisorOpen: boolean;
}

const Header: React.FC<HeaderProps> = ({ onAdvisorToggle, onMenuToggle, isAdvisorOpen }) => {
  return (
    <header className="flex items-center bg-background-dark/60 backdrop-blur-md p-4 pb-3 justify-between border-b border-slate-800 z-50">
      <button 
        onClick={onMenuToggle}
        className="flex size-10 items-center justify-center rounded-lg border bg-white/5 border-white/10 text-slate-400 hover:text-white transition-all"
      >
        <span className="material-symbols-outlined text-xl">menu</span>
      </button>
      <div className="flex flex-col items-center">
        <h2 className="text-white text-md font-bold leading-tight tracking-[0.2em] uppercase text-center">INDOPACOM COP</h2>
        <div className="flex items-center gap-2">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-alert opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-alert"></span>
          </span>
          <span className="text-[9px] font-bold text-slate-500 tracking-[0.3em] uppercase">Status: Defcon 4</span>
        </div>
      </div>
      <button 
        onClick={onAdvisorToggle}
        className={`flex size-10 items-center justify-center rounded-lg border transition-all ${isAdvisorOpen ? 'bg-primary border-primary text-white' : 'bg-white/5 border-white/10 text-slate-400 hover:text-white'}`}
      >
        <span className="material-symbols-outlined text-xl">{isAdvisorOpen ? 'smart_toy' : 'chat'}</span>
      </button>
    </header>
  );
};

export default Header;
