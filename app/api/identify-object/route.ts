import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const { imageBase64 } = await request.json();

    if (!imageBase64) {
      return NextResponse.json({ error: 'No image provided.' }, { status: 400 });
    }

    // Send the image to Hugging Face Inference API
    const response = await fetch('https://api-inference.huggingface.co/models/facebook/detr-resnet-50', {
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
    return NextResponse.json({ results });
  } catch (error) {
    console.error('Error during image classification:', error);
    return NextResponse.json({ error: 'Failed to identify object.' }, { status: 500 });
  }
}
