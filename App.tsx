import React, { useState, useEffect, useCallback } from 'react';
import { LogisticsStatus, MapNode, AppPage } from './types.ts';
import Header from './components/Header.tsx';
import MapModule from './components/MapModule.tsx';
import LogisticsModule from './components/LogisticsModule.tsx';
import NodeInspect from './components/NodeInspect.tsx';
import Ticker from './components/Ticker.tsx';
import TacticalAI from './components/TacticalAI.tsx';
import NavigationMenu from './components/NavigationMenu.tsx';
import FleetView from './components/FleetView.tsx';
import PersonnelView from './components/PersonnelView.tsx';
import HealthView from './components/HealthView.tsx';
import SupplyRiskView from './components/SupplyRiskView.tsx';
import TransactionsView from './components/TransactionsView.tsx';
import MissionPlanningView from './components/MissionPlanningView.tsx';
import MessagingView from './components/MessagingView.tsx';
import IntelView from './components/IntelView.tsx';
import { getPredictiveAnalysis } from './services/geminiService.ts';

const INITIAL_NODES: MapNode[] = [
  {
    id: 'JP-HUB',
    name: 'Okinawa Hub',
    grid: '26N 127E',
    sector: 2,
    status: 'active',
    inbound: '22,400 TN',
    sortieRate: '18/Day',
    type: 'HUB',
    coords: { x: '20%', y: '30%' }
  },
  {
    id: 'APS-4',
    name: 'Guam Distribution Ctr',
    grid: '13N 144E',
    sector: 4,
    status: 'warning',
    inbound: '14,200 TN',
    sortieRate: '12/Day',
    type: 'APS',
    coords: { x: '52%', y: '52%' }
  },
  {
    id: 'DARWIN',
    name: 'Darwin Logistics Base',
    grid: '12S 130E',
    sector: 6,
    status: 'critical',
    inbound: '5,800 TN',
    sortieRate: '4/Day',
    type: 'NODE',
    coords: { x: '42%', y: '82%' }
  }
];

const INITIAL_LOGISTICS: LogisticsStatus[] = [
  { id: 'cl3', label: 'CL III (Fuel)', value: 88, color: '#10b981', trend: [85, 87, 88, 86, 88, 88] },
  { id: 'cl5', label: 'CL V (Ammo)', value: 32, color: '#ef4444', trend: [60, 55, 45, 40, 35, 32] },
  { id: 'cl8', label: 'CL VIII (Med)', value: 94, color: '#60a5fa', trend: [95, 94, 94, 95, 94, 94] },
];

const App: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<AppPage>('COP');
  const [selectedNode, setSelectedNode] = useState<MapNode>(INITIAL_NODES[0]);
  const [logistics] = useState<LogisticsStatus[]>(INITIAL_LOGISTICS);
  const [timeOffset, setTimeOffset] = useState<number>(0);
  const [aiAnalysis, setAiAnalysis] = useState<string>('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [isAdvisorOpen, setIsAdvisorOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const fetchAnalysis = useCallback(async (hours: number) => {
    setIsAnalyzing(true);
    const result = await getPredictiveAnalysis(hours.toString());
    setAiAnalysis(result || '');
    setIsAnalyzing(false);
  }, []);

  useEffect(() => {
    if (currentPage === 'COP') {
      fetchAnalysis(timeOffset);
    }
  }, [currentPage, timeOffset, fetchAnalysis]);

  const handleSliderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTimeOffset(parseInt(e.target.value));
  };

  const handleSliderRelease = () => {
    fetchAnalysis(timeOffset);
  };

  const renderContent = () => {
    switch (currentPage) {
      case 'Fleet': return <FleetView />;
      case 'Personnel': return <PersonnelView />;
      case 'Health': return <HealthView />;
      case 'SupplyRisk': return <SupplyRiskView />;
      case 'Transactions': return <TransactionsView />;
      case 'MissionPlanning': return <MissionPlanningView />;
      case 'Messaging': return <MessagingView />;
      case 'Intel': return <IntelView />;
      case 'COP':
      default:
        return (
          <div className="flex-1 flex flex-col relative">
            <MapModule 
              nodes={INITIAL_NODES} 
              onNodeSelect={setSelectedNode} 
              selectedNodeId={selectedNode.id}
              timeOffset={timeOffset}
              onTimeChange={handleSliderChange}
              onTimeRelease={handleSliderRelease}
            />
            
            <div className="flex flex-col gap-6 p-4 relative z-10 bg-background-dark/80 backdrop-blur-xl shadow-[0_-20px_60px_rgba(0,0,0,0.9)] -mt-10 border-t border-white/5 rounded-t-3xl min-h-[600px]">
              <LogisticsModule data={logistics} />
              
              <div className="flex flex-col gap-3">
                <div className="flex items-center justify-between border-b border-white/5 pb-2">
                  <h3 className="text-white text-[11px] font-bold uppercase tracking-widest flex items-center gap-2">
                    <span className="material-symbols-outlined text-primary text-sm animate-pulse">radar</span>
                    Predictive Theater Assessment
                  </h3>
                  {isAnalyzing && <span className="text-[9px] text-primary animate-pulse font-mono font-bold">CALCULATING...</span>}
                </div>
                <div className="p-4 bg-surface-dark/40 border border-white/5 rounded-xl text-[11px] font-mono leading-relaxed text-slate-300 shadow-inner">
                  <div className="flex flex-col gap-2">
                    {aiAnalysis.split('\n').map((line, i) => (
                      <p key={i} className={line.startsWith('CRITICAL') || line.startsWith('RISK') ? 'text-red-400 font-bold' : ''}>
                        {line}
                      </p>
                    ))}
                  </div>
                </div>
              </div>

              <NodeInspect node={selectedNode} />
            </div>
          </div>
        );
    }
  };

  return (
    <div className="relative flex h-screen w-full flex-col max-w-md mx-auto border-x border-slate-800 shadow-2xl bg-background-dark overflow-hidden">
      <Header 
        onAdvisorToggle={() => setIsAdvisorOpen(!isAdvisorOpen)} 
        onMenuToggle={() => setIsMenuOpen(!isMenuOpen)}
        isAdvisorOpen={isAdvisorOpen} 
      />
      
      <div className="flex-1 flex flex-col relative overflow-y-auto hide-scrollbar pb-16">
        {renderContent()}
      </div>

      <NavigationMenu 
        isOpen={isMenuOpen} 
        onClose={() => setIsMenuOpen(false)} 
        onNavigate={(page) => {
          setCurrentPage(page);
          setIsMenuOpen(false);
        }}
        currentPage={currentPage}
      />
      <TacticalAI isOpen={isAdvisorOpen} onClose={() => setIsAdvisorOpen(false)} />
      <Ticker />
    </div>
  );
};

export default App;