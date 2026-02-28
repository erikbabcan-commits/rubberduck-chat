import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react';

const faqs = [
  {
    question: "What languages do you support?",
    answer: "We currently support Python, TypeScript/JavaScript, Go, Rust, and Java. C++ support is in beta."
  },
  {
    question: "Is my code safe?",
    answer: "Yes. We use ephemeral environments for analysis. Your code is processed in memory and never stored. We are SOC2 Type II compliant."
  },
  {
    question: "Can I self-host RubberDuck?",
    answer: "Yes, our Enterprise plan allows for full VPC deployment or air-gapped installation."
  },
  {
    question: "How do you handle secrets?",
    answer: "We automatically detect and redact secrets before any processing. We never access or store your environment variables."
  }
];

export const FAQ = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section className="py-24 px-6 border-t border-white/5 bg-[#0F1115]">
      <div className="max-w-3xl mx-auto">
        <h2 className="text-3xl font-bold mb-12 text-center">Frequently Asked Questions</h2>
        
        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div 
              key={index}
              className="border border-white/5 rounded-lg bg-white/[0.02] overflow-hidden"
            >
              <button
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="w-full flex items-center justify-between p-6 text-left hover:bg-white/[0.02] transition-colors"
              >
                <span className="font-medium text-white">{faq.question}</span>
                <ChevronDown 
                  className={`text-gray-500 transition-transform duration-300 ${openIndex === index ? 'rotate-180' : ''}`}
                  size={20}
                />
              </button>
              
              <AnimatePresence>
                {openIndex === index && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="px-6 pb-6 text-gray-400 text-sm leading-relaxed border-t border-white/5 pt-4">
                      {faq.answer}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
