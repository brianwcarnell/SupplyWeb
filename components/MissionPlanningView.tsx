import React, { useState } from 'react';
import { MissionPhase } from '../types.ts';
import { getMissionStrategyAnalysis } from '../services/geminiService.ts';

const INITIAL_PHASES: MissionPhase[] = [
  { id: 'P1', label: 'Deployment & Staging', duration: 'T+48H', status: 'Active' },
  { id: 'P2', label: 'Intelligence Prep', duration: 'T+72H', status: 'Planned' },
  { id: 'P3', label: 'Primary Engagement', duration: 'T+96H', status: 'Planned' },
  { id: 'P4', label: 'Sustainment Phase', duration: 'T+120H', status: 'Planned' },
];

const MissionPlanningView: React.FC = () => {
  const [missionName, setMissionName] = useState('OPERATION AZURE SHIELD');
  const [objectives, setObjectives] = useState<string[]>([
    'Secure Sector 4 maritime lanes',
    'Establish forward resupply at Okinawa',
    'Neutralize aerial corridor threats'
  ]);
  const [analysis, setAnalysis] = useState<string>('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const runStrategyReview = async () => {
    setIsAnalyzing(true);
    const result = await getMissionStrategyAnalysis(missionName, objectives);
    setAnalysis(result);
    setIsAnalyzing(false);
  };

  return (
    <div className="p-4 flex flex-col gap-6 animate-in fade-in slide-in-from-bottom duration-500">
      <div className="flex justify-between items-end border-b border-white/10 pb-3">
        <h3 className="text-white text-sm font-bold uppercase tracking-widest flex items-center gap-2">
          <span className="material-symbols-outlined text-primary">architecture</span>
          Mission Planning Suite
        </h3>
        <span className="text-[10px] text-slate-500 font-mono uppercase tracking-tighter">SECURE NODE: 77-B</span>
      </div>

      {/* Mission Config Card */}
      <div className="bg-surface-dark/40 border border-white/5 rounded-3xl p-5 flex flex-col gap-4">
        <div className="flex flex-col gap-1">
          <label className="text-[9px] text-slate-500 uppercase font-bold tracking-widest">Operation Designation</label>
          <input 
            value={missionName}
            onChange={(e) => setMissionName(e.target.value.toUpperCase())}
            className="bg-transparent text-white font-mono font-bold text-lg border-b border-primary/30 focus:border-primary outline-none py-1"
          />
        </div>

        <div className="flex flex-col gap-2">
          <label className="text-[9px] text-slate-500 uppercase font-bold tracking-widest">Primary Objectives</label>
          <div className="flex flex-col gap-2">
            {objectives.map((obj, i) => (
              <div key={i} className="flex items-center gap-3 bg-white/5 p-2 rounded-lg border border-white/5">
                <span className="size-4 rounded border border-primary/40 flex items-center justify-center text-[10px] text-primary font-bold">{i+1}</span>
                <span className="text-[10px] text-slate-300 font-mono flex-1">{obj}</span>
              </div>
            ))}
            <button className="text-[9px] text-slate-500 hover:text-white flex items-center gap-1 mt-1 transition-colors">
              <span className="material-symbols-outlined text-sm">add</span> Add Objective
            </button>
          </div>
        </div>
      </div>

      {/* Strategy Review Trigger */}
      <button 
        onClick={runStrategyReview}
        disabled={isAnalyzing}
        className={`w-full py-4 rounded-2xl flex items-center justify-center gap-3 border transition-all ${
          isAnalyzing ? 'bg-slate-800 border-white/10' : 'bg-primary border-primary hover:bg-blue-600 shadow-[0_0_20px_rgba(19,91,236,0.3)]'
        }`}
      >
        <span className={`material-symbols-outlined ${isAnalyzing ? 'animate-spin' : ''}`}>
          {isAnalyzing ? 'sync' : 'psychology'}
        </span>
        <span className="text-[11px] font-bold uppercase tracking-[0.2em]">Run AI Strategy Review</span>
      </button>

      {/* Gemini Strategy Output */}
      {analysis && (
        <div className="bg-slate-900/60 p-5 rounded-3xl border border-primary/20 animate-in slide-in-from-top duration-300">
          <div className="flex items-center gap-2 mb-4">
            <span className="material-symbols-outlined text-primary text-sm">shield</span>
            <h4 className="text-white text-[11px] font-bold uppercase tracking-widest">Strategic Assessment Report</h4>
          </div>
          <div className="text-[10px] font-mono text-slate-300 leading-relaxed space-y-3 whitespace-pre-line border-l border-primary/20 pl-4">
            {analysis}
          </div>
        </div>
      )}

      {/* Mission Phases Timeline */}
      <div className="flex flex-col gap-3">
        <h4 className="text-white text-[11px] font-bold uppercase tracking-widest px-1">Operation Phases</h4>
        <div className="relative pl-6 space-y-6 before:absolute before:left-[11px] before:top-2 before:bottom-2 before:w-[1px] before:bg-slate-800">
          {INITIAL_PHASES.map((phase) => (
            <div key={phase.id} className="relative">
              <div className={`absolute -left-[19px] top-1 size-4 rounded-full border-2 bg-background-dark flex items-center justify-center ${
                phase.status === 'Active' ? 'border-primary shadow-[0_0_10px_#135bec]' : 
                phase.status === 'Complete' ? 'border-emerald-500 bg-emerald-500' : 'border-slate-800'
              }`}>
                {phase.status === 'Complete' && <span className="material-symbols-outlined text-white text-[10px]">check</span>}
              </div>
              <div className="flex justify-between items-center p-3 bg-surface-dark/40 border border-white/5 rounded-xl ml-4">
                <div className="flex flex-col">
                  <span className="text-[10px] text-white font-bold">{phase.label}</span>
                  <span className="text-[9px] text-slate-500 font-mono uppercase">EST START: {phase.duration}</span>
                </div>
                <span className={`text-[8px] px-2 py-0.5 rounded border font-bold uppercase ${
                  phase.status === 'Active' ? 'border-primary text-primary' : 'border-slate-700 text-slate-600'
                }`}>
                  {phase.status}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
      
      {/* Resource Allocation View */}
      <div className="grid grid-cols-2 gap-3">
        <div className="bg-surface-dark/40 border border-white/5 rounded-2xl p-4">
          <span className="text-[9px] text-slate-500 uppercase font-bold block mb-2">Combat Power</span>
          <div className="flex items-baseline gap-2">
            <span className="text-xl font-mono text-white">4.2</span>
            <span className="text-[8px] text-emerald-400 font-bold uppercase">Surplus</span>
          </div>
        </div>
        <div className="bg-surface-dark/40 border border-white/5 rounded-2xl p-4">
          <span className="text-[9px] text-slate-500 uppercase font-bold block mb-2">Logistics Tail</span>
          <div className="flex items-baseline gap-2">
            <span className="text-xl font-mono text-white">8.9</span>
            <span className="text-[8px] text-alert font-bold uppercase">Strained</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MissionPlanningView;