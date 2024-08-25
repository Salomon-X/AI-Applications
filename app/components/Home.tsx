// app/components/Home.tsx

import React from 'react';
import HeroSection from './heroSection';
import Services from './services';

interface HomeProps {
    onViewChange: (view: 'hero' | 'services' | 'objectIdentifier') => void;
  }

const Home: React.FC<HomeProps> = ({ onViewChange }) => {
  return (
    <>
      <HeroSection onGetStarted={() => onViewChange('services')} />
    </>
  );
};

export default Home;
