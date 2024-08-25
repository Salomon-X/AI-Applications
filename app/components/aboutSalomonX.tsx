// app/components/aboutSalomonX.tsx

import React from 'react';

const AboutSalomonX: React.FC = () => {
  return (
    <section className="bg-gray-100 text-gray-800 py-12">
      <div className="container mx-auto px-6 lg:px-20">
        <div className="flex flex-col lg:flex-row items-center">
          <div className="lg:w-1/2 lg:pr-12">
            <img
              src="/gallery/logo/black.png"
              alt="SalomonX Logo"
              className="rounded-lg shadow-lg"
            />
          </div>
          <div className="lg:w-1/2 mt-8 lg:mt-0">
            <h2 className="text-4xl font-extrabold text-gray-900 mb-4">SalomonX</h2>
            <p className="text-lg leading-relaxed">
              SalomonX is at the intersection of innovation and technology, driving the future of AI-driven solutions.
              Our mission is to harness the power of artificial intelligence and data engineering to solve complex challenges
              and create transformative experiences for our clients.
            </p>
            <p className="text-lg leading-relaxed mt-4">
              We specialize in developing AI applications that are not only powerful but also scalable, adaptable, and tailored
              to the unique needs of each business we work with. Our team, led by experts in AI and data engineering, is dedicated
              to providing high-quality, reliable, and cutting-edge solutions that drive growth, efficiency, and competitive advantage.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSalomonX;
