import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Terminal as TerminalIcon, Check, XCircle, AlertTriangle } from 'lucide-react';

const codeSnippetBuggy = `function calculateTotal(items) {
  return items.reduce((acc, item) => {
    return acc + item.price * item.qty;
  }, 0);
}

// Error: undefined is not an object (evaluating 'item.price')`;

const codeSnippetFixed = `function calculateTotal(items) {
  if (!items || !Array.isArray(items)) return 0;
  
  return items.reduce((acc, item) => {
    const price = item?.price ?? 0;
    const qty = item?.qty ?? 0;
    return acc + (price * qty);
  }, 0);
}

// Status: All tests passed.`;

export const Terminal = () => {
  const [code, setCode] = useState('');
  const [status, setStatus] = useState<'typing' | 'error' | 'fixing' | 'success'>('typing');

  useEffect(() => {
    let timeout: NodeJS.Timeout;

    const typeCode = async () => {
      // 1. Type buggy code
      for (let i = 0; i <= codeSnippetBuggy.length; i++) {
        setCode(codeSnippetBuggy.slice(0, i));
        await new Promise(r => setTimeout(r, 30));
      }
      setStatus('error');
      
      await new Promise(r => setTimeout(r, 1500));
      
      // 2. "Fixing" animation
      setStatus('fixing');
      setCode('Analyzing stack trace...\nLocating source...\nApplying fix...');
      
      await new Promise(r => setTimeout(r, 1000));

      // 3. Show fixed code
      for (let i = 0; i <= codeSnippetFixed.length; i++) {
        setCode(codeSnippetFixed.slice(0, i));
        await new Promise(r => setTimeout(r, 20));
      }
      setStatus('success');
      
      // Loop
      await new Promise(r => setTimeout(r, 4000));
      setStatus('typing');
      typeCode();
    };

    typeCode();

    return () => clearTimeout(timeout);
  }, []);

  return (
    <motion.div 
      className="w-full max-w-2xl mx-auto bg-[#0F1115] rounded-xl border border-white/10 shadow-2xl overflow-hidden font-mono text-sm relative group"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.2 }}
    >
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3 bg-white/5 border-b border-white/5">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-red-500/20 border border-red-500/50" />
          <div className="w-3 h-3 rounded-full bg-yellow-500/20 border border-yellow-500/50" />
          <div className="w-3 h-3 rounded-full bg-green-500/20 border border-green-500/50" />
        </div>
        <div className="flex items-center gap-2 text-xs text-gray-500">
          <TerminalIcon size={12} />
          <span>rubberduck-cli — v2.4.0</span>
        </div>
      </div>

      {/* Content */}
      <div className="p-6 min-h-[300px] relative">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[#0F1115]/50 pointer-events-none" />
        
        <pre className="text-gray-300 font-mono leading-relaxed whitespace-pre-wrap">
          {code}
          <span className="animate-pulse inline-block w-2 h-4 bg-accent-primary ml-1 align-middle" />
        </pre>

        {/* Status Overlay */}
        <div className="absolute bottom-6 right-6 flex flex-col gap-2 items-end">
          {status === 'error' && (
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="flex items-center gap-2 px-3 py-1.5 bg-red-500/10 border border-red-500/20 rounded-full text-red-400 text-xs"
            >
              <XCircle size={14} />
              <span>Runtime Error Detected</span>
            </motion.div>
          )}
          {status === 'fixing' && (
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="flex items-center gap-2 px-3 py-1.5 bg-accent-primary/10 border border-accent-primary/20 rounded-full text-accent-primary text-xs"
            >
              <AlertTriangle size={14} />
              <span>AI Analyzing...</span>
            </motion.div>
          )}
          {status === 'success' && (
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="flex items-center gap-2 px-3 py-1.5 bg-green-500/10 border border-green-500/20 rounded-full text-green-400 text-xs"
            >
              <Check size={14} />
              <span>Patch Applied Successfully</span>
            </motion.div>
          )}
        </div>
      </div>
    </motion.div>
  );
};
