// app/components/services.tsx

import React from 'react';

interface ServicesProps {
  onSelectService: (service: 'hero' | 'services' | 'objectIdentifier' | 'imageToText') => void;
}

const Services: React.FC<ServicesProps> = ({ onSelectService }) => {
  return (
    <div
      className="flex-grow flex flex-col items-center justify-center p-6"
      style={{
        background: 'linear-gradient(135deg, #1a1a1a 25%, #222 100%)',
        backgroundImage: 'url("/gallery/patterns/abstract-pattern.png")',
        backgroundSize: '300px 300px',
        backgroundBlendMode: 'overlay',
      }}
    >
      <h1 className="text-5xl font-extrabold text-white mb-8">Our Services</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
        <div className="bg-gray-800 p-6 rounded-lg shadow-lg hover:shadow-2xl transition-shadow duration-300">
          <div className="overflow-hidden rounded-md mb-4 h-48">
            <img
              src="/gallery/object_identify/object.jpg"
              alt="Object Identifier"
              className="object-cover w-full h-full"
            />
          </div>
          <h2 className="text-2xl font-bold text-teal-400 mb-2">Object Identifier</h2>
          <p className="text-gray-400 mb-4">
            Identify objects in images using advanced AI models. Upload an image and get detailed information about the objects detected.
          </p>
          <button
            onClick={() => onSelectService('objectIdentifier')}
            className="bg-teal-500 text-white font-semibold px-6 py-3 rounded-lg hover:bg-teal-600 transition-colors duration-300 w-full"
          >
            Learn More
          </button>
        </div>
        
        <div className="bg-gray-800 p-6 rounded-lg shadow-lg hover:shadow-2xl transition-shadow duration-300">
          <div className="overflow-hidden rounded-md mb-4 h-48">
            <img
              src="/gallery/image_to_text/picture-to-text.webp"
              alt="Image to Text"
              className="object-cover w-full h-full"
            />
          </div>
          <h2 className="text-2xl font-bold text-teal-400 mb-2">Image to Text</h2>
          <p className="text-gray-400 mb-4">
            Transform images into texts using advanced AI models. Upload an image and get a detailed description about it.
          </p>
          <button
            onClick={() => onSelectService('imageToText')}
            className="bg-teal-500 text-white font-semibold px-6 py-3 rounded-lg hover:bg-teal-600 transition-colors duration-300 w-full"
          >
            Learn More
          </button>
        </div>
      </div>
    </div>
  );
};

export default Services;
