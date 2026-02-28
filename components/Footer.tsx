import React from 'react';
import { Twitter, Github, Linkedin, Code2 } from 'lucide-react';

export const Footer = () => {
  return (
    <footer className="border-t border-white/5 bg-[#0F1115] pt-20 pb-10 px-6">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
        <div className="col-span-1 md:col-span-2">
          <div className="flex items-center gap-2 mb-6">
            <div className="w-6 h-6 bg-accent-primary rounded flex items-center justify-center text-black font-bold">
              <Code2 size={14} />
            </div>
            <span className="font-sans font-bold text-lg text-white">
              RubberDuck<span className="text-accent-primary">.Space</span>
            </span>
          </div>
          <p className="text-gray-400 max-w-sm mb-8 text-sm">
            Autonomous code repair for modern engineering teams.
            Ship faster with confidence.
          </p>
          <div className="flex gap-4">
            <a href="#" className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center text-gray-400 hover:bg-white/10 hover:text-white transition-colors">
              <Twitter size={16} />
            </a>
            <a href="#" className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center text-gray-400 hover:bg-white/10 hover:text-white transition-colors">
              <Github size={16} />
            </a>
            <a href="#" className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center text-gray-400 hover:bg-white/10 hover:text-white transition-colors">
              <Linkedin size={16} />
            </a>
          </div>
        </div>

        <div>
          <h4 className="font-semibold text-white mb-6 text-sm">Product</h4>
          <ul className="space-y-3 text-sm text-gray-400">
            <li><a href="#" className="hover:text-accent-primary transition-colors">Features</a></li>
            <li><a href="#" className="hover:text-accent-primary transition-colors">Security</a></li>
            <li><a href="#" className="hover:text-accent-primary transition-colors">Pricing</a></li>
            <li><a href="#" className="hover:text-accent-primary transition-colors">Changelog</a></li>
          </ul>
        </div>

        <div>
          <h4 className="font-semibold text-white mb-6 text-sm">Company</h4>
          <ul className="space-y-3 text-sm text-gray-400">
            <li><a href="#" className="hover:text-accent-primary transition-colors">About</a></li>
            <li><a href="#" className="hover:text-accent-primary transition-colors">Blog</a></li>
            <li><a href="#" className="hover:text-accent-primary transition-colors">Careers</a></li>
            <li><a href="#" className="hover:text-accent-primary transition-colors">Contact</a></li>
          </ul>
        </div>
      </div>

      <div className="max-w-7xl mx-auto pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-gray-500">
        <p>Built in Bratislava / 2026</p>
        <div className="flex gap-8">
          <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
          <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
          <a href="#" className="hover:text-white transition-colors">Status</a>
        </div>
      </div>
    </footer>
  );
};
