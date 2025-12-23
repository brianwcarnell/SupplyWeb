
import React, { useState, useEffect, useRef } from 'react';
import { ChatMessage } from '../types';
import { startTacticalAdvisor } from '../services/geminiService';

interface TacticalAIProps {
  isOpen: boolean;
  onClose: () => void;
}

const TacticalAI: React.FC<TacticalAIProps> = ({ isOpen, onClose }) => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    { role: 'model', text: 'Tactical Advisor ONLINE. Secure channel established. Awaiting command.' }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const chatRef = useRef<any>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen && !chatRef.current) {
      startTacticalAdvisor([]).then(chat => {
        chatRef.current = chat;
      });
    }
  }, [isOpen]);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;
    
    const userMsg: ChatMessage = { role: 'user', text: input };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsLoading(true);

    try {
      const response = await chatRef.current.sendMessage({ message: input });
      const modelMsg: ChatMessage = { role: 'model', text: response.text || 'Error: No response from theater AI.' };
      setMessages(prev => [...prev, modelMsg]);
    } catch (e) {
      setMessages(prev => [...prev, { role: 'model', text: 'Error: Connection lost. Re-establishing secure link...' }]);
    } finally {
      setIsLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="absolute inset-0 z-40 bg-background-dark/95 backdrop-blur-md flex flex-col p-4 border-l border-white/10 animate-in fade-in slide-in-from-right duration-300">
      <div className="flex justify-between items-center border-b border-white/10 pb-4 mb-4">
        <div className="flex items-center gap-2">
          <div className="size-2 rounded-full bg-primary animate-pulse" />
          <h3 className="text-white text-sm font-bold uppercase tracking-widest">Tactical Advisor</h3>
        </div>
        <button onClick={onClose} className="text-slate-400 hover:text-white">
          <span className="material-symbols-outlined">close</span>
        </button>
      </div>

      <div ref={scrollRef} className="flex-1 overflow-y-auto hide-scrollbar flex flex-col gap-4 mb-4 pr-2">
        {messages.map((m, i) => (
          <div key={i} className={`flex flex-col ${m.role === 'user' ? 'items-end' : 'items-start'}`}>
            <span className="text-[9px] text-slate-500 uppercase font-bold mb-1">{m.role === 'user' ? 'Commander' : 'AI-Advisor'}</span>
            <div className={`max-w-[85%] p-3 rounded-xl text-[11px] leading-relaxed font-mono ${m.role === 'user' ? 'bg-primary text-white' : 'bg-surface-dark/80 border border-white/5 text-slate-300'}`}>
              {m.text}
            </div>
          </div>
        ))}
        {isLoading && (
          <div className="flex gap-1 items-center p-2">
            <div className="size-1 bg-primary rounded-full animate-bounce" />
            <div className="size-1 bg-primary rounded-full animate-bounce [animation-delay:0.2s]" />
            <div className="size-1 bg-primary rounded-full animate-bounce [animation-delay:0.4s]" />
          </div>
        )}
      </div>

      <div className="flex gap-2">
        <input 
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleSend()}
          placeholder="ENTER TACTICAL COMMAND..."
          className="flex-1 bg-surface-dark border border-white/10 rounded-lg px-4 py-2 text-xs font-mono text-white focus:outline-none focus:border-primary placeholder:text-slate-600"
        />
        <button 
          onClick={handleSend}
          className="bg-primary hover:bg-blue-600 px-4 py-2 rounded-lg text-white"
        >
          <span className="material-symbols-outlined text-sm">send</span>
        </button>
      </div>
      <div className="mt-4 flex gap-4 text-[9px] text-slate-500 font-mono uppercase">
        <span className="flex items-center gap-1"><span className="material-symbols-outlined text-[10px]">shield</span> Encrypted</span>
        <span className="flex items-center gap-1"><span className="material-symbols-outlined text-[10px]">bolt</span> Low Latency</span>
      </div>
    </div>
  );
};

export default TacticalAI;
