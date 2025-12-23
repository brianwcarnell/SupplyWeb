
import React, { useState, useEffect } from 'react';
import { LogisticsTransaction } from '../types';
import { getTransactionSummary } from '../services/geminiService';

const MOCK_TRANSACTIONS: LogisticsTransaction[] = [
  { id: 'REQ-8821', timestamp: '1402Z', item: 'F-35 Engine Components', quantity: '4 Units', origin: 'Atsugi', destination: 'Okinawa', status: 'In-Transit', mode: 'Air' },
  { id: 'MOV-5542', timestamp: '1315Z', item: 'JP-8 Aviation Fuel', quantity: '120K GAL', origin: 'Guam', destination: 'CVN-76 Reagan', status: 'Delivered', mode: 'Sea' },
  { id: 'REQ-1092', timestamp: '1244Z', item: '155mm Artillery Rounds', quantity: '2200 RDS', origin: 'Darwin', destination: 'Sector 4 Depot', status: 'Delayed', mode: 'Land' },
  { id: 'MOV-9901', timestamp: '1120Z', item: 'Medical Trauma Kits', quantity: '500 PCS', origin: 'San Diego', destination: 'Guam APS', status: 'Pending', mode: 'Air' },
  { id: 'REQ-4431', timestamp: '0930Z', item: 'Replacement Radar Array', quantity: '1 Unit', origin: 'Pearl Harbor', destination: 'Okinawa Hub', status: 'In-Transit', mode: 'Sea' },
];

const TransactionsView: React.FC = () => {
  const [summary, setSummary] = useState<string>('');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchSummary = async () => {
      const data = await getTransactionSummary();
      setSummary(data);
      setIsLoading(false);
    };
    fetchSummary();
  }, []);

  return (
    <div className="p-4 flex flex-col gap-6 animate-in fade-in slide-in-from-bottom duration-500">
      <div className="flex justify-between items-end border-b border-white/10 pb-3">
        <h3 className="text-white text-sm font-bold uppercase tracking-widest flex items-center gap-2">
          <span className="material-symbols-outlined text-primary">receipt_long</span>
          Logistics Transactions
        </h3>
        <span className="text-[10px] text-slate-500 font-mono uppercase tracking-tighter">Theater Ledger</span>
      </div>

      {/* AI Strategic Movement Summary */}
      <div className="bg-surface-dark/60 border border-primary/20 rounded-2xl p-4 relative overflow-hidden shadow-lg">
        <div className="absolute top-0 right-0 p-2 opacity-10">
          <span className="material-symbols-outlined text-4xl">analytics</span>
        </div>
        <div className="flex items-center gap-2 mb-3">
          <div className="size-1.5 rounded-full bg-primary animate-pulse" />
          <h4 className="text-white text-[11px] font-bold uppercase tracking-widest">Movement Analysis</h4>
        </div>
        <div className="bg-black/30 p-3 rounded-xl border border-white/5 min-h-[80px]">
          {isLoading ? (
            <div className="space-y-2 animate-pulse">
              <div className="h-2 bg-slate-800 rounded w-full" />
              <div className="h-2 bg-slate-800 rounded w-2/3" />
            </div>
          ) : (
            <p className="text-[10px] font-mono text-slate-300 leading-relaxed italic">
              {summary}
            </p>
          )}
        </div>
      </div>

      {/* Transaction List */}
      <div className="flex flex-col gap-3">
        <div className="flex justify-between items-center px-1">
          <h4 className="text-white text-[11px] font-bold uppercase tracking-widest">Recent Activity</h4>
          <button className="text-[9px] text-primary hover:underline uppercase font-bold">Filter by Status</button>
        </div>
        
        <div className="space-y-3">
          {MOCK_TRANSACTIONS.map((tx) => (
            <div key={tx.id} className="bg-surface-dark/40 border border-white/5 rounded-2xl p-4 flex items-center gap-4 hover:border-white/20 transition-all group">
              <div className={`size-10 rounded-xl flex items-center justify-center border ${
                tx.status === 'Delivered' ? 'bg-emerald-500/10 border-emerald-500/20 text-emerald-500' :
                tx.status === 'Delayed' ? 'bg-alert/10 border-alert/20 text-alert' :
                tx.status === 'In-Transit' ? 'bg-primary/10 border-primary/20 text-primary' :
                'bg-slate-500/10 border-slate-500/20 text-slate-400'
              }`}>
                <span className="material-symbols-outlined text-xl">
                  {tx.mode === 'Air' ? 'flight_takeoff' : tx.mode === 'Sea' ? 'sailing' : 'local_shipping'}
                </span>
              </div>
              
              <div className="flex-1 min-w-0">
                <div className="flex justify-between items-center mb-1">
                  <span className="text-white text-[11px] font-bold truncate pr-2 uppercase tracking-wide">{tx.item}</span>
                  <span className="text-[9px] font-mono text-slate-500 shrink-0">{tx.timestamp}</span>
                </div>
                <div className="flex justify-between items-center">
                  <div className="flex flex-col">
                    <span className="text-[9px] text-slate-500 uppercase font-bold tracking-tighter">
                      {tx.origin} &rarr; {tx.destination}
                    </span>
                    <span className="text-[10px] text-slate-300 font-mono">{tx.quantity}</span>
                  </div>
                  <div className="flex flex-col items-end">
                    <span className={`text-[8px] font-bold uppercase px-1.5 py-0.5 rounded border ${
                      tx.status === 'Delivered' ? 'border-emerald-500/30 text-emerald-400' :
                      tx.status === 'Delayed' ? 'border-alert/30 text-alert animate-pulse' :
                      tx.status === 'In-Transit' ? 'border-primary/30 text-primary' :
                      'border-slate-500/30 text-slate-400'
                    }`}>{tx.status}</span>
                    <span className="text-[8px] text-slate-600 font-mono mt-1">{tx.id}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Action Bar */}
      <div className="mt-4 flex gap-2">
        <button className="flex-1 bg-surface-dark border border-white/10 text-white py-3 rounded-xl text-[10px] font-bold uppercase tracking-widest hover:bg-white/5 transition-colors flex items-center justify-center gap-2">
          <span className="material-symbols-outlined text-sm">download</span>
          Export Manifest
        </button>
        <button className="flex-1 bg-primary text-white py-3 rounded-xl text-[10px] font-bold uppercase tracking-widest hover:bg-blue-600 transition-colors flex items-center justify-center gap-2">
          <span className="material-symbols-outlined text-sm">add</span>
          New Requisition
        </button>
      </div>
    </div>
  );
};

export default TransactionsView;
