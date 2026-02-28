import React from 'react';
import { motion } from 'framer-motion';
import { Check } from 'lucide-react';
import { Button } from './Button';

const tiers = [
  {
    name: "Starter",
    price: "$0",
    description: "For individuals and hobby projects.",
    features: [
      "Up to 3 repos",
      "50 fixes / month",
      "Community support",
      "Basic audit logs"
    ]
  },
  {
    name: "Team",
    price: "$49",
    period: "/ seat / mo",
    description: "For fast-moving engineering teams.",
    highlight: true,
    features: [
      "Unlimited repos",
      "Unlimited fixes",
      "Priority support",
      "Advanced insights",
      "Custom guardrails"
    ]
  },
  {
    name: "Enterprise",
    price: "Custom",
    description: "For organizations requiring control.",
    features: [
      "VPC Deployment",
      "SAML / SSO",
      "Dedicated success manager",
      "Custom SLAs",
      "Training on your codebase"
    ]
  }
];

export const Pricing = () => {
  return (
    <section id="pricing" className="py-24 px-6 border-t border-white/5 bg-[#0F1115]">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Simple Pricing</h2>
          <p className="text-gray-400">Start fixing bugs today. Scale as you grow.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {tiers.map((tier, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className={`relative p-8 rounded-2xl border flex flex-col ${
                tier.highlight 
                  ? 'bg-white/[0.03] border-accent-primary/30 shadow-[0_0_30px_rgba(255,215,0,0.05)]' 
                  : 'bg-white/[0.01] border-white/5'
              }`}
            >
              {tier.highlight && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 bg-accent-primary text-black text-xs font-bold rounded-full uppercase tracking-wide">
                  Most Popular
                </div>
              )}

              <div className="mb-8">
                <h3 className="text-xl font-semibold text-white mb-2">{tier.name}</h3>
                <div className="flex items-baseline gap-1 mb-2">
                  <span className="text-4xl font-bold text-white">{tier.price}</span>
                  {tier.period && <span className="text-gray-500 text-sm">{tier.period}</span>}
                </div>
                <p className="text-sm text-gray-400">{tier.description}</p>
              </div>

              <ul className="space-y-4 mb-8 flex-1">
                {tier.features.map((feature, i) => (
                  <li key={i} className="flex items-start gap-3 text-sm text-gray-300">
                    <Check size={16} className="text-accent-primary mt-0.5 flex-shrink-0" />
                    {feature}
                  </li>
                ))}
              </ul>

              <Button 
                variant={tier.highlight ? 'primary' : 'outline'} 
                className="w-full justify-center"
              >
                {tier.name === 'Enterprise' ? 'Contact Sales' : 'Get Started'}
              </Button>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
