import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Github } from 'lucide-react';
import { Button } from './Button';
import { Terminal } from './Terminal';

export const Hero = () => {
  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center pt-32 pb-20 px-6 overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[500px] bg-accent-primary/5 blur-[120px] rounded-full opacity-30" />
        <div className="absolute bottom-0 right-0 w-[800px] h-[600px] bg-accent-secondary/5 blur-[100px] rounded-full opacity-20" />
      </div>

      <div className="container max-w-7xl mx-auto relative z-10 flex flex-col items-center text-center">
        
        {/* Badge */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-8 inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs font-medium text-accent-primary"
        >
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent-primary opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-accent-primary"></span>
          </span>
          v2.0 Now Available
        </motion.div>

        {/* Heading */}
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-5xl md:text-7xl font-bold tracking-tighter mb-6 max-w-4xl"
        >
          <span className="text-white">Autonomous</span>{' '}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-accent-primary">
            Code Repair
          </span>
        </motion.h1>

        {/* Subheading */}
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-lg md:text-xl text-gray-400 max-w-2xl mb-10 leading-relaxed"
        >
          Stop wasting time on syntax errors and race conditions. 
          RubberDuck analyzes your repo, identifies bugs, and opens PRs with fixes automatically.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="flex flex-col sm:flex-row items-center gap-4 mb-20"
        >
          <Button size="lg" className="w-full sm:w-auto group">
            Start Free Trial 
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Button>
          <Button variant="secondary" size="lg" className="w-full sm:w-auto">
            <Github className="w-5 h-5 mr-2" />
            View on GitHub
          </Button>
        </motion.div>

        {/* Terminal Demo */}
        <div className="w-full max-w-5xl">
          <Terminal />
        </div>
      </div>
    </section>
  );
};
