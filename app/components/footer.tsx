import React, { useEffect, useState } from 'react';

const Footer: React.FC = () => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  return (
    <footer className="bg-gray-600 text-white py-4">
      <div className="container mx-auto text-center">
        <p className="mb-2">A.Salomon &copy; {new Date().getFullYear()}</p>
        <p className="mb-4">
          Providing cutting-edge AI applications and data services
        </p>
        <div className="space-x-4">
          <a href="#" className="hover:underline">Privacy Policy</a>
          <a href="#" className="hover:underline">Terms of Service</a>
          <a href="#" className="hover:underline">Contact Me</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
