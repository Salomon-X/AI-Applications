// app/components/aboutMe.tsx

import React from 'react';

const AboutMe: React.FC = () => {
  return (
    <section className="bg-white text-gray-800 py-12">
      <div className="container mx-auto px-6 lg:px-20">
        <div className="flex flex-col lg:flex-row items-center">
          <div className="lg:w-1/2 mb-8 lg:mb-0">
            <h2 className="text-4xl font-extrabold text-gray-900 mb-4">About Me</h2>
            <p className="text-lg leading-relaxed">
              As a passionate and dedicated AI Engineer and Data Engineer, I specialize in the full-stack development
              of AI applications, bringing cutting-edge solutions to life from concept to deployment. My expertise lies
              in designing and implementing robust infrastructures that ensure data is delivered reliably and with the highest
              quality.
            </p>
          </div>
          <div className="lg:w-1/2 lg:pl-12">
            <img
              src="/gallery/logo/photo.jpg"
              alt="Your Photo"
              className="rounded-lg shadow-lg"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutMe;
