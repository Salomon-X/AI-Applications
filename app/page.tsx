// app/page.tsx

"use client";

import React, { useState } from 'react';
import Navbar from './components/navbar';
import Footer from './components/footer';
import Home from './components/Home';
import ObjectIdentifier from './components/ObjectIdentifier';
import ImageToText from './components/ImageToText';
import TextGeneration from './components/TextGeneration';
import TextSummarization from './components/TextSummarization';
import Services from './components/services';
import BookRecommendation from './components/BookRecommendation'; // Import the BookRecommendation component

export default function Page() {
  const [view, setView] = useState<'hero' | 'services' | 'objectIdentifier' | 'imageToText' | 'textGeneration' | 'textSummarization' | 'bookRecommendation'>('hero'); // Add 'bookRecommendation' to the view state

  return (
    <div className="flex flex-col min-h-screen bg-gray-900 text-white">
      <Navbar
        onHomeClick={() => setView('hero')}
        onServicesClick={() => setView('services')}
      />

      {view === 'hero' && (
        <Home
          onViewChange={setView}
          onViewProjects={() => setView('services')}
        />
      )}

      {view === 'services' && <Services onSelectService={setView} />}
      {view === 'objectIdentifier' && <ObjectIdentifier />}
      {view === 'imageToText' && <ImageToText />}
      {view === 'textGeneration' && <TextGeneration />}
      {view === 'textSummarization' && <TextSummarization />}
      {view === 'bookRecommendation' && <BookRecommendation />} {/* Add this line */}

      <Footer />
    </div>
  );
}
