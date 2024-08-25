import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const { imageBase64 } = await request.json();

    if (!imageBase64) {
      return NextResponse.json({ error: 'No image provided.' }, { status: 400 });
    }

    // Send the image to Hugging Face Inference API for image-to-text conversion
    const response = await fetch('https://api-inference.huggingface.co/models/Salesforce/blip-image-captioning-large', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.HUGGING_FACE_TOKEN}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        inputs: imageBase64,
      }),
    });

    if (!response.ok) {
      throw new Error(`Hugging Face API request failed: ${response.statusText}`);
    }

    const results = await response.json();
    return NextResponse.json({ text: results[0].generated_text }); // Adjusted to extract the generated text
  } catch (error) {
    console.error('Error during image-to-text processing:', error);
    return NextResponse.json({ error: 'Failed to generate text from image.' }, { status: 500 });
  }
}
