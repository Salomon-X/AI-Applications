import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const { text, max_length = 130, min_length = 30 } = await request.json();

    if (!text) {
      return NextResponse.json({ error: 'No text provided.' }, { status: 400 });
    }

    // Send the text to Hugging Face Inference API
    const response = await fetch('https://api-inference.huggingface.co/models/facebook/bart-large-cnn', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.HUGGING_FACE_TOKEN}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        inputs: text,
        parameters: {
          max_length: max_length,
          min_length: min_length,
          do_sample: false,
        },
        options: {
          wait_for_model: true, // Wait if the model is loading
        },
      }),
    });

    if (!response.ok) {
      const error = await response.json();
      console.error('Hugging Face API Error:', error);
      return NextResponse.json({ error: error.error || 'Failed to summarize text.' }, { status: response.status });
    }

    const results = await response.json();
    return NextResponse.json({ summary: results[0].summary_text });
  } catch (error) {
    console.error('Error during text summarization:', error);
    return NextResponse.json({ error: 'Failed to summarize text.' }, { status: 500 });
  }
}
