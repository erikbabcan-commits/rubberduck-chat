import React from 'react';
import { motion } from 'framer-motion';
import { GitBranch, Search, FileCode } from 'lucide-react';

const steps = [
  {
    icon: GithubIcon,
    title: "Connect Repo",
    description: "Securely connect your GitHub or GitLab repository. We only request least-privilege access."
  },
  {
    icon: Search,
    title: "Diagnose",
    description: "Our agent scans for bugs, vulnerabilities, and performance bottlenecks in real-time."
  },
  {
    icon: GitBranch,
    title: "Auto-Fix",
    description: "RubberDuck generates a patch, runs your test suite, and opens a PR ready for merge."
  }
];

function GithubIcon(props: any) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
      <path d="M9 18c-4.51 2-5-2-7-2" />
    </svg>
  )
}

export const HowItWorks = () => {
  return (
    <section id="how-it-works" className="py-24 px-6 border-t border-white/5 bg-[#0F1115]">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">How it works</h2>
          <p className="text-gray-400">From bug to fix in three autonomous steps.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
          {/* Connector Line */}
          <div className="hidden md:block absolute top-12 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-white/10 to-transparent" />

          {steps.map((step, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.2 }}
              className="relative flex flex-col items-center text-center z-10"
            >
              <div className="w-24 h-24 rounded-2xl bg-[#0F1115] border border-white/10 flex items-center justify-center mb-6 shadow-xl group hover:border-accent-primary/50 transition-colors duration-300">
                <step.icon size={32} className="text-gray-400 group-hover:text-accent-primary transition-colors duration-300" />
              </div>
              <h3 className="text-xl font-semibold mb-3 text-white">{step.title}</h3>
              <p className="text-gray-400 text-sm leading-relaxed max-w-xs">
                {step.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
