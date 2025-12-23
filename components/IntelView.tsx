
import React, { useState, useEffect } from 'react';
import { getIntelligenceBriefing } from '../services/geminiService';

const IntelView: React.FC = () => {
  const [briefing, setBriefing] = useState<string>('');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchIntel = async () => {
      const data = await getIntelligenceBriefing();
      setBriefing(data);
      setIsLoading(false);
    };
    fetchIntel();
  }, []);

  // Simple parser to separate the content if it comes back structured with headers
  const parseSections = (text: string) => {
    const sections = { osint: '', sigint: '', himint: '' };
    const parts = text.split(/(OSINT|SIGINT|HIMINT):/i);
    
    for (let i = 1; i < parts.length; i += 2) {
      const type = parts[i].toUpperCase();
      const content = parts[i + 1]?.trim();
      if (type === 'OSINT') sections.osint = content;
      if (type === 'SIGINT') sections.sigint = content;
      if (type === 'HIMINT') sections.himint = content;
    }

    // Fallback if formatting is weird
    if (!sections.osint && !sections.sigint && !sections.himint) {
      return { osint: text, sigint: 'NO DATA', himint: 'NO DATA' };
    }
    return sections;
  };

  const sections = parseSections(briefing);

  return (
    <div className="p-4 flex flex-col gap-6 animate-in fade-in slide-in-from-bottom duration-500">
      <div className="flex justify-between items-end border-b border-white/10 pb-3">
        <h3 className="text-white text-sm font-bold uppercase tracking-widest flex items-center gap-2">
          <span className="material-symbols-outlined text-primary">visibility</span>
          Intelligence Feed
        </h3>
        <span className="text-[10px] text-slate-500 font-mono uppercase tracking-tighter">Secure Uplink</span>
      </div>

      {isLoading ? (
        <div className="space-y-6">
          {[1, 2, 3].map((i) => (
            <div key={i} className="animate-pulse space-y-3">
              <div className="h-3 bg-slate-800 rounded w-24" />
              <div className="p-4 bg-surface-dark/40 rounded-2xl border border-white/5 space-y-2">
                <div className="h-2 bg-slate-800 rounded w-full" />
                <div className="h-2 bg-slate-800 rounded w-5/6" />
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="space-y-6">
          {/* OSINT Section */}
          <div className="flex flex-col gap-3">
            <div className="flex items-center justify-between px-1">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-emerald-400 text-sm">public</span>
                <h4 className="text-white text-[11px] font-bold uppercase tracking-widest">OSINT</h4>
              </div>
              <span className="text-[8px] text-emerald-500/50 font-mono uppercase tracking-widest">Open Source</span>
            </div>
            <div className="bg-surface-dark/40 border-l-2 border-emerald-500/40 p-4 rounded-r-2xl border-y border-r border-white/5 shadow-inner">
              <p className="text-[10px] font-mono text-slate-300 leading-relaxed whitespace-pre-line">
                {sections.osint}
              </p>
            </div>
          </div>

          {/* SIGINT Section */}
          <div className="flex flex-col gap-3">
            <div className="flex items-center justify-between px-1">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-primary text-sm">settings_input_antenna</span>
                <h4 className="text-white text-[11px] font-bold uppercase tracking-widest">SIGINT</h4>
              </div>
              <span className="text-[8px] text-primary/50 font-mono uppercase tracking-widest">Signals Intel</span>
            </div>
            <div className="bg-surface-dark/40 border-l-2 border-primary/40 p-4 rounded-r-2xl border-y border-r border-white/5 shadow-inner flex flex-col gap-3">
              <div className="p-2 bg-primary/10 border border-primary/20 rounded-lg flex items-center gap-3">
                <div className="size-2 rounded-full bg-primary animate-pulse shadow-[0_0_8px_#135bec]" />
                <p className="text-[9px] font-mono font-bold text-primary uppercase tracking-tight">
                  Satcom interfaces hot: Communication interception active. Incoming intelligence at 1300.
                </p>
              </div>
              <p className="text-[10px] font-mono text-slate-300 leading-relaxed whitespace-pre-line">
                {sections.sigint}
              </p>
            </div>
          </div>

          {/* HIMINT Section */}
          <div className="flex flex-col gap-3">
            <div className="flex items-center justify-between px-1">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-alert text-sm">satellite_alt</span>
                <h4 className="text-white text-[11px] font-bold uppercase tracking-widest">HIMINT</h4>
              </div>
              <span className="text-[8px] text-alert/50 font-mono uppercase tracking-widest">High-Imagery Intel</span>
            </div>
            <div className="bg-surface-dark/40 border-l-2 border-alert/40 p-4 rounded-r-2xl border-y border-r border-white/5 shadow-inner relative overflow-hidden">
               {/* Visual scanner effect */}
               <div className="absolute inset-0 pointer-events-none opacity-10 bg-[linear-gradient(90deg,transparent_45%,#ef4444_50%,transparent_55%)] bg-[length:200%_100%] animate-[marquee_5s_linear_infinite]" />
              <p className="text-[10px] font-mono text-slate-300 leading-relaxed whitespace-pre-line">
                {sections.himint}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Security Classification Footer */}
      <div className="mt-auto border-t border-white/10 pt-4 flex items-center justify-center gap-4">
        <div className="flex items-center gap-2 px-3 py-1 bg-red-950/40 border border-red-500/20 rounded-full">
          <span className="size-1.5 rounded-full bg-red-500 animate-pulse" />
          <span className="text-[8px] text-red-500 font-bold uppercase tracking-widest">Top Secret / SCI</span>
        </div>
        <span className="text-[9px] text-slate-600 font-mono uppercase tracking-widest">Handle via TALENT KEYHOLE Channels Only</span>
      </div>
    </div>
  );
};

export default IntelView;
