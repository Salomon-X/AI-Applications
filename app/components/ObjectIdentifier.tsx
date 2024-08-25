// app/components/ObjectIdentifier.tsx

import React, { useState, useRef, useEffect } from 'react';
import Highlights from './highlights';

const ObjectIdentifier: React.FC = () => {
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [previewImageUrl, setPreviewImageUrl] = useState<string | null>(null);
  const [result, setResult] = useState<any | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const imgRef = useRef<HTMLImageElement | null>(null);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setSelectedImage(file);
      setPreviewImageUrl(URL.createObjectURL(file));
    }
  };

  const triggerFileSelect = () => {
    fileInputRef.current?.click();
  };

  const classifyImage = async () => {
    if (!selectedImage) return;

    setLoading(true);
    setResult(null);

    try {
      const reader = new FileReader();
      reader.readAsDataURL(selectedImage);

      reader.onloadend = async () => {
        const base64Image = reader.result?.toString().split(',')[1]; // Get the base64 part

        // Send the image to the API route
        const response = await fetch('/api/identify-object', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ imageBase64: base64Image }),
        });

        const data = await response.json();

        if (data.results) {
          setResult(data.results); // Store the result as an object
        } else {
          setResult('No objects detected with sufficient confidence.');
        }

        setLoading(false);
      };
    } catch (error) {
      console.error('Error identifying object:', error);
      setResult('Failed to identify object.');
      setLoading(false);
    }
  };

  useEffect(() => {
    if (imgRef.current && previewImageUrl) {
      imgRef.current.onload = () => {
        setResult(result); // Trigger a state change to cause a re-render
      };
    }
  }, [previewImageUrl, result]);

  const drawBoundingBox = () => {
    if (!result || !previewImageUrl) return null;

    return (
      <div className="relative w-full h-auto">
        <img ref={imgRef} src={previewImageUrl} alt="Selected image" className="w-full h-auto rounded-lg" />
        {result.map((obj: any, index: number) => (
          <div
            key={index}
            className="absolute border-2 border-blue-500 rounded-md"
            style={{
              top: `${(obj.box.ymin / imgRef.current?.naturalHeight!) * 100}%`,
              left: `${(obj.box.xmin / imgRef.current?.naturalWidth!) * 100}%`,
              width: `${((obj.box.xmax - obj.box.xmin) / imgRef.current?.naturalWidth!) * 100}%`,
              height: `${((obj.box.ymax - obj.box.ymin) / imgRef.current?.naturalHeight!) * 100}%`,
            }}
          >
            <p className="text-white bg-blue-600 bg-opacity-75 p-1 text-xs rounded-t-md">
              {obj.label} <span className="font-bold">({(obj.score * 100).toFixed(2)}%)</span>
            </p>
          </div>
        ))}
      </div>
    );
  };

  const renderResults = () => {
    if (typeof result === 'string') {
      return <p className="text-lg text-gray-800">{result}</p>;
    }

    return (
      <ul className="space-y-2">
        {result.map((obj: any, index: number) => (
          <li key={index} className="text-blue-700">
            <span className="font-semibold">{obj.label}:</span> {(obj.score * 100).toFixed(2)}%
          </li>
        ))}
      </ul>
    );
  };

  return (
    <div className="flex-grow flex flex-col items-center justify-center p-6">
      <h1 className="text-5xl font-extrabold text-white mb-8">Object Detection Application</h1>
      <Highlights />
      <div className="bg-gray-800 p-8 rounded-lg shadow-2xl w-full max-w-lg">
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          onChange={handleImageUpload}
          className="hidden"
        />
        <button
          onClick={triggerFileSelect}
          className="mb-6 bg-teal-500 text-white font-semibold text-lg px-6 py-3 rounded-lg w-full hover:bg-teal-600 transition-colors duration-300"
        >
          Select Image
        </button>
        {previewImageUrl && drawBoundingBox()}
        <button
          onClick={classifyImage}
          className="mt-4 bg-yellow-500 text-white font-semibold text-lg px-6 py-3 rounded-lg w-full hover:bg-yellow-600 transition-colors duration-300"
          disabled={!selectedImage || loading}
        >
          {loading ? 'Identifying...' : 'Identify Object'}
        </button>
        {loading && (
          <div className="flex justify-center my-4">
            <div className="loader ease-linear rounded-full border-4 border-t-4 border-gray-200 h-12 w-12"></div>
          </div>
        )}
        {!loading && result && (
          <div className="mt-4 bg-blue-50 p-4 rounded-lg text-gray-900">
            <h2 className="text-2xl font-bold text-blue-600 mb-4">Detection Results</h2>
            {renderResults()}
          </div>
        )}
      </div>
    </div>
  );
};

export default ObjectIdentifier;
