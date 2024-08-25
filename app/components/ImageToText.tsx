// app/components/ImageToText.tsx

"use client";

import React, { useState, useRef } from 'react';

const ImageToText: React.FC = () => {
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [previewImageUrl, setPreviewImageUrl] = useState<string | null>(null);
  const [result, setResult] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setSelectedImage(file);
      setPreviewImageUrl(URL.createObjectURL(file));
    }
  };

  const triggerFileSelect = (cameraMode: boolean = false) => {
    if (cameraMode) {
      fileInputRef.current?.setAttribute('capture', 'camera'); // Activate camera
    } else {
      fileInputRef.current?.removeAttribute('capture'); // Deactivate camera (open file picker)
    }
    fileInputRef.current?.click();
  };

  const convertImageToText = async () => {
    if (!selectedImage) return;

    setLoading(true);
    setResult(null);

    try {
      const reader = new FileReader();
      reader.readAsDataURL(selectedImage);

      reader.onloadend = async () => {
        const base64Image = reader.result?.toString().split(',')[1]; // Get the base64 part

        // Send the image to the API route
        const response = await fetch('/api/image-to-text', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ imageBase64: base64Image }),
        });

        const data = await response.json();

        if (data.text) {
          setResult(data.text); // Store the result text
        } else {
          setResult('Failed to generate text.');
        }

        setLoading(false);
      };
    } catch (error) {
      console.error('Error converting image to text:', error);
      setResult('Failed to generate text.');
      setLoading(false);
    }
  };

  return (
    <div className="flex-grow flex flex-col items-center justify-center p-6">
      <h1 className="text-5xl font-extrabold text-white mb-8">Image to Text Application</h1>
      
      <div className="bg-gray-800 p-8 rounded-lg shadow-2xl w-full max-w-lg">
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          onChange={handleImageUpload}
          className="hidden"
        />
        <div className="flex space-x-4">
          <button
            onClick={() => triggerFileSelect(false)}
            className="mb-6 bg-teal-500 text-white font-semibold text-lg px-6 py-3 rounded-lg w-full hover:bg-teal-600 transition-colors duration-300"
          >
            Select Image
          </button>
          <button
            onClick={() => triggerFileSelect(true)}
            className="mb-6 bg-teal-500 text-white font-semibold text-lg px-6 py-3 rounded-lg w-full hover:bg-teal-600 transition-colors duration-300"
          >
            Take Photo
          </button>
        </div>

        {previewImageUrl && (
          <div className="relative w-full h-auto mb-6">
            <img src={previewImageUrl} alt="Selected" className="w-full h-auto rounded-lg" />
          </div>
        )}

        <button
          onClick={convertImageToText}
          className="mt-4 bg-yellow-500 text-white font-semibold text-lg px-6 py-3 rounded-lg w-full hover:bg-yellow-600 transition-colors duration-300"
          disabled={!selectedImage || loading}
        >
          {loading ? 'Generating Text...' : 'Generate Text'}
        </button>

        {!loading && result && (
          <div className="mt-4 bg-blue-50 p-4 rounded-lg text-gray-900">
            <h2 className="text-2xl font-bold text-blue-600 mb-4">Generated Text</h2>
            <p>{result}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ImageToText;
