// /app/api/book-recommendation/route.ts
import OpenAI from 'openai';
import { NextResponse } from 'next/server';

// Initialize OpenAI with your API key
const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY, // Directly provide your API key here
});

export async function POST(request: Request) {
  try {
    const { favoriteBooks } = await request.json();

    // Validate input
    if (!favoriteBooks || favoriteBooks.length !== 3) {
      return NextResponse.json(
        { error: 'Please provide exactly three favorite books.' },
        { status: 400 }
      );
    }

    // Prepare prompt with the user's favorite books
    const prompt = `Based on the user's three favorite books: "${favoriteBooks[0]}", "${favoriteBooks[1]}", and "${favoriteBooks[2]}", suggest three other books that they would enjoy. Provide reasons for your suggestions.`;

    // Make a request to OpenAI API
    const response = await openai.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: [{ role: 'user', content: prompt }],
      max_tokens: 500,
      temperature: 0.7,
    });

    // Extract the response content
    const recommendation = response.choices[0]?.message?.content || 'No recommendation found.';

    return NextResponse.json({ recommendation });
  } catch (error) {
    console.error('Error during OpenAI request:', error);
    return NextResponse.json({ error: 'Failed to get recommendations.' }, { status: 500 });
  }
}
