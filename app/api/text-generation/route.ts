import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const { prompt, max_length = 100, temperature = 0.7 } = await request.json();

    if (!prompt) {
      return NextResponse.json({ error: 'No prompt provided.' }, { status: 400 });
    }

    // Send the prompt to Hugging Face Inference API
    const response = await fetch('https://api-inference.huggingface.co/models/bigscience/bloom', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.HUGGING_FACE_TOKEN}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        inputs: prompt,
        parameters: {
          max_new_tokens: max_length,
          temperature: temperature,
          top_p: 0.95,
          repetition_penalty: 1.2,
        },
        options: {
          wait_for_model: true, // Wait if the model is loading
        },
      }),
    });

    if (!response.ok) {
      const error = await response.json();
      console.error('Hugging Face API Error:', error);
      return NextResponse.json({ error: error.error || 'Failed to generate text.' }, { status: response.status });
    }

    const results = await response.json();
    return NextResponse.json({ generated_text: results.generated_text || results[0].generated_text });
  } catch (error) {
    console.error('Error during text generation:', error);
    return NextResponse.json({ error: 'Failed to generate text.' }, { status: 500 });
  }
}
