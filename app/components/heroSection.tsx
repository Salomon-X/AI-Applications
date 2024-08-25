// app/components/heroSection.tsx

import React, { useEffect, useState } from 'react';
import AboutMe from './aboutMe';
import AboutSalomonX from './aboutSalomonX';

interface HeroSectionProps {
  onGetStarted: () => void;
}

const HeroSection: React.FC<HeroSectionProps> = ({ onGetStarted }) => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null; // Don't render anything on the server, only render on the client.
  }

  return (
    <div>
      <div
        className="relative w-full h-screen bg-cover bg-center flex items-center justify-center"
        style={{
          backgroundImage: `url('/gallery/heroSection/background.jpg')`,
        }}
      >
        <div className="absolute inset-0 bg-black opacity-50"></div>
        <div className="relative z-10 max-w-4xl mx-auto text-center p-6 text-white">
          <h1 className="text-6xl font-extrabold mb-4">Welcome to SalomonX AI & Data Solutions</h1>
          <p className="text-xl mb-8">We Provide AI Applications and Data Solutions Using Advanced Technology.</p>
          <div className="flex justify-center space-x-4">
            <button
              onClick={onGetStarted}
              className="bg-teal-500 text-white font-semibold text-lg px-6 py-3 rounded-lg hover:bg-teal-600 transition-colors duration-300"
            >
              Get Started
            </button>
            <button className="bg-transparent border-2 border-teal-500 text-teal-500 font-semibold text-lg px-6 py-3 rounded-lg hover:bg-teal-500 hover:text-white transition-colors duration-300">
              Learn More
            </button>
          </div>
        </div>
      </div>

      <AboutSalomonX />
    </div>
  );
};

export default HeroSection;
