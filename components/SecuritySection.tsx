import React from 'react';
import { motion } from 'framer-motion';
import { Shield, Lock, Eye, FileKey, Server, Database } from 'lucide-react';

const securityFeatures = [
  {
    icon: FileKey,
    title: "SBOM Generation",
    description: "Automatic Software Bill of Materials for every patch."
  },
  {
    icon: Eye,
    title: "Audit Logs",
    description: "Immutable logs of every file access and modification."
  },
  {
    icon: Lock,
    title: "Least Privilege",
    description: "Granular token scopes. We only touch what we need."
  },
  {
    icon: Database,
    title: "Data Retention",
    description: "Code is processed in memory and never persisted."
  },
  {
    icon: Server,
    title: "Self-Hosted Option",
    description: "Deploy in your own VPC for complete isolation."
  },
  {
    icon: Shield,
    title: "Private Code",
    description: "We never train our models on your private repositories."
  }
];

export const SecuritySection = () => {
  return (
    <section id="security" className="py-24 px-6 border-t border-white/5 bg-[#0F1115]">
      <div className="max-w-7xl mx-auto">
        <div className="mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Security & Compliance</h2>
          <p className="text-gray-400 max-w-2xl">
            Enterprise-grade security built into the core. SOC2 Type II compliant.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {securityFeatures.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="flex gap-4 p-6 rounded-xl border border-white/5 bg-white/[0.02] hover:bg-white/[0.04] transition-colors"
            >
              <div className="flex-shrink-0">
                <feature.icon className="text-accent-primary" size={24} />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-white mb-2">{feature.title}</h3>
                <p className="text-sm text-gray-400 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
