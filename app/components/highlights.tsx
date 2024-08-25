// app/components/highlights.tsx

import React from 'react';

const Highlights: React.FC = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
      <div className="bg-gradient-to-r from-green-400 via-blue-500 to-purple-600 text-white p-3 rounded-lg shadow-md flex flex-col items-center transform hover:scale-105 transition-transform duration-300">
        <div className="text-white mb-1">
          <i className="fas fa-camera text-lg"></i>
        </div>
        <h3 className="font-bold text-base">Capture & Analyze</h3>
        <p className="text-center text-xs">Simply upload an image to analyze objects instantly.</p>
      </div>
      <div className="bg-gradient-to-r from-yellow-400 via-orange-500 to-red-600 text-white p-3 rounded-lg shadow-md flex flex-col items-center transform hover:scale-105 transition-transform duration-300">
        <div className="text-white mb-1">
          <i className="fas fa-sync-alt text-lg"></i>
        </div>
        <h3 className="font-bold text-base">Real-Time Detection</h3>
        <p className="text-center text-xs">Get real-time results with our fast and efficient model.</p>
      </div>
      <div className="bg-gradient-to-r from-teal-400 via-cyan-500 to-blue-600 text-white p-3 rounded-lg shadow-md flex flex-col items-center transform hover:scale-105 transition-transform duration-300">
        <div className="text-white mb-1">
          <i className="fas fa-shield-alt text-lg"></i>
        </div>
        <h3 className="font-bold text-base">Secure & Private</h3>
        <p className="text-center text-xs">Your images are processed securely and privately.</p>
      </div>
      <div className="bg-gradient-to-r from-pink-400 via-red-500 to-yellow-600 text-white p-3 rounded-lg shadow-md flex flex-col items-center transform hover:scale-105 transition-transform duration-300">
        <div className="text-white mb-1">
          <i className="fas fa-brain text-lg"></i>
        </div>
        <h3 className="font-bold text-base">Smart AI</h3>
        <p className="text-center text-xs">Powered by state-of-the-art AI technologies.</p>
      </div>
      <div className="bg-gradient-to-r from-purple-400 via-pink-500 to-red-600 text-white p-3 rounded-lg shadow-md flex flex-col items-center transform hover:scale-105 transition-transform duration-300">
        <div className="text-white mb-1">
          <i className="fas fa-bolt text-lg"></i>
        </div>
        <h3 className="font-bold text-base">Fast Processing</h3>
        <p className="text-center text-xs">Analyze and get results in a matter of seconds.</p>
      </div>
      <div className="bg-gradient-to-r from-indigo-400 via-blue-500 to-green-600 text-white p-3 rounded-lg shadow-md flex flex-col items-center transform hover:scale-105 transition-transform duration-300">
        <div className="text-white mb-1">
          <i className="fas fa-thumbs-up text-lg"></i>
        </div>
        <h3 className="font-bold text-base">User-Friendly</h3>
        <p className="text-center text-xs">Easy to use interface for a seamless experience.</p>
      </div>
    </div>
  );
};

export default Highlights;
