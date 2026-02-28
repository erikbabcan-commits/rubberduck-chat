import React from 'react';
import ReactDOM from 'react-dom/client';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { InteractiveDemo } from './components/InteractiveDemo';
import { HowItWorks } from './components/HowItWorks';
import { FeatureGrid } from './components/FeatureGrid';
import { SecuritySection } from './components/SecuritySection';
import { Pricing } from './components/Pricing';
import { FAQ } from './components/FAQ';
import { Footer } from './components/Footer';
import './index.css';

function App() {
  return (
    <div className="min-h-screen bg-[#0F1115] text-white font-sans selection:bg-accent-primary selection:text-black">
      <Navbar />
      <main>
        <Hero />
        <InteractiveDemo />
        <HowItWorks />
        <FeatureGrid />
        <SecuritySection />
        <Pricing />
        <FAQ />
      </main>
      <Footer />
    </div>
  );
}

const rootElement = document.getElementById('root');
if (!rootElement) throw new Error('Failed to find the root element');

ReactDOM.createRoot(rootElement).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
