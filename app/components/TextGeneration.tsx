"use client";

import React, { useState } from 'react';

const TextGeneration: React.FC = () => {
  const [prompt, setPrompt] = useState<string>('');
  const [result, setResult] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [maxLength, setMaxLength] = useState<number>(100);
  const [temperature, setTemperature] = useState<number>(0.7);
  const [error, setError] = useState<string | null>(null);

  const handleGenerateText = async () => {
    if (!prompt) return;

    setLoading(true);
    setResult(null);
    setError(null);

    try {
      const response = await fetch('/api/text-generation', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          prompt,
          max_length: maxLength,
          temperature: temperature,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setResult(data.generated_text.trim());
      } else {
        setError(data.error || 'Failed to generate text.');
      }
    } catch (error) {
      console.error('Error generating text:', error);
      setError('Failed to generate text.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex-grow flex flex-col items-center justify-center p-6">
      <h1 className="text-5xl font-extrabold text-white mb-8">Text Generation</h1>
      
      <div className="bg-gray-800 p-8 rounded-lg shadow-2xl w-full max-w-xl">
        <textarea
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder="Enter your prompt here..."
          className="w-full p-4 mb-4 bg-gray-700 text-white rounded-lg resize-none"
          rows={5}
        ></textarea>

        <div className="flex flex-col md:flex-row md:space-x-4 mb-4">
          <div className="flex-1 mb-4 md:mb-0">
            <label className="block text-sm font-medium text-gray-300 mb-1">Max Length</label>
            <input
              type="number"
              value={maxLength}
              onChange={(e) => setMaxLength(parseInt(e.target.value))}
              min={10}
              max={500}
              className="w-full p-2 bg-gray-700 text-white rounded-lg"
            />
          </div>

          <div className="flex-1">
            <label className="block text-sm font-medium text-gray-300 mb-1">Temperature</label>
            <input
              type="number"
              value={temperature}
              onChange={(e) => setTemperature(parseFloat(e.target.value))}
              min={0}
              max={1}
              step={0.1}
              className="w-full p-2 bg-gray-700 text-white rounded-lg"
            />
          </div>
        </div>

        <button
          onClick={handleGenerateText}
          className="bg-teal-500 text-white font-semibold text-lg px-6 py-3 rounded-lg w-full hover:bg-teal-600 transition-colors duration-300 disabled:opacity-50"
          disabled={!prompt || loading}
        >
          {loading ? 'Generating...' : 'Generate Text'}
        </button>

        {error && (
          <div className="mt-4 bg-red-500 text-white p-4 rounded-lg">
            <p>{error}</p>
          </div>
        )}

        {result && (
          <div className="mt-4 bg-gray-700 p-4 rounded-lg text-white whitespace-pre-wrap">
            <h2 className="text-2xl font-bold text-teal-400 mb-2">Generated Text</h2>
            <p>{result}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default TextGeneration;
