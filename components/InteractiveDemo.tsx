import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Highlight, themes } from 'prism-react-renderer';
import { Play, RotateCcw, Wand2, Check, AlertTriangle, Terminal, Code2, Cpu } from 'lucide-react';
import { GoogleGenAI } from "@google/genai";
import { Button } from './Button';

const presets = [
  {
    id: 'infinite-loop',
    label: 'Infinite Loop',
    icon: RotateCcw,
    buggy: `function processQueue(items) {
  let i = 0;
  while (i < items.length) {
    console.log(items[i]);
    // Missing increment!
  }
}`,
    fixed: `function processQueue(items) {
  let i = 0;
  while (i < items.length) {
    console.log(items[i]);
    i++; // Fixed: Added increment
  }
}`,
    description: "Detects and fixes potential infinite loops that could crash the browser."
  },
  {
    id: 'null-safety',
    label: 'Null Safety',
    icon: AlertTriangle,
    buggy: `function getUserName(user) {
  return user.profile.name.first; 
  // Crash if user or profile is null
}`,
    fixed: `function getUserName(user) {
  return user?.profile?.name?.first ?? 'Guest';
  // Fixed: Added optional chaining and default value
}`,
    description: "Automatically adds optional chaining to prevent runtime errors."
  },
  {
    id: 'react-effect',
    label: 'React Effect',
    icon: Code2,
    buggy: `useEffect(() => {
  document.title = \`Count: \${count}\`;
}, []); // Missing dependency 'count'`,
    fixed: `useEffect(() => {
  document.title = \`Count: \${count}\`;
}, [count]); // Fixed: Added missing dependency`,
    description: "Identifies missing dependencies in React hooks to prevent stale closures."
  }
];

export const InteractiveDemo = () => {
  const [activePreset, setActivePreset] = useState(presets[0]);
  const [code, setCode] = useState(presets[0].buggy);
  const [isFixing, setIsFixing] = useState(false);
  const [isFixed, setIsFixed] = useState(false);
  const [customMode, setCustomMode] = useState(false);
  const [customCode, setCustomCode] = useState('// Type your buggy code here...');

  const handlePresetChange = (preset: typeof presets[0]) => {
    setActivePreset(preset);
    setCode(preset.buggy);
    setIsFixed(false);
    setCustomMode(false);
  };

  const handleFix = async () => {
    setIsFixing(true);
    
    if (customMode) {
      try {
        const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
        const model = "gemini-2.5-flash-latest"; // Using a fast model
        
        const prompt = `Fix the following code snippet. Return ONLY the fixed code, no markdown, no explanations. Preserve comments if useful, or add a comment explaining the fix.
        
        Code:
        ${customCode}`;

        const response = await ai.models.generateContent({
          model: model,
          contents: prompt,
        });
        
        const fixed = response.text?.replace(/```\w*\n?|```/g, '').trim();
        setCode(fixed || customCode);
        setIsFixed(true);
      } catch (error) {
        console.error("Fix failed:", error);
        // Fallback or error state
      }
    } else {
      // Simulate processing time for presets
      await new Promise(resolve => setTimeout(resolve, 1500));
      setCode(activePreset.fixed);
      setIsFixed(true);
    }
    
    setIsFixing(false);
  };

  const handleReset = () => {
    if (customMode) {
      setCode(customCode);
    } else {
      setCode(activePreset.buggy);
    }
    setIsFixed(false);
  };

  return (
    <section className="py-24 px-6 relative overflow-hidden" id="demo">
      {/* Background Elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10 pointer-events-none">
        <div className="absolute top-1/4 right-0 w-[600px] h-[600px] bg-accent-primary/5 blur-[120px] rounded-full" />
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-blue-500/5 blur-[100px] rounded-full" />
      </div>

      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-5xl font-bold mb-6"
          >
            See it in <span className="text-accent-primary">action</span>.
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-gray-400 max-w-2xl mx-auto text-lg"
          >
            Select a common bug pattern or try your own code. Our agent analyzes context, AST, and dependencies to propose the perfect fix.
          </motion.p>
        </div>

        <div className="grid lg:grid-cols-12 gap-8 items-start">
          {/* Sidebar / Controls */}
          <div className="lg:col-span-4 space-y-4">
            <div className="bg-[#0F1115] border border-white/10 rounded-xl p-2">
              {presets.map((preset) => (
                <button
                  key={preset.id}
                  onClick={() => handlePresetChange(preset)}
                  className={`w-full flex items-center gap-3 p-3 rounded-lg transition-all duration-200 text-left mb-1 ${
                    !customMode && activePreset.id === preset.id
                      ? 'bg-white/10 text-white shadow-lg'
                      : 'text-gray-400 hover:bg-white/5 hover:text-white'
                  }`}
                >
                  <preset.icon size={18} className={!customMode && activePreset.id === preset.id ? 'text-accent-primary' : ''} />
                  <span className="font-medium">{preset.label}</span>
                  {!customMode && activePreset.id === preset.id && (
                    <motion.div layoutId="active-indicator" className="ml-auto w-1.5 h-1.5 rounded-full bg-accent-primary" />
                  )}
                </button>
              ))}
              
              <div className="h-px bg-white/10 my-2 mx-2" />
              
              <button
                onClick={() => {
                  setCustomMode(true);
                  setCode(customCode);
                  setIsFixed(false);
                }}
                className={`w-full flex items-center gap-3 p-3 rounded-lg transition-all duration-200 text-left ${
                  customMode
                    ? 'bg-white/10 text-white shadow-lg'
                    : 'text-gray-400 hover:bg-white/5 hover:text-white'
                }`}
              >
                <Terminal size={18} className={customMode ? 'text-accent-primary' : ''} />
                <span className="font-medium">Custom Input</span>
                {customMode && (
                  <motion.div layoutId="active-indicator" className="ml-auto w-1.5 h-1.5 rounded-full bg-accent-primary" />
                )}
              </button>
            </div>

            <div className="bg-[#0F1115] border border-white/10 rounded-xl p-6">
              <h3 className="text-sm font-mono text-gray-500 uppercase tracking-wider mb-3">Analysis</h3>
              <p className="text-gray-300 leading-relaxed text-sm">
                {customMode 
                  ? "Enter your own code snippet to test our real-time analysis engine. We'll attempt to identify and fix logical errors, syntax issues, or performance bottlenecks."
                  : activePreset.description}
              </p>
            </div>
          </div>

          {/* Code Editor Area */}
          <div className="lg:col-span-8">
            <div className="relative group rounded-xl overflow-hidden border border-white/10 bg-[#0F1115] shadow-2xl min-h-[400px] flex flex-col">
              {/* Editor Header */}
              <div className="flex items-center justify-between px-4 py-3 bg-white/5 border-b border-white/5">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-red-500/20 border border-red-500/50" />
                  <div className="w-3 h-3 rounded-full bg-yellow-500/20 border border-yellow-500/50" />
                  <div className="w-3 h-3 rounded-full bg-green-500/20 border border-green-500/50" />
                </div>
                <div className="flex items-center gap-2 text-xs text-gray-500 font-mono">
                  <Cpu size={12} />
                  <span>AI_AGENT_V3.1</span>
                </div>
              </div>

              {/* Editor Content */}
              <div className="relative flex-grow p-6 font-mono text-sm overflow-auto custom-scrollbar">
                {customMode && !isFixed ? (
                  <textarea
                    value={customCode}
                    onChange={(e) => {
                      setCustomCode(e.target.value);
                      setCode(e.target.value);
                    }}
                    className="w-full h-full bg-transparent text-gray-300 resize-none focus:outline-none placeholder-gray-600 font-mono"
                    spellCheck={false}
                  />
                ) : (
                  <Highlight
                    theme={themes.vsDark}
                    code={code}
                    language="javascript"
                  >
                    {({ className, style, tokens, getLineProps, getTokenProps }) => (
                      <pre style={{ ...style, background: 'transparent' }} className="float-left min-w-full">
                        {tokens.map((line, i) => (
                          <div key={i} {...getLineProps({ line })} className="table-row">
                            <span className="table-cell text-right pr-4 text-gray-600 select-none w-8">{i + 1}</span>
                            <span className="table-cell">
                              {line.map((token, key) => (
                                <span key={key} {...getTokenProps({ token })} />
                              ))}
                            </span>
                          </div>
                        ))}
                      </pre>
                    )}
                  </Highlight>
                )}

                {/* Loading Overlay */}
                <AnimatePresence>
                  {isFixing && (
                    <motion.div 
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="absolute inset-0 bg-[#0F1115]/80 backdrop-blur-sm flex items-center justify-center z-10"
                    >
                      <div className="flex flex-col items-center gap-4">
                        <div className="relative">
                          <div className="w-16 h-16 border-4 border-accent-primary/30 border-t-accent-primary rounded-full animate-spin" />
                          <div className="absolute inset-0 flex items-center justify-center">
                            <Wand2 size={24} className="text-accent-primary animate-pulse" />
                          </div>
                        </div>
                        <p className="text-accent-primary font-mono text-sm animate-pulse">Analyzing AST & Context...</p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Action Bar */}
              <div className="p-4 border-t border-white/5 bg-white/[0.02] flex justify-between items-center">
                <div className="text-xs text-gray-500 font-mono">
                  {isFixed ? (
                    <span className="flex items-center gap-2 text-green-400">
                      <Check size={14} />
                      Fix applied successfully
                    </span>
                  ) : (
                    <span>Ready to analyze</span>
                  )}
                </div>
                
                <div className="flex gap-3">
                  {isFixed && (
                    <Button 
                      variant="outline" 
                      size="sm" 
                      onClick={handleReset}
                      className="text-gray-400 hover:text-white"
                    >
                      <RotateCcw size={14} className="mr-2" />
                      Reset
                    </Button>
                  )}
                  <Button 
                    size="sm" 
                    onClick={handleFix}
                    disabled={isFixing || isFixed}
                    className={isFixed ? 'opacity-50 cursor-not-allowed' : ''}
                  >
                    <Play size={14} className="mr-2 fill-current" />
                    {isFixing ? 'Fixing...' : 'Auto-Fix Code'}
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
