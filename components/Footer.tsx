import React from 'react';
import { Twitter, Github, Linkedin } from 'lucide-react';

export const Footer = () => {
  return (
    <footer className="border-t border-white/5 bg-[#0F1115] pt-20 pb-10 px-6">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
        <div className="col-span-1 md:col-span-2">
          <h3 className="text-2xl font-bold text-white mb-6">RubberDuck.Space</h3>
          <p className="text-gray-400 max-w-sm mb-8">
            The autonomous code repair platform for modern engineering teams.
            Ship faster with confidence.
          </p>
          <div className="flex gap-4">
            <a href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-gray-400 hover:bg-white/10 hover:text-white transition-colors">
              <Twitter size={18} />
            </a>
            <a href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-gray-400 hover:bg-white/10 hover:text-white transition-colors">
              <Github size={18} />
            </a>
            <a href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-gray-400 hover:bg-white/10 hover:text-white transition-colors">
              <Linkedin size={18} />
            </a>
          </div>
        </div>

        <div>
          <h4 className="font-semibold text-white mb-6">Product</h4>
          <ul className="space-y-4 text-gray-400">
            <li><a href="#" className="hover:text-accent-primary transition-colors">Features</a></li>
            <li><a href="#" className="hover:text-accent-primary transition-colors">Integrations</a></li>
            <li><a href="#" className="hover:text-accent-primary transition-colors">Pricing</a></li>
            <li><a href="#" className="hover:text-accent-primary transition-colors">Changelog</a></li>
          </ul>
        </div>

        <div>
          <h4 className="font-semibold text-white mb-6">Company</h4>
          <ul className="space-y-4 text-gray-400">
            <li><a href="#" className="hover:text-accent-primary transition-colors">About</a></li>
            <li><a href="#" className="hover:text-accent-primary transition-colors">Blog</a></li>
            <li><a href="#" className="hover:text-accent-primary transition-colors">Careers</a></li>
            <li><a href="#" className="hover:text-accent-primary transition-colors">Contact</a></li>
          </ul>
        </div>
      </div>

      <div className="max-w-7xl mx-auto pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-gray-500">
        <p>© 2024 RubberDuck Inc. All rights reserved.</p>
        <div className="flex gap-8">
          <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
          <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
        </div>
      </div>
    </footer>
  );
};
