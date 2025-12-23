import React, { useState, useEffect } from 'react';
import { generateTickerAlerts } from '../services/geminiService.ts';

const Ticker: React.FC = () => {
  const [alerts, setAlerts] = useState<string>('// CRITICAL LOW: CLASS V @ DARWIN NODE (40% STOCK) // INTERCEPT DETECTED SECTOR 7 // ALT ROUTE BRAVO-2 ACTIVATED // T+4HRS DELAY //');

  useEffect(() => {
    const fetchAlerts = async () => {
      const result = await generateTickerAlerts();
      setAlerts(result);
    };
    fetchAlerts();
    const interval = setInterval(fetchAlerts, 60000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="fixed bottom-0 left-0 right-0 h-7 bg-red-950/90 flex items-center overflow-hidden border-t border-red-500/30 z-30 max-w-md mx-auto">
      <div className="flex items-center px-3 bg-red-900 h-full z-10 shadow-[4px_0_10px_rgba(0,0,0,0.5)] border-r border-red-500/30">
        <span className="material-symbols-outlined text-red-200 text-xs animate-pulse">warning</span>
        <span className="text-white text-[10px] font-bold ml-1.5 uppercase tracking-wider">Flash</span>
      </div>
      <div className="whitespace-nowrap flex items-center animate-marquee pl-4 w-full">
        <p className="text-red-100 text-[10px] font-medium font-mono uppercase tracking-wide">
          {alerts} {alerts}
        </p>
      </div>
    </div>
  );
};

export default Ticker;