import React from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { FeatureGrid } from './components/FeatureGrid';
import { Footer } from './components/Footer';

function App() {
  return (
    <div className="min-h-screen bg-[#0F1115] text-white font-sans selection:bg-accent-primary selection:text-black">
      <Navbar />
      <main>
        <Hero />
        <FeatureGrid />
      </main>
      <Footer />
    </div>
  );
}

export default App;
