import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Activity, GitPullRequest, Search, CheckCircle2, AlertCircle, FileCode, Terminal as TerminalIcon } from 'lucide-react';

const steps = [
  { id: 'scan', label: 'Scan', icon: Search },
  { id: 'patch', label: 'Patch', icon: FileCode },
  { id: 'test', label: 'Test', icon: Activity },
  { id: 'pr', label: 'PR', icon: GitPullRequest },
];

const diffContent = [
  { type: 'context', content: '  function calculateTotal(items) {' },
  { type: 'context', content: '    return items.reduce((acc, item) => {' },
  { type: 'remove', content: '-     return acc + item.price * item.qty;' },
  { type: 'add', content: '+     const price = item?.price ?? 0;' },
  { type: 'add', content: '+     const qty = item?.qty ?? 0;' },
  { type: 'add', content: '+     return acc + (price * qty);' },
  { type: 'context', content: '    }, 0);' },
  { type: 'context', content: '  }' },
];

export const TerminalDemo = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [progress, setProgress] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate initial loading
    const timer = setTimeout(() => setIsLoading(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (isLoading) return;

    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          setCurrentStep((s) => (s + 1) % steps.length);
          return 0;
        }
        return prev + 1;
      });
    }, 50);
    return () => clearInterval(interval);
  }, [isLoading]);

  return (
    <div className="relative w-full max-w-4xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* Main Terminal */}
      <div className="lg:col-span-2 bg-[#0F1115] rounded-xl border border-white/10 shadow-2xl overflow-hidden font-mono text-sm relative group min-h-[400px]">
        {/* Header */}
        <div className="flex items-center justify-between px-4 py-3 bg-white/5 border-b border-white/5">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-red-500/20 border border-red-500/50" />
            <div className="w-3 h-3 rounded-full bg-yellow-500/20 border border-yellow-500/50" />
            <div className="w-3 h-3 rounded-full bg-green-500/20 border border-green-500/50" />
          </div>
          <div className="flex items-center gap-4">
            {steps.map((step, index) => (
              <div 
                key={step.id}
                className={`flex items-center gap-2 text-xs transition-colors duration-300 ${
                  isLoading ? 'opacity-50' :
                  index === currentStep ? 'text-accent-primary' : 
                  index < currentStep ? 'text-green-400' : 'text-gray-600'
                }`}
              >
                <step.icon size={12} />
                <span>{step.label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Progress Bar */}
        <div className="h-0.5 bg-white/5 w-full relative overflow-hidden">
          {!isLoading && (
            <motion.div 
              className="absolute top-0 left-0 h-full bg-accent-primary shadow-[0_0_10px_rgba(255,215,0,0.5)]"
              style={{ width: `${progress}%` }}
              animate={{ opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            />
          )}
        </div>

        {/* Content */}
        <div className="p-6 relative bg-[#0F1115] h-full">
          {isLoading ? (
            <div className="space-y-3 animate-pulse">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="flex gap-4">
                  <div className="w-6 h-4 bg-white/5 rounded" />
                  <div className="h-4 bg-white/5 rounded w-full" style={{ width: `${Math.random() * 50 + 30}%` }} />
                </div>
              ))}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="flex flex-col items-center gap-3">
                  <div className="w-8 h-8 border-2 border-accent-primary border-t-transparent rounded-full animate-spin" />
                  <span className="text-xs text-gray-500 uppercase tracking-wider">Initializing Agent...</span>
                </div>
              </div>
            </div>
          ) : (
            <div className="space-y-1 font-mono text-sm">
              {diffContent.map((line, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.1 }}
                  className={`flex ${
                    line.type === 'add' ? 'bg-accent-primary/10 text-accent-primary' :
                    line.type === 'remove' ? 'bg-red-500/10 text-red-400' :
                    'text-gray-400'
                  }`}
                >
                  <span className="w-6 text-gray-600 select-none text-right pr-2">{i + 1}</span>
                  <span className="select-none w-4 text-center opacity-50">
                    {line.type === 'add' ? '+' : line.type === 'remove' ? '-' : ''}
                  </span>
                  <span>{line.content}</span>
                </motion.div>
              ))}
            </div>
          )}

          {/* Status Overlay */}
          {!isLoading && (
            <div className="absolute bottom-6 right-6">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentStep}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="flex items-center gap-2 px-3 py-1.5 bg-white/5 border border-white/10 rounded-full text-xs text-gray-300 backdrop-blur-md"
                >
                  {currentStep === 2 ? (
                    <>
                      <span className="w-2 h-2 rounded-full bg-accent-primary animate-pulse" />
                      Running tests...
                    </>
                  ) : (
                    <>
                      <TerminalIcon size={12} />
                      <span>Processing {steps[currentStep].label}...</span>
                    </>
                  )}
                </motion.div>
              </AnimatePresence>
            </div>
          )}
        </div>
      </div>

      {/* Side Glass Card */}
      <div className="hidden lg:flex flex-col gap-4">
        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.5 }}
          className="glass-panel p-6 rounded-xl space-y-6 h-full"
        >
          {isLoading ? (
            <div className="space-y-6 animate-pulse">
              <div className="flex justify-between pb-4 border-b border-white/5">
                <div className="w-24 h-4 bg-white/5 rounded" />
                <div className="w-16 h-4 bg-white/5 rounded" />
              </div>
              <div className="space-y-4">
                <div>
                  <div className="w-8 h-8 bg-white/5 rounded mb-2" />
                  <div className="w-20 h-3 bg-white/5 rounded" />
                </div>
                <div>
                  <div className="w-12 h-8 bg-white/5 rounded mb-2" />
                  <div className="w-24 h-3 bg-white/5 rounded" />
                </div>
              </div>
              <div className="pt-4 border-t border-white/5 space-y-3">
                <div className="w-16 h-3 bg-white/5 rounded" />
                <div className="w-full h-4 bg-white/5 rounded" />
                <div className="w-3/4 h-4 bg-white/5 rounded" />
                <div className="w-5/6 h-4 bg-white/5 rounded" />
              </div>
            </div>
          ) : (
            <>
              <div className="flex items-center justify-between border-b border-white/5 pb-4">
                <div className="flex items-center gap-2 text-sm text-gray-300">
                  <div className="w-2 h-2 rounded-full bg-green-400 shadow-[0_0_8px_rgba(74,222,128,0.5)]" />
                  Repo connected
                </div>
                <span className="text-xs text-gray-500 font-mono">ID: 8f3a21</span>
              </div>

              <div className="space-y-4">
                <div>
                  <div className="text-2xl font-bold text-white mb-1">2</div>
                  <div className="text-xs text-gray-400 uppercase tracking-wider">Issues fixed today</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-accent-primary mb-1">31%</div>
                  <div className="text-xs text-gray-400 uppercase tracking-wider">MTTR Reduction</div>
                </div>
              </div>

              <div className="space-y-3 pt-4 border-t border-white/5">
                <div className="text-xs text-gray-500 font-mono mb-2">AUDIT LOG</div>
                {[
                  { status: 'success', text: 'Patch applied to auth.ts' },
                  { status: 'warning', text: 'High latency detected' },
                  { status: 'info', text: 'Scanning dependencies' },
                ].map((log, i) => (
                  <div key={i} className="flex items-center gap-2 text-xs text-gray-400">
                    {log.status === 'success' && <CheckCircle2 size={12} className="text-green-400" />}
                    {log.status === 'warning' && <AlertCircle size={12} className="text-yellow-400" />}
                    {log.status === 'info' && <Activity size={12} className="text-blue-400" />}
                    <span className="truncate">{log.text}</span>
                  </div>
                ))}
              </div>
            </>
          )}
        </motion.div>
      </div>
    </div>
  );
};
