import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  Send, 
  Bot, 
  User as UserIcon, 
  Sparkles, 
  Calculator, 
  BookOpen, 
  Wrench,
  ExternalLink,
  Zap,
  RotateCcw
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { useApp } from '../context/AppContext';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  references?: { title: string; url: string }[];
  type?: 'text' | 'calculation' | 'procedure';
}

const AIService = () => {
  const { user } = useApp();
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      role: 'assistant',
      content: "Hello! I'm your Solar Wise AI Assistant. I can help you with installation guides, technical calculations, troubleshooting, and component recommendations. What's on your mind today?",
      type: 'text'
    }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      const scrollElement = scrollRef.current.querySelector('[data-radix-scroll-area-viewport]');
      if (scrollElement) {
        scrollElement.scrollTop = scrollElement.scrollHeight;
      }
    }
  }, [messages, isTyping]);

  const handleSend = () => {
    if (!input.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: input
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsTyping(true);

    // Simulated AI response logic
    setTimeout(() => {
      const response = generateMockResponse(input);
      setMessages(prev => [...prev, {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        ...response
      } as Message]);
      setIsTyping(false);
    }, 1500);
  };

  const generateMockResponse = (query: string): Partial<Message> => {
    const q = query.toLowerCase();
    
    if (q.includes('calculation') || q.includes('size') || q.includes('battery')) {
      return {
        content: `To calculate your battery bank size:
1. Total Daily Load (Wh) = Sum of (Appliance Power * Hours Used)
2. Battery Capacity (Ah) = (Total Wh * Days of Autonomy) / (System Voltage * Depth of Discharge)

For a 2000Wh daily load with 2 days of autonomy at 24V and 50% DoD:
(2000 * 2) / (24 * 0.5) = 333Ah.`,
        type: 'calculation',
        references: [{ title: 'Solar Sizing Guide', url: '#' }]
      };
    }
    
    if (q.includes('troubleshoot') || q.includes('problem') || q.includes('working')) {
      return {
        content: `When troubleshooting a solar system that isn't charging:
1. Check the DC breaker/fuses first.
2. Measure the PV voltage at the charge controller terminals.
3. Inspect MC4 connectors for loose or corroded contacts.
4. Check the battery voltage - most controllers won't start if the battery is too low.`,
        type: 'procedure',
        references: [{ title: 'Maintenance Manual', url: '#' }]
      };
    }

    if (q.includes('install') || q.includes('how to')) {
      return {
        content: `Solar panel installation follows these main steps:
1. Roof assessment and mounting structure installation.
2. Securing panels to the rails.
3. Wiring panels in series/parallel for required voltage.
4. Running DC cables to the inverter/controller.
5. Connecting the earthing system for protection.`,
        type: 'procedure',
        references: [{ title: 'IEC 60364-7-712 Standards', url: 'https://www.iec.ch' }]
      };
    }

    return {
      content: "That's a great question about solar energy. Based on technical documentation, this involves understanding the specific ratings of your components. I recommend checking our 'Solar Panel Masterclass' e-book for a deep dive into this topic. Is there a specific component you'd like me to explain?",
      type: 'text',
      references: [{ title: 'Solar Wise Academy Library', url: '/marketplace' }]
    };
  };

  const quickPrompts = [
    { label: 'Calculate Battery Size', icon: Calculator },
    { label: 'Troubleshoot Inverter', icon: Wrench },
    { label: 'Installation Steps', icon: BookOpen },
    { label: 'MC4 Connector Guide', icon: Zap }
  ];

  return (
    <div className="max-w-5xl mx-auto h-[calc(100vh-180px)] flex flex-col gap-4">
      <div className="flex justify-between items-center px-4 md:px-0">
        <div>
          <h1 className="text-2xl font-bold flex items-center gap-2">
            <Sparkles className="text-emerald-500" /> AI Solar Assistant
          </h1>
          <p className="text-sm text-muted-foreground">Expert technical support available 24/7</p>
        </div>
        <Button variant="ghost" size="sm" onClick={() => setMessages([messages[0]])}>
          <RotateCcw className="h-4 w-4 mr-2" /> Clear Chat
        </Button>
      </div>

      <div className="flex-1 overflow-hidden flex flex-col bg-white dark:bg-slate-900 rounded-3xl border shadow-sm mx-4 md:mx-0">
        <ScrollArea className="flex-1 p-6" ref={scrollRef}>
          <div className="space-y-6">
            {messages.map((msg) => (
              <motion.div
                key={msg.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className={`flex gap-3 ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}
              >
                <div className={`h-10 w-10 rounded-2xl flex items-center justify-center flex-shrink-0 ${
                  msg.role === 'user' ? 'bg-sky-100 text-sky-600' : 'bg-emerald-100 text-emerald-600'
                }`}>
                  {msg.role === 'user' ? <UserIcon size={20} /> : <Bot size={20} />}
                </div>
                <div className={`max-w-[80%] space-y-2 ${msg.role === 'user' ? 'items-end' : ''}`}>
                  <div className={`p-4 rounded-3xl ${
                    msg.role === 'user' 
                      ? 'bg-emerald-600 text-white rounded-tr-none' 
                      : 'bg-slate-100 dark:bg-slate-800 rounded-tl-none'
                  }`}>
                    <p className="whitespace-pre-wrap leading-relaxed text-sm md:text-base">{msg.content}</p>
                    
                    {msg.type === 'calculation' && (
                      <div className="mt-4 p-3 bg-white/10 rounded-xl border border-white/20">
                        <Calculator className="h-4 w-4 mb-2" />
                        <span className="text-[10px] uppercase font-bold tracking-wider">Technical Calculation</span>
                      </div>
                    )}
                  </div>
                  
                  {msg.references && (
                    <div className="flex flex-wrap gap-2 mt-2">
                      {msg.references.map((ref, i) => (
                        <a 
                          key={i} 
                          href={ref.url} 
                          className="flex items-center gap-1.5 bg-slate-50 dark:bg-slate-800 border px-2.5 py-1 rounded-full text-[10px] font-medium hover:bg-slate-100 transition-colors"
                        >
                          <ExternalLink size={10} />
                          {ref.title}
                        </a>
                      ))}
                    </div>
                  )}
                </div>
              </motion.div>
            ))}
            {isTyping && (
              <div className="flex gap-3">
                <div className="h-10 w-10 rounded-2xl bg-emerald-100 text-emerald-600 flex items-center justify-center">
                  <Bot size={20} />
                </div>
                <div className="bg-slate-100 dark:bg-slate-800 p-4 rounded-3xl rounded-tl-none flex gap-1 items-center">
                  <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-bounce [animation-delay:-0.3s]"></span>
                  <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-bounce [animation-delay:-0.15s]"></span>
                  <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-bounce"></span>
                </div>
              </div>
            )}
          </div>
        </ScrollArea>

        <div className="p-4 md:p-6 border-t bg-slate-50/50 dark:bg-slate-900/50">
          <div className="flex gap-2 mb-4 overflow-x-auto pb-2 no-scrollbar">
            {quickPrompts.map((prompt, i) => (
              <button
                key={i}
                onClick={() => setInput(prompt.label)}
                className="flex-shrink-0 flex items-center gap-2 bg-white dark:bg-slate-800 border px-4 py-2 rounded-2xl text-xs font-medium hover:border-emerald-500 hover:text-emerald-600 transition-all shadow-sm"
              >
                <prompt.icon size={14} />
                {prompt.label}
              </button>
            ))}
          </div>
          
          <div className="flex gap-3">
            <div className="relative flex-1">
              <Input
                placeholder="Ask anything about solar installation or sizing..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                className="pr-12 h-14 rounded-2xl border-2 focus-visible:ring-emerald-500 focus-visible:border-emerald-500"
              />
              <Button 
                size="icon" 
                className="absolute right-2 top-2 h-10 w-10 bg-emerald-600 hover:bg-emerald-700 rounded-xl"
                onClick={handleSend}
                disabled={!input.trim() || isTyping}
              >
                <Send size={18} />
              </Button>
            </div>
          </div>
          <p className="text-[10px] text-center text-muted-foreground mt-3">
            Powered by Solar Wise Knowledge Engine. AI can make mistakes. Check technical manuals for safety.
          </p>
        </div>
      </div>
    </div>
  );
};

export default AIService;