// app/components/Home.tsx

import React from 'react';
import HeroSection from './heroSection';

interface HomeProps {
  onViewChange: (view: 'hero' | 'services' | 'objectIdentifier') => void;
  onViewProjects: () => void; // Add this prop to handle project navigation
}

const Home: React.FC<HomeProps> = ({ onViewChange, onViewProjects }) => {
  return (
    <>
      <HeroSection onViewProjects={onViewProjects} />
    </>
  );
};

export default Home;
