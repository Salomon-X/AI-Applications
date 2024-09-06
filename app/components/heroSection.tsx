// app/components/HeroSection.tsx

import React from 'react';

interface HeroSectionProps {
  onViewProjects: () => void;
}

const HeroSection: React.FC<HeroSectionProps> = ({ onViewProjects }) => {
  return (
    <div className="flex flex-col md:flex-row w-full h-screen bg-gray-900 text-white">
      {/* Left Container */}
      <div className="bg-gray-800 flex-1 p-6 md:w-1/3 flex flex-col items-center justify-center">
        {/* Profile Picture */}
        <img
          src="/gallery/heroSection/your-profile-picture.jpg" // Ensure the path is correct for your profile picture
          alt="Profile"
          className="w-32 h-32 rounded-full mb-4 border-4 border-white"
        />
        {/* Name and About */}
        <h1 className="text-4xl font-bold mb-2">Alaa Salomon</h1>
        <p className="text-center mb-4">
          Data Engineer specializing in creating end-to-end data solutions.
        </p>

        {/* Contact Info */}
        <div className="space-y-2">
          <a href="mailto:alex.salomon741@gmail.com" className="block text-sm hover:underline">
            📧 alex.salomon741@gmail.com
          </a>
          <a href="https://linkedin.com/in/alex-salomon741" className="block text-sm hover:underline">
            🔗 linkedin.com/in/alex-salomon741
          </a>
          <a href="tel:+491764006590" className="block text-sm hover:underline">
            📞 +49176/64006590
          </a>
        </div>
         
         
        {/* Skills Section */}
        <div className="mt-6">
          <h2 className="text-xl font-bold mb-2">Programing Languages</h2>
          <div className="flex space-x-4">
            <span>Python</span>
            <span>SQL</span>
            <span>Java</span>
            <span>Scala</span>
          </div>
        </div>
      </div>

      {/* Right Container */}
      <div className="bg-gray-700 flex-2 p-8 md:w-2/3 overflow-auto">
        <h2 className="text-3xl font-bold mb-4">Experience</h2>
        <ul className="mb-8">
          <li className="mb-4">
            <h3 className="text-xl font-semibold">Autol Group (Dec 2021 - Present)</h3>
            <p>Business Intelligence Manager</p>
            <p>Managing end-to-end data pipelines through handling data at every stage...</p>
          </li>
          <li className="mb-4">
            <h3 className="text-xl font-semibold">Bookingkit (May 2021 - Dec 2021)</h3>
            <p>Customer Success Analyst</p>
            <p>Analyzing customer data and creating reports while working closely with various departments...</p>
          </li>
          {/* Add more experience items as needed */}
        </ul>

        <h2 className="text-3xl font-bold mb-4">Projects</h2>
        <ul className="mb-8">
          <li className="mb-4">
            <h3 className="text-xl font-semibold">AI Applications</h3>
            <button
              onClick={onViewProjects}
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors duration-300"
            >
              View Projects
            </button>
          </li>
          {/* Add more project items as needed */}
        </ul>
      </div>
    </div>
  );
};

export default HeroSection;
