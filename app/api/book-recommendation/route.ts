// /app/api/book-recommendation/route.ts
import OpenAI from 'openai';
import { NextResponse } from 'next/server';

// Initialize OpenAI with your API key
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
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
    const prompt = `Based on the user's three favorite books: "${favoriteBooks[0]}", "${favoriteBooks[1]}", and "${favoriteBooks[2]}", suggest three other books that they would enjoy. Provide your recommendations in the following JSON format:

    [
      {
        "title": "Book Title",
        "author": "Author Name",
        "year": 2000,
        "reason": "Explanation of why this book is recommended based on the user's favorite books."
      },
      {
        "title": "Book Title",
        "author": "Author Name",
        "year": 2000,
        "reason": "Explanation of why this book is recommended based on the user's favorite books."
      },
      {
        "title": "Book Title",
        "author": "Author Name",
        "year": 2000,
        "reason": "Explanation of why this book is recommended based on the user's favorite books."
      }
    ]`;

    // Make a request to OpenAI API
    const response = await openai.chat.completions.create({
      model: 'gpt-4o-mini', // Use gpt-4o-mini as requested
      messages: [{ role: 'user', content: prompt }],
      max_tokens: 500,
      temperature: 0.7,
    });

    // Extract the response content
    let recommendationText = response.choices[0]?.message?.content || '[]';

    // Clean the response to ensure it's valid JSON
    recommendationText = recommendationText
      .replace(/```json/g, '')  // Remove code block formatting
      .replace(/```/g, '')      // Remove trailing code block markers
      .trim();                  // Trim any extra whitespace

    // Attempt to parse the cleaned response
    let recommendations;
    try {
      recommendations = JSON.parse(recommendationText);
    } catch (error) {
      console.error('Failed to parse recommendation response:', error);
      return NextResponse.json({ error: 'Failed to parse recommendations.' }, { status: 500 });
    }

    return NextResponse.json({ recommendations });
  } catch (error) {
    console.error('Error during OpenAI request:', error);
    return NextResponse.json({ error: 'Failed to get recommendations.' }, { status: 500 });
  }
}
