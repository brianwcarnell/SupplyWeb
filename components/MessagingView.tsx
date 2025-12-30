import React, { useState, useEffect, useRef } from 'react';
import { SecureMessage, Contact } from '../types.ts';
import { analyzeCommTraffic } from '../services/geminiService.ts';

const CONTACTS: Contact[] = [
  { id: 'ADM-S', name: 'ADM. SAMUELS', role: '7th Fleet Cmd', status: 'online', lastSeen: 'NOW' },
  { id: 'GEN-W', name: 'GEN. WALKER', role: 'PACAF Cmd', status: 'busy', lastSeen: '2M AGO' },
  { id: 'COL-K', name: 'COL. KHAN', role: 'Logistics Dir', status: 'offline', lastSeen: '1H AGO' },
  { id: 'JOC-T', name: 'JOC-THEATER', role: 'Theater Ops', status: 'online', lastSeen: 'NOW' },
];

const INITIAL_MESSAGES: SecureMessage[] = [
  { id: '1', sender: 'ADM. SAMUELS', text: 'Operation Azure Shield staging is at 90%. Confirm logistics uplift for Okinawa Hub.', timestamp: '1430Z', classification: 'SECRET', isMe: false },
  { id: '2', sender: 'ME', text: 'Logistics confirm. Okinawa Hub is currently active. T+24H projection looks stable.', timestamp: '1432Z', classification: 'SECRET', isMe: true },
  { id: '3', sender: 'ADM. SAMUELS', text: 'Understood. Watch the Malacca choke point data on the Risk screen. We are seeing noise.', timestamp: '1435Z', classification: 'TOP SECRET', isMe: false },
];

const MessagingView: React.FC = () => {
  const [activeContact, setActiveContact] = useState<Contact>(CONTACTS[0]);
  const [messages, setMessages] = useState<SecureMessage[]>(INITIAL_MESSAGES);
  const [inputText, setInputText] = useState('');
  const [trafficReport, setTrafficReport] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(true);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fetchTraffic = async () => {
      const data = await analyzeCommTraffic();
      setTrafficReport(data);
      setIsAnalyzing(false);
    };
    fetchTraffic();
  }, []);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSendMessage = () => {
    if (!inputText.trim()) return;
    const newMessage: SecureMessage = {
      id: Date.now().toString(),
      sender: 'ME',
      text: inputText,
      timestamp: new Date().toISOString().split('T')[1].slice(0, 5) + 'Z',
      classification: 'SECRET',
      isMe: true,
    };
    setMessages([...messages, newMessage]);
    setInputText('');
  };

  return (
    <div className="flex-1 flex flex-col h-full animate-in fade-in duration-500">
      {/* Comm Analysis Header */}
      <div className="p-3 bg-surface-dark/60 border-b border-white/5">
        <div className="flex items-center gap-2 mb-2">
          <span className="material-symbols-outlined text-[10px] text-primary animate-pulse">broadcast_tower</span>
          <span className="text-[9px] text-slate-500 font-bold uppercase tracking-widest">SIGINT Comm Analysis</span>
        </div>
        <div className="bg-black/30 p-2 rounded-lg border border-white/5">
          {isAnalyzing ? (
            <div className="h-4 bg-slate-800 animate-pulse rounded w-full" />
          ) : (
            <p className="text-[9px] font-mono text-slate-400 italic leading-tight">{trafficReport}</p>
          )}
        </div>
      </div>

      <div className="flex flex-1 overflow-hidden">
        {/* Contact List */}
        <div className="w-20 border-r border-white/5 flex flex-col items-center py-4 gap-4 bg-background-dark/40">
          {CONTACTS.map((contact) => (
            <button
              key={contact.id}
              onClick={() => setActiveContact(contact)}
              className={`relative size-12 rounded-xl flex items-center justify-center transition-all border ${
                activeContact.id === contact.id ? 'bg-primary/20 border-primary shadow-[0_0_10px_rgba(19,91,236,0.2)]' : 'bg-surface-dark border-white/5 hover:border-white/20'
              }`}
            >
              <span className="text-[10px] font-bold text-white font-mono">{contact.id}</span>
              <div className={`absolute bottom-1 right-1 size-2 rounded-full border border-background-dark ${
                contact.status === 'online' ? 'bg-emerald-500' : 
                contact.status === 'busy' ? 'bg-amber-500' : 'bg-slate-600'
              }`} />
            </button>
          ))}
          <button className="size-10 rounded-full border border-dashed border-white/20 flex items-center justify-center text-slate-500 hover:text-white mt-2">
            <span className="material-symbols-outlined text-sm">add</span>
          </button>
        </div>

        {/* Chat Window */}
        <div className="flex-1 flex flex-col bg-background-dark/20 relative">
          <div className="p-4 border-b border-white/5 flex justify-between items-center bg-surface-dark/20 backdrop-blur-sm">
            <div>
              <h4 className="text-white text-xs font-bold uppercase tracking-widest">{activeContact.name}</h4>
              <p className="text-[9px] text-slate-500 font-mono">{activeContact.role} // {activeContact.status.toUpperCase()}</p>
            </div>
            <div className="flex gap-2">
              <button className="size-8 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-slate-400 hover:text-white transition-all">
                <span className="material-symbols-outlined text-sm">videocam</span>
              </button>
              <button className="size-8 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-slate-400 hover:text-white transition-all">
                <span className="material-symbols-outlined text-sm">call</span>
              </button>
            </div>
          </div>

          <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 flex flex-col gap-6 hide-scrollbar">
            {messages.map((msg) => (
              <div key={msg.id} className={`flex flex-col ${msg.isMe ? 'items-end' : 'items-start'}`}>
                <div className="flex items-center gap-2 mb-1.5 px-1">
                  <span className={`text-[8px] font-bold uppercase px-1 rounded border ${
                    msg.classification === 'TOP SECRET' ? 'border-red-500 text-red-500' :
                    msg.classification === 'SECRET' ? 'border-amber-500 text-amber-500' : 'border-slate-500 text-slate-500'
                  }`}>{msg.classification}</span>
                  <span className="text-[8px] text-slate-600 font-mono">{msg.timestamp}</span>
                </div>
                <div className={`max-w-[85%] p-3 rounded-2xl text-[11px] font-mono leading-relaxed shadow-lg border ${
                  msg.isMe ? 'bg-primary border-primary/20 text-white rounded-tr-none' : 'bg-surface-dark border-white/10 text-slate-300 rounded-tl-none'
                }`}>
                  {msg.text}
                </div>
              </div>
            ))}
          </div>

          {/* Input Area */}
          <div className="p-4 bg-background-dark/60 backdrop-blur-xl border-t border-white/5">
            <div className="flex gap-2 items-center bg-surface-dark/80 rounded-2xl border border-white/10 px-4 py-2 focus-within:border-primary/50 transition-all">
              <button className="text-slate-500 hover:text-white">
                <span className="material-symbols-outlined text-sm">attach_file</span>
              </button>
              <input 
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
                placeholder="TRANSMIT SECURE MESSAGE..."
                className="flex-1 bg-transparent border-none outline-none text-[11px] font-mono text-white placeholder:text-slate-700 py-1"
              />
              <button 
                onClick={handleSendMessage}
                className={`size-8 rounded-xl flex items-center justify-center transition-all ${inputText.trim() ? 'bg-primary text-white' : 'text-slate-600'}`}
              >
                <span className="material-symbols-outlined text-sm">send</span>
              </button>
            </div>
            <div className="flex justify-between items-center mt-2 px-1">
              <span className="text-[8px] text-slate-500 font-mono uppercase">AES-256 Quantum Resistant Channel Active</span>
              <div className="flex items-center gap-2">
                <span className="text-[8px] text-slate-700 font-mono">B-LEVEL</span>
                <div className="size-1 rounded-full bg-emerald-500 animate-pulse" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MessagingView;