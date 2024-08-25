// app/components/services.tsx

import React from 'react';

interface ServicesProps {
  onSelectService: (serviceName: string) => void;
}

const Services: React.FC<ServicesProps> = ({ onSelectService }) => {
  return (
    <section className="bg-white text-gray-800 py-12">
      <div className="container mx-auto px-6 lg:px-20">
        <h2 className="text-4xl font-extrabold text-gray-900 mb-8">Our Services</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div className="bg-gray-100 p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300">
            <h3 className="text-2xl font-bold mb-4">Object Identifier</h3>
            <p className="text-lg mb-4">
              Use our advanced AI technology to identify objects in images with high accuracy.
            </p>
            <button
              onClick={() => onSelectService('objectIdentifier')}
              className="bg-teal-500 text-white font-semibold text-lg px-6 py-2 rounded-lg hover:bg-teal-600 transition-colors duration-300"
            >
              Explore
            </button>
          </div>
          {/* You can add more services here in a similar way */}
        </div>
      </div>
    </section>
  );
};

export default Services;
