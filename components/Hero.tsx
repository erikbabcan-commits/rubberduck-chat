import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Github } from 'lucide-react';
import { Button } from './Button';
import { TerminalDemo } from './TerminalDemo';

export const Hero = () => {
  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center pt-32 pb-20 px-6 overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[500px] bg-accent-primary/5 blur-[120px] rounded-full opacity-30" />
        <div className="absolute bottom-0 right-0 w-[800px] h-[600px] bg-accent-secondary/5 blur-[100px] rounded-full opacity-20" />
      </div>

      <div className="container max-w-7xl mx-auto relative z-10 flex flex-col items-center text-center">
        
        {/* Heading */}
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-5xl md:text-7xl font-bold tracking-tighter mb-6 max-w-5xl"
        >
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-accent-primary">
            Autonomous code repair.
          </span>
          <br />
          <span className="text-white">In production.</span>
        </motion.h1>

        {/* Subheading */}
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-lg md:text-xl text-gray-400 max-w-2xl mb-10 leading-relaxed"
        >
          AI agent that finds root cause, proposes patch, runs tests, opens PR.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="flex flex-col sm:flex-row items-center gap-4 mb-20"
        >
          <Button size="lg" className="w-full sm:w-auto group">
            Start fixing code 
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Button>
          <Button variant="outline" size="lg" className="w-full sm:w-auto group hover:border-accent-secondary/50 hover:text-accent-secondary">
            <Github className="w-5 h-5 mr-2" />
            <span className="group-hover:underline decoration-accent-secondary underline-offset-4">View on GitHub</span>
          </Button>
        </motion.div>

        {/* Terminal Demo */}
        <div className="w-full">
          <TerminalDemo />
        </div>
      </div>
    </section>
  );
};
