import { NextRequest } from 'next/server';
import OpenAI from 'openai';

export async function POST(request: NextRequest) {
  const body = await request.json();
  let { textInput } = body;
  const openai = new OpenAI();

  const mp3 = await openai.audio.speech.create({
    model: 'tts-1',
    voice: 'shimmer',
    input: textInput
  });

  const arrayBuffer = await mp3.arrayBuffer();
  const buffer = Buffer.from(arrayBuffer);
  return new Response(buffer);
}
