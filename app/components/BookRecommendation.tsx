// /app/components/BookRecommendation.tsx
import React, { useState } from 'react';

const BookRecommendation: React.FC = () => {
  const [books, setBooks] = useState(['', '', '']);
  const [recommendations, setRecommendations] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [bookDetails, setBookDetails] = useState<any>(null);
  const [loadingDetails, setLoadingDetails] = useState(false);

  const handleInputChange = (index: number, value: string) => {
    const updatedBooks = [...books];
    updatedBooks[index] = value;
    setBooks(updatedBooks);
  };

  const getRecommendations = async () => {
    setLoading(true);
    setError(null);
    setRecommendations([]);

    try {
      const response = await fetch('/api/book-recommendation', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ favoriteBooks: books }),
      });

      const data = await response.json();

      if (data.recommendations) {
        setRecommendations(data.recommendations);
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

  const fetchBookDetails = async (title: string, author: string) => {
    setLoadingDetails(true);
    setBookDetails(null);
    setError(null);

    try {
      const response = await fetch('/api/book-details', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title, author }),
      });

      const data = await response.json();

      if (data.description) {
        setBookDetails(data);
      } else {
        setError('Failed to get book details.');
      }
    } catch (error) {
      console.error('Error fetching book details:', error);
      setError('Failed to get book details.');
    } finally {
      setLoadingDetails(false);
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
        <div className="mt-4 flex justify-between space-x-4">
          {recommendations.map((rec, index) => (
            <div
              key={index}
              className="bg-gray-800 text-white p-4 rounded-md shadow-lg w-1/3"
              style={{ minHeight: '200px' }}
            >
              <h3 className="text-xl font-bold">{rec.title}</h3>
              <p className="text-sm italic text-gray-400">by {rec.author}</p>
              <p className="text-sm mb-2">Published in {rec.year}</p>
              <p className="text-sm">{rec.reason}</p>
              <button
                onClick={() => fetchBookDetails(rec.title, rec.author)}
                disabled={loadingDetails} // Disable the button while loading
                className={`mt-2 bg-blue-600 text-white px-2 py-1 rounded-md hover:bg-blue-700 ${loadingDetails ? 'opacity-50 cursor-not-allowed' : ''
                  }`}
              >
                {loadingDetails ? 'Loading...' : 'Tell Me More'}
              </button>
            </div>
          ))}
        </div>
        {loadingDetails && (
          <div className="flex justify-center mt-4">
            <div className="loader"></div> {/* Loader shows while fetching details */}
          </div>
        )}
        {bookDetails && (
          <div className="mt-4 p-4 bg-gray-700 text-white rounded-md">
            <h2 className="text-2xl font-semibold mb-2">More About the Book</h2>
            <p className="mb-2">{bookDetails.description}</p>
            <blockquote className="text-sm italic mb-2">"{bookDetails.quote}"</blockquote>
            <a
              href={bookDetails.googleLink}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-300 hover:underline"
            >
              View on Google
            </a>
          </div>
        )}
      </div>
    </div>
  );
};

export default BookRecommendation;
