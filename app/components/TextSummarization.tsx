"use client";

import React, { useState } from 'react';

const TextSummarization: React.FC = () => {
  const [text, setText] = useState<string>('');
  const [summary, setSummary] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [maxLength, setMaxLength] = useState<number>(130);
  const [minLength, setMinLength] = useState<number>(30);
  const [error, setError] = useState<string | null>(null);

  const handleSummarizeText = async () => {
    if (!text) return;

    setLoading(true);
    setSummary(null);
    setError(null);

    try {
      const response = await fetch('/api/summarization', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          text,
          max_length: maxLength,
          min_length: minLength,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setSummary(data.summary.trim());
      } else {
        setError(data.error || 'Failed to summarize text.');
      }
    } catch (error) {
      console.error('Error summarizing text:', error);
      setError('Failed to summarize text.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex-grow flex flex-col items-center justify-center p-6">
      <h1 className="text-5xl font-extrabold text-white mb-8">Text Summarization</h1>
      
      <div className="bg-gray-800 p-8 rounded-lg shadow-2xl w-full max-w-xl">
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Enter the text you want to summarize..."
          className="w-full p-4 mb-4 bg-gray-700 text-white rounded-lg resize-none"
          rows={10}
        ></textarea>

        <div className="flex flex-col md:flex-row md:space-x-4 mb-4">
          <div className="flex-1 mb-4 md:mb-0">
            <label className="block text-sm font-medium text-gray-300 mb-1">Max Length</label>
            <input
              type="number"
              value={maxLength}
              onChange={(e) => setMaxLength(parseInt(e.target.value))}
              min={50}
              max={500}
              className="w-full p-2 bg-gray-700 text-white rounded-lg"
            />
          </div>

          <div className="flex-1">
            <label className="block text-sm font-medium text-gray-300 mb-1">Min Length</label>
            <input
              type="number"
              value={minLength}
              onChange={(e) => setMinLength(parseInt(e.target.value))}
              min={10}
              max={100}
              className="w-full p-2 bg-gray-700 text-white rounded-lg"
            />
          </div>
        </div>

        <button
          onClick={handleSummarizeText}
          className="bg-teal-500 text-white font-semibold text-lg px-6 py-3 rounded-lg w-full hover:bg-teal-600 transition-colors duration-300 disabled:opacity-50"
          disabled={!text || loading}
        >
          {loading ? 'Summarizing...' : 'Summarize Text'}
        </button>

        {error && (
          <div className="mt-4 bg-red-500 text-white p-4 rounded-lg">
            <p>{error}</p>
          </div>
        )}

        {summary && (
          <div className="mt-4 bg-gray-700 p-4 rounded-lg text-white">
            <h2 className="text-2xl font-bold text-teal-400 mb-2">Summary</h2>
            <p>{summary}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default TextSummarization;
