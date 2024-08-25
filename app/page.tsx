// app/page.tsx

"use client";

import React, { useState } from 'react';
import Navbar from './components/navbar';
import Footer from './components/footer';
import Home from './components/Home';
import ObjectIdentifier from './components/ObjectIdentifier';
import Services from './components/services';

export default function Page() {
  // Update the type to include 'anotherService'
  const [view, setView] = useState<'hero' | 'services' | 'objectIdentifier' | 'anotherService'>('hero');

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

      {view === 'anotherService' && (
        <div className="flex-grow flex flex-col items-center justify-center p-6">
          {/* Content for another service */}
          <h1 className="text-5xl font-extrabold text-white mb-8">Another Service Application</h1>
          {/* Add more details or components for the service here */}
        </div>
      )}

      <Footer />
    </div>
  );
}
