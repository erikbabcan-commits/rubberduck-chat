import React from 'react';
import { motion } from 'framer-motion';
import { Zap, Shield, Code, GitBranch, Cpu, ArrowUpRight } from 'lucide-react';

const features = [
  {
    icon: Zap,
    title: "Instant Fixes",
    description: "Detects and patches bugs in <50ms. Faster than you can switch tabs.",
    colSpan: "col-span-12 md:col-span-4",
  },
  {
    icon: Shield,
    title: "Security First",
    description: "SOC2 Type II compliant. Your code never leaves our encrypted sandbox.",
    colSpan: "col-span-12 md:col-span-4",
  },
  {
    icon: GitBranch,
    title: "Automated PRs",
    description: "We open pull requests with detailed explanations. You just review and merge.",
    colSpan: "col-span-12 md:col-span-4",
  },
  {
    icon: Code,
    title: "Multi-Language Support",
    description: "Python, TypeScript, Rust, Go. We speak your stack fluently.",
    colSpan: "col-span-12 md:col-span-6",
  },
  {
    icon: Cpu,
    title: "Context Aware",
    description: "Understands your entire dependency tree, not just the current file.",
    colSpan: "col-span-12 md:col-span-6",
  },
];

export const FeatureGrid = () => {
  return (
    <section id="features" className="py-24 px-6 relative overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="mb-20 text-center">
          <h2 className="text-3xl md:text-5xl font-bold mb-6 tracking-tight">
            Surgical Precision for <span className="text-white">Messy Codebases</span>
          </h2>
          <p className="text-gray-400 max-w-xl mx-auto text-lg leading-relaxed">
            Built for engineering teams that ship fast and break things. We fix them before users notice.
          </p>
        </div>

        <div className="grid grid-cols-12 gap-6">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className={`relative group p-8 rounded-2xl border border-white/5 bg-white/[0.02] hover:bg-white/[0.04] transition-all duration-300 ${feature.colSpan}`}
            >
              <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <ArrowUpRight className="text-accent-primary w-5 h-5" />
              </div>
              
              <div className="w-12 h-12 rounded-lg bg-white/5 flex items-center justify-center mb-6 text-gray-400 group-hover:text-accent-primary group-hover:bg-accent-primary/10 transition-all duration-300">
                <feature.icon size={24} />
              </div>
              
              <h3 className="text-xl font-semibold mb-3 text-white group-hover:text-white transition-colors">
                {feature.title}
              </h3>
              
              <p className="text-gray-400 leading-relaxed max-w-sm group-hover:text-gray-300 transition-colors">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
