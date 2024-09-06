// /app/api/book-details/route.ts
import OpenAI from 'openai';
import { NextResponse } from 'next/server';

// Initialize OpenAI with your API key
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(request: Request) {
  try {
    const { title, author } = await request.json();

    // Ensure title and author are provided
    if (!title || !author) {
      return NextResponse.json({ error: 'Title and author are required.' }, { status: 400 });
    }

    // Adjust the prompt to ask for a Google search link instead of a Goodreads link
    const prompt = `Provide a short description, one famous quote, and a Google search link for the book "${title}" by ${author}. Return the response strictly as a JSON object with the keys "description", "quote", and "googleLink". Do not include any extra formatting.`;

    // Call OpenAI API to get book details
    const openAiResponse = await openai.chat.completions.create({
      model: 'gpt-4o-mini', // Use the specified model
      messages: [{ role: 'user', content: prompt }],
      max_tokens: 300,
      temperature: 0.7,
    });

    // Safely access the content of the response
    const choice = openAiResponse.choices?.[0];
    if (!choice || !choice.message || !choice.message.content) {
      throw new Error('Invalid response from OpenAI');
    }

    // Extract and parse the response content
    const detailsText = choice.message.content.trim();
    const details = JSON.parse(detailsText.replace(/```json|```/g, '')); // Remove any potential code block formatting

    return NextResponse.json(details);
  } catch (error) {
    console.error('Error fetching book details:', error);
    return NextResponse.json({ error: 'Failed to get book details.' }, { status: 500 });
  }
}
