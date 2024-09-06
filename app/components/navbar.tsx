// app/components/navbar.tsx

import React, { useEffect, useState } from 'react';

interface NavbarProps {
  onHomeClick: () => void;
  onServicesClick: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ onHomeClick, onServicesClick }) => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Prevent rendering different content during hydration by rendering only after the component is mounted
  if (!isMounted) return null;

  return (
    <nav className="bg-gray-800 p-4" style={{ height: '50px' }}>
      <div className="container mx-auto flex justify-between items-center h-full">
        <div>
          <img
            src="/gallery/logo/salomonx.png"
            alt="AI Identify Logo"
            style={{ height: '75px', width: 'auto' }}
          />
        </div>
        <ul className="flex space-x-6">
          <li>
            <button onClick={onHomeClick} className="text-white hover:text-gray-400">
              Home
            </button>
          </li>
          <li>
            <button onClick={onServicesClick} className="text-white hover:text-gray-400">
              Projects
            </button>
          </li>
          <li>
            <a href="#" className="text-white hover:text-gray-400">
              About
            </a>
          </li>
          <li>
            <a href="#" className="text-white hover:text-gray-400">
              Contact
            </a>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
