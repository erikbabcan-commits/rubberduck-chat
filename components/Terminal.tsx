import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Terminal as TerminalIcon, Check, XCircle, AlertTriangle } from 'lucide-react';

export type Scenario = {
  id: string;
  name: string;
  buggy: string;
  fixed: string;
  errorMsg: string;
};

export const scenarios: Scenario[] = [
  {
    id: 'calculation',
    name: 'Fix Calculation Logic',
    errorMsg: "Error: undefined is not an object (evaluating 'item.price')",
    buggy: `function calculateTotal(items) {
  return items.reduce((acc, item) => {
    return acc + item.price * item.qty;
  }, 0);
}`,
    fixed: `function calculateTotal(items) {
  if (!items || !Array.isArray(items)) return 0;
  
  return items.reduce((acc, item) => {
    const price = item?.price ?? 0;
    const qty = item?.qty ?? 0;
    return acc + (price * qty);
  }, 0);
}`
  },
  {
    id: 'api',
    name: 'Secure API Handler',
    errorMsg: "Security Warning: SQL Injection Vulnerability Detected",
    buggy: `app.get('/users', async (req, res) => {
  const { id } = req.query;
  // ⚠️ VULNERABLE: Direct string concatenation
  const query = "SELECT * FROM users WHERE id = " + id;
  const user = await db.execute(query);
  res.json(user);
});`,
    fixed: `app.get('/users', async (req, res) => {
  const { id } = req.query;
  
  // ✅ FIXED: Parameterized query
  const query = "SELECT * FROM users WHERE id = ?";
  const user = await db.execute(query, [id]);
  
  if (!user) return res.status(404).json({ error: 'User not found' });
  res.json(user);
});`
  },
  {
    id: 'race',
    name: 'Resolve Race Condition',
    errorMsg: "Warning: useEffect missing dependency 'fetchData'",
    buggy: `useEffect(() => {
  let isMounted = true;
  
  fetchData().then(data => {
    setData(data); // Potential memory leak if unmounted
  });

}, []); // Missing dependency`,
    fixed: `useEffect(() => {
  let isMounted = true;
  
  const load = async () => {
    try {
      const data = await fetchData();
      if (isMounted) setData(data);
    } catch (e) {
      if (isMounted) setError(e);
    }
  };

  load();
  return () => { isMounted = false; };
}, [fetchData]);`
  }
];

interface TerminalProps {
  activeScenarioId?: string;
}

export const Terminal = ({ activeScenarioId = 'calculation' }: TerminalProps) => {
  const [code, setCode] = useState('');
  const [status, setStatus] = useState<'typing' | 'error' | 'fixing' | 'success'>('typing');
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const isCancelledRef = useRef(false);

  useEffect(() => {
    const scenario = scenarios.find(s => s.id === activeScenarioId) || scenarios[0];
    isCancelledRef.current = false;
    
    // Clear any existing timeout
    if (timeoutRef.current) clearTimeout(timeoutRef.current);

    const typeCode = async () => {
      setStatus('typing');
      setCode(''); // Reset code
      
      // 1. Type buggy code
      for (let i = 0; i <= scenario.buggy.length; i++) {
        if (isCancelledRef.current) return;
        setCode(scenario.buggy.slice(0, i));
        await new Promise(r => { timeoutRef.current = setTimeout(r, 10); });
      }
      
      // Append error message
      if (isCancelledRef.current) return;
      setCode(prev => prev + `\n\n// ${scenario.errorMsg}`);
      setStatus('error');
      
      await new Promise(r => { timeoutRef.current = setTimeout(r, 1500); });
      if (isCancelledRef.current) return;
      
      // 2. "Fixing" animation
      setStatus('fixing');
      setCode('Analyzing stack trace...\nLocating source...\nApplying fix...');
      
      await new Promise(r => { timeoutRef.current = setTimeout(r, 1000); });
      if (isCancelledRef.current) return;

      // 3. Show fixed code
      for (let i = 0; i <= scenario.fixed.length; i++) {
        if (isCancelledRef.current) return;
        setCode(scenario.fixed.slice(0, i));
        await new Promise(r => { timeoutRef.current = setTimeout(r, 10); });
      }
      
      // Append success message
      if (isCancelledRef.current) return;
      setCode(prev => prev + `\n\n// Status: All tests passed.`);
      setStatus('success');
    };

    typeCode();

    return () => {
      isCancelledRef.current = true;
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, [activeScenarioId]);

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
      <div className="p-6 min-h-[350px] relative">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[#0F1115]/50 pointer-events-none" />
        
        <pre className="text-gray-300 font-mono leading-relaxed whitespace-pre-wrap">
          {code}
          <span className="animate-pulse inline-block w-2 h-4 bg-accent-primary ml-1 align-middle" />
        </pre>

        {/* Status Overlay */}
        <div className="absolute bottom-6 right-6 flex flex-col gap-2 items-end">
          <AnimatePresence mode="wait">
            {status === 'error' && (
              <motion.div 
                key="error"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                className="flex items-center gap-2 px-3 py-1.5 bg-red-500/10 border border-red-500/20 rounded-full text-red-400 text-xs"
              >
                <XCircle size={14} />
                <span>Issue Detected</span>
              </motion.div>
            )}
            {status === 'fixing' && (
              <motion.div 
                key="fixing"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                className="flex items-center gap-2 px-3 py-1.5 bg-accent-primary/10 border border-accent-primary/20 rounded-full text-accent-primary text-xs"
              >
                <AlertTriangle size={14} />
                <span>AI Analyzing...</span>
              </motion.div>
            )}
            {status === 'success' && (
              <motion.div 
                key="success"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                className="flex items-center gap-2 px-3 py-1.5 bg-green-500/10 border border-green-500/20 rounded-full text-green-400 text-xs"
              >
                <Check size={14} />
                <span>Patch Applied</span>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </motion.div>
  );
};
