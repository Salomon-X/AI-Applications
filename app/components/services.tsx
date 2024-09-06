import React from 'react';

interface ServicesProps {
  onSelectService: (
    service: 'hero' | 'services' | 'objectIdentifier' | 'imageToText' | 'textGeneration' | 'textSummarization' | 'bookRecommendation'
  ) => void;
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
        {/* Object Identifier Service */}
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

        {/* Image to Text Service */}
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

        {/* Text Generation Service */}
        <div className="bg-gray-800 p-6 rounded-lg shadow-lg hover:shadow-2xl transition-shadow duration-300">
          <div className="overflow-hidden rounded-md mb-4 h-48">
            <img
              src="/gallery/text_generation/text-generation.webp"
              alt="Text Generation"
              className="object-cover w-full h-full"
            />
          </div>
          <h2 className="text-2xl font-bold text-teal-400 mb-2">Text Generation</h2>
          <p className="text-gray-400 mb-4">
            Generate creative and contextually relevant text using state-of-the-art AI models.
          </p>
          <button
            onClick={() => onSelectService('textGeneration')}
            className="bg-teal-500 text-white font-semibold px-6 py-3 rounded-lg hover:bg-teal-600 transition-colors duration-300 w-full"
          >
            Learn More
          </button>
        </div>

        {/* Text Summarization Service */}
        <div className="bg-gray-800 p-6 rounded-lg shadow-lg hover:shadow-2xl transition-shadow duration-300">
          <div className="overflow-hidden rounded-md mb-4 h-48">
            <img
              src="/gallery/text_summarization/summarization.webp"
              alt="Text Summarization"
              className="object-cover w-full h-full"
            />
          </div>
          <h2 className="text-2xl font-bold text-teal-400 mb-2">Text Summarization</h2>
          <p className="text-gray-400 mb-4">
            Summarize long texts using advanced AI models. Get concise and accurate summaries with ease.
          </p>
          <button
            onClick={() => onSelectService('textSummarization')}
            className="bg-teal-500 text-white font-semibold px-6 py-3 rounded-lg hover:bg-teal-600 transition-colors duration-300 w-full"
          >
            Learn More
          </button>
        </div>

        {/* Book Recommendation Service */}
        <div className="bg-gray-800 p-6 rounded-lg shadow-lg hover:shadow-2xl transition-shadow duration-300">
          <div className="overflow-hidden rounded-md mb-4 h-48">
            <img
              src="/gallery/book_recommendation/book-recommendation.jfif"
              alt="Book Recommendation"
              className="object-cover w-full h-full"
            />
          </div>
          <h2 className="text-2xl font-bold text-teal-400 mb-2">Book Recommendation</h2>
          <p className="text-gray-400 mb-4">
            Discover new books based on your favorite reads with personalized recommendations using AI models.
          </p>
          <button
            onClick={() => onSelectService('bookRecommendation')}
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
