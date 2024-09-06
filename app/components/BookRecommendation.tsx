// /app/components/BookRecommendation.tsx
import React, { useState } from 'react';

const BookRecommendation: React.FC = () => {
  const [books, setBooks] = useState(['', '', '']);
  const [recommendation, setRecommendation] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleInputChange = (index: number, value: string) => {
    const updatedBooks = [...books];
    updatedBooks[index] = value;
    setBooks(updatedBooks);
  };

  const getRecommendations = async () => {
    setLoading(true);
    setError(null);
    setRecommendation(null);

    try {
      const response = await fetch('/api/book-recommendation', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ favoriteBooks: books }),
      });

      const data = await response.json();

      if (data.recommendation) {
        setRecommendation(data.recommendation);
      } else {
        setError('Failed to get recommendations.');
      }
    } catch (err) {
      console.error('Error fetching recommendations:', err);
      setError('Failed to get recommendations.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center p-6">
      <h1 className="text-4xl font-bold mb-6">Book Recommendation Service</h1>
      <div className="flex flex-col space-y-4 w-full max-w-md">
        {books.map((book, index) => (
          <input
            key={index}
            type="text"
            value={book}
            onChange={(e) => handleInputChange(index, e.target.value)}
            placeholder={`Enter Book ${index + 1}`}
            className="p-2 border border-gray-300 rounded-md text-black"
          />
        ))}
        <button
          onClick={getRecommendations}
          disabled={loading}
          className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
        >
          {loading ? 'Getting Recommendations...' : 'Get Recommendations'}
        </button>
        {error && <p className="text-red-500">{error}</p>}
        {recommendation && (
          <div className="mt-4 p-4 bg-gray-800 text-white rounded-md">
            <h2 className="text-2xl font-semibold mb-2">Recommendations</h2>
            <p>{recommendation}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default BookRecommendation;
