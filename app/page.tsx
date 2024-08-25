// app/page.tsx

"use client";

import React, { useState } from 'react';
import Navbar from './components/navbar';
import Footer from './components/footer';
import Home from './components/Home';
import ObjectIdentifier from './components/ObjectIdentifier';
import ImageToText from './components/ImageToText';
import Services from './components/services';

export default function Page() {
  const [view, setView] = useState<'hero' | 'services' | 'objectIdentifier' | 'imageToText'>('hero');

  return (
    <div className="flex flex-col min-h-screen bg-gray-900 text-white">
      <Navbar
        onHomeClick={() => setView('hero')}
        onServicesClick={() => setView('services')}
      />

      {view === 'hero' && (
        <Home onViewChange={setView} />
      )}

      {view === 'services' && (
        <Services onSelectService={setView} />
      )}

      {view === 'objectIdentifier' && (
        <ObjectIdentifier />
      )}

      {view === 'imageToText' && (
        <ImageToText />
      )}

      <Footer />
    </div>
  );
}
